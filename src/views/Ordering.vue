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
            <Ingredient
                    ref="ingredient"
                    v-for="item in ingredients"
                    v-if="item.category===currentStep"
                    v-on:increment="addToOrder(item)"
                    v-on:decrement="removeOrder(item)"
                    :item="item"
                    :lang="lang"
                    :key="item.ingredient_id"
                    :counter="currentRelevantIngredientDict[item.ingredient_en]">
            </Ingredient>
        </div>
        <NewBurger
                v-if="currentStep===7"
                v-on:newBurger="addNewBurger"
                :ui-labels="uiLabels"
                :lang="lang">
        </NewBurger>

        <h1>{{ uiLabels.order }}</h1>
       <!-- {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}, {{ price }} kr -->
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
            NewBurger
        },
        mixins: [sharedVueStuff], // include stuff that is used in both
                                  // the ordering system and the kitchen
        data: function () { //Not that data is a function!
            return {
                chosenIngredients: [],
                chosenIngredientsDict: {},
                chosenSidesDrinks: {},
                allBurgers: [],
                price: 0,
                burgerPrice:0,
                orderNumber: "",
                currentStep: 0,
            }
        },
        computed: {
            steps: function () {
                return [
                    {step: 0, label: this.uiLabels.preferences},
                    {step: 4, label: this.uiLabels.bun},
                    {step: 1, label: this.uiLabels.patty},
                    {step: 2, label: this.uiLabels.extras},
                    {step: 3, label: this.uiLabels.sauces},
                    {step: 7, label: this.uiLabels.addBurger},
                    {step: 5, label: this.uiLabels.sides},
                    {step: 6, label: this.uiLabels.drinks}
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
                let newCount = (this.currentRelevantIngredientDict[item.ingredient_en] || 0) + 1;
                this.$set(this.currentRelevantIngredientDict, item.ingredient_en, newCount);

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
                let newCount = this.currentRelevantIngredientDict[item.ingredient_en]-1;
                //delete ingredient from dictionary if the value is 0
                if (newCount === 0) {
                    delete this.currentRelevantIngredientDict[item.ingredient_en];
                } else {
                    this.$set(this.currentRelevantIngredientDict, item.ingredient_en, newCount);
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
                let burger = {
                    price: this.burgerPrice,
                    name: this.currentBurgerNumber,
                    selectedIngredients: this.chosenIngredientsDict
                };
                this.allBurgers.push(burger);
                // reset chosen ingredients from previous burger and reset price
                this.chosenIngredientsDict = {};
                this.burgerPrice = 0;
                // go back to the food preferences
                this.changeStep(0);
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
    /*#ordering {
      margin:auto;
      width: 40em;
    }*/

    .example-panel {
        position: fixed;
        left: 0;
        top: 0;
        z-index: -2;
    }

    #ing {
        display: grid;
        grid-gap: 2em;
        grid-template-columns: 20em 20em 20em;
    }

    #tabbar {
        display: inline-block;
        width: auto;
    }

    /*.ingredient {
      border: 1px solid #ccd;
      padding: 1em;
      background-image: url('~@/assets/exampleImage.jpg');
      color: white;
    }*/
</style>