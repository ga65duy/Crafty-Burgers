<template>
    <div id="ordering">
        <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
        <section>
            <NavButtons id="tabbar"
                        ref="navigation"
                        v-for="s in steps"
                        v-bind:step="s"
                        v-on:selected="changeStep">
            </NavButtons>
        </section>
        <FoodPref
                v-if="currentStep===0"
                :ui-labels="uiLabels"
                :lang="lang">
        </FoodPref>
        <div id="ing">
            <!--do not show the component in foodpreferences, drinks, sides-->
                <BurgerView
                        class="burgerView"
                        v-if="![0,5,6].includes(currentStep)"
                        v-on:removeIngredient="removeOrder"
                        v-on:incrementBurger ="addFinishedBurger"
                        v-on:decrementBurger="removeFinishedBurger"
                        :burger="burger"
                        :allIngredients="ingredients"
                        :addBurgerPage="addBurgerPage">
                </BurgerView>
            <!--show a list of all created burgers in step 7-->
                <div v-if="currentStep===7" v-for="burger in allBurgers">
                    <BurgerView
                        class="burgerView"
                        v-on:removeIngredient="removeOrder"
                        v-on:incrementBurger ="addFinishedBurger"
                        v-on:decrementBurger="removeFinishedBurger"
                        :burger="burger"
                        :allIngredients="ingredients"
                        :addBurgerPage="addBurgerPage">
                    </BurgerView>
                </div>
            <!-- Other than step 4 clicking + and - is always enabled -->
            <div v-if="currentStep !== 4" >
                <Ingredient
                        ref="ingredient"
                        v-for="item in ingredients"
                        v-if="item.category===currentStep"
                        v-on:increment="addToOrder(item)"
                        v-on:decrement="removeOrder(item)"
                        :item="item"
                        :lang="lang"
                        :key="item.ingredient_id"
                        :disabled="false"
                        :plusDisabled="false"
                        :counter="currentRelevantIngredientDict[item.ingredient_en]">
                </Ingredient>
            </div>
            <div v-if="currentStep === 4" >
                <!--Choosing a bun, allows only one bun otherwise the + and - is disabled -->
                <!--In first case the bun box which was selected allows only to click -  -->
                <Ingredient
                        ref="ingredient"
                        v-for="item in ingredients"
                        v-if="item.category===currentStep && item.ingredient_en === burgerBun"
                        v-on:increment="addToOrder(item)"
                        v-on:decrement="removeOrder(item)"
                        :item="item"
                        :lang="lang"
                        :key="item.ingredient_id"
                        :disabled="false"
                        :plusDisabled="true"
                        :counter="1">
                </Ingredient>
                <!--In second case the bun boxes, which are NOT selected,
                    1) and no bun is selected at all: then clicking + and - is allowed
                    2) and a bun is selected: clicking + and - is not allowed
                -->
                <Ingredient
                        ref="ingredient"
                        v-for="item in ingredients"
                        v-if="item.category===currentStep && item.ingredient_en !== burgerBun"
                        v-on:increment="addToOrder(item)"
                        v-on:decrement="removeOrder(item)"
                        :item="item"
                        :lang="lang"
                        :key="item.ingredient_id"
                        :disabled=Boolean(burgerBun)
                        :plusDisabled=Boolean(burgerBun)
                        :counter="0">
                </Ingredient>
            </div>
            <!-- Create a new burger and add it to the list -->
            <NewBurger
                    v-if="currentStep===7"
                    v-on:newBurger="addNewBurger"
                    :ui-labels="uiLabels"
                    :lang="lang">
            </NewBurger>
        </div>
        <!--TODO: basically not needed: but datastructure can be seen here -->
        <h1>{{ uiLabels.order }}</h1>
        {{this.chosenIngredientsDict }} burgerprice: {{burgerPrice}}
        {{this.order}}
        <button v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>

        <h1>{{ uiLabels.ordersInQueue }}</h1>
        <div>
            <OrderItem
                    v-for="(order, key) in orders"
                    v-if="order.status !== 'done'"
                    :order-id="key"
                    :order="order"
                    :ui-labels="uiLabels"
                    :lang="lang"
                    :key="key">
            </OrderItem>
        </div>
    </div>
</template>
<script>

    //import the components that are used in the template, the name that you
    //use for importing will be used in the template above and also below in
    //components
    import Ingredient from '@/components/Ingredient.vue'
    import OrderItem from '@/components/OrderItem.vue'
    import FoodPref from '@/components/FoodPref.vue'
    import NewBurger from '@/components/NewBurger.vue'
    import BurgerView from '@/components/BurgerView.vue'
    //import methods and data that are shared between ordering and kitchen views
    import sharedVueStuff from '@/components/sharedVueStuff.js'
    import NavButtons from "../components/NavButtons";

    /* instead of defining a Vue instance, export default allows the only
    necessary Vue instance (found in main.js) to import your data and methods */
    export default {
        name: 'Ordering',
        components: {
            NavButtons,
            Ingredient,
            OrderItem,
            FoodPref,
            NewBurger,
            BurgerView
        },
        mixins: [sharedVueStuff], // include stuff that is used in both
                                  // the ordering system and the kitchen
        data: function () { //Not that data is a function!
            return {
                chosenIngredientsDict: {},
                chosenSidesDrinks: {},
                allBurgers: [],
                price: 0,
                burgerPrice:0,
                burgerAmount: 1,
                burgerBun: "",
                orderNumber: "",
                currentStep: 0,
            }
        },
        computed: {
            addBurgerPage: function (){
                return this.currentStep === 7 || this.currentStep === 8;
            },
            steps: function () {
                return [
                    {step: 0, label: this.uiLabels.preferences},
                    {step: 4, label: this.uiLabels.bun},
                    {step: 1, label: this.uiLabels.patty},
                    {step: 2, label: this.uiLabels.extras},
                    {step: 3, label: this.uiLabels.sauces},
                    {step: 7, label: this.uiLabels.addBurger},
                    {step: 5, label: this.uiLabels.sides},
                    {step: 6, label: this.uiLabels.drinks},
                    {step: 8, label: String.fromCharCode(10004)}
                    ]
            },
            currentBurgerNumber: function() {
                return this.allBurgers.length + 1
            },
            order: function() {
                // Wrap sides and burgers in order object
                return {burger: this.allBurgers,
                        sides: this.chosenSidesDrinks,
                        price: this.price}
            },

            burger: function() {
                return {
                    id: this.currentBurgerNumber,
                    amount: this.burgerAmount,
                    price: this.burgerPrice,
                    name: this.uiLabels.burger+ " #" + this.currentBurgerNumber,
                    bun: this.burgerBun,
                    chosenIngredients: this.chosenIngredientsDict
                };
            },

            currentRelevantIngredientDict: function() {
                // As two different objects for burgers and sides/drinks are used
                // the objects are switched depending on the steps
                if (this.currentStep === 5 || this.currentStep === 6) {
                    return this.chosenSidesDrinks;
                } else {
                    return this.chosenIngredientsDict;
                }
            }
        },
        created: function () {
            this.$store.state.socket.on('orderNumber', function (data) {
                this.orderNumber = data;
            }.bind(this));
        },
        methods: {
            changeStep: function (nextStep) {
                this.currentStep = nextStep;
            },
            addToOrder: function (item) {
                //add ingredients to order
                let itemKey = item.ingredient_en;
                if (this.currentStep === 4) {
                    this.burgerBun = itemKey;
                } else {
                    let newCount = (this.currentRelevantIngredientDict[itemKey] || 0) + 1;
                    this.$set(this.currentRelevantIngredientDict, itemKey, newCount);
                }
                //if ingredients are sides or drinks then the order price has to be increased
                //otherwise order price and burger price increases
                if (this.currentStep === 5 || this.currentStep === 6) {
                    this.price += item.selling_price;
                } else {
                    this.price += item.selling_price;
                    this.burgerPrice += item.selling_price;
                }
            },
            removeOrder: function (item) {
                //remove ingredients from order
                let itemKey = item.ingredient_en;
                if (this.currentStep === 4) {
                    this.burgerBun = "";
                } else {
                    let newCount = this.currentRelevantIngredientDict[itemKey] - 1;
                    this.$set(this.currentRelevantIngredientDict, itemKey, newCount);
                    //delete ingredient from dictionary if the value is 0
                    if (newCount === 0) {
                        delete this.currentRelevantIngredientDict[itemKey];
                    }
                }
                //if ingredients are sides or drinks then the order price has to be decreased
                //otherwise order price and burger price decreases
                if (this.currentStep === 5 || this.currentStep === 6) {
                    this.price -= item.selling_price;
                } else {
                    this.price -= item.selling_price;
                    this.burgerPrice -= item.selling_price;
                }

            },
            addNewBurger: function() {
                // Wrap current burger ingredients from chosenIngredientsDict in object burger

                this.allBurgers.push(this.burger);
                // reset chosen ingredients from previous burger and reset price
                this.chosenIngredientsDict = {};
                this.burgerPrice = 0;
                this.burgerAmount = 1;
                // go back to the food preferences
                this.changeStep(0);
            },

            addFinishedBurger: function (burgerId) {
                if (burgerId === this.currentBurgerNumber) {
                    this.burgerAmount += 1;
                } else {
                    let incrementedBurger = this.allBurgers.filter(burger => burger.id === burgerId)[0];
                    incrementedBurger.amount += 1;
                }
            },
            removeFinishedBurger: function (burgerId) {
                if (burgerId === this.currentBurgerNumber) {
                    this.burgerAmount -= 1;
                } else {
                    let incrementedBurger = this.allBurgers.filter(burger => burger.id === burgerId)[0];
                    incrementedBurger.amount -= 1;
                }
            },
            placeOrder: function () {
                var i,
                    //Wrap the order in an object
                    order = {
                        ingredients: this.chosenIngredients,
                        price: this.price
                    };
                // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
                this.$store.state.socket.emit('order', {order: order});
                //set all counters to 0. Notice the use of $refs
                for (i = 0; i < this.$refs.ingredient.length; i += 1) {
                    this.$refs.ingredient[i].resetCounter();
                }
                this.price = 0;
                this.chosenIngredients = [];
            }
        }
    }
</script>
<style scoped>
    /* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */

    #ing {
        display: grid;
        grid-gap: 2em;
        grid-template-columns: 20em 20em 20em;
    }

    #tabbar {
        display: inline-block;
        width: auto;
    }
    .burgerView {
        display: grid;
        grid-gap: 2em;
        grid-template-columns: 20em 20em;
        margin: 0.3em;
        padding: 20px;
        width: auto;
        border-style: solid;
        border-color: black;
        display: block;

    }
</style>