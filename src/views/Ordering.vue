<template>
    <div id="ordering">
        <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
        <section>
            <!--shows the buttons to navigate to different food categories-->
            <NavButtons id="tabbar"
                        ref="navigation"
                        v-for="s in steps"
                        v-bind:step="s"
                        v-on:selected="changeStep"
                        :key="s.step"
            >
            </NavButtons>
        </section>
        <!--shows possible preferences how the food shall be filtered-->
        <FoodPref
                v-if="currentStep===0"
                v-on:preferencesChanged="changePreferences"
                :prefs="prefs"
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
                        :addBurgerOrCheckPage="addBurgerOrCheckPage"
                        :ui-labels="uiLabels"
                        :lang="lang">
                </BurgerView>

            <!--show a list of all created burgers in step 7-->
                <BurgerView
                    class="burgerView"
                    v-if="[7,8].includes(currentStep)"
                    v-for="burger in oldBurgers"
                    v-on:removeIngredient="removeOrder"
                    v-on:incrementBurger ="addFinishedBurger"
                    v-on:decrementBurger="removeFinishedBurger"
                    :burger="burger"
                    :allIngredients="ingredients"
                    :addBurgerOrCheckPage="addBurgerOrCheckPage"
                    :ui-labels="uiLabels"
                    :lang="lang"
                    :key="burger.id"
                >
                </BurgerView>
            <!--show selected sides and drinks in order overview-->
                <OrderOverviewSidesDrinks
                     v-if="currentStep===8"
                     v-on:increment="addToOrder"
                     v-on:decrement="removeOrder"
                     :ui-labels="uiLabels"
                     :lang="lang"
                     :chosenSidesDrinks="chosenSidesDrinks"
                     :allIngredients="ingredients"
                     :orderCheck="true"
                >
                </OrderOverviewSidesDrinks>
            <!-- Other than step 4 clicking + and - is always enabled -->
            <div v-if="currentStep !== 4" >
              <div class="grid">
                <Ingredient
                        ref="ingredient"
                        v-for="item in relevantIngredients"
                        v-on:increment="addToOrder(item)"
                        v-on:decrement="removeOrder(item)"
                        :item="item"
                        :lang="lang"
                        :key="item.ingredient_id"
                        :disabled="false"
                        :plusDisabled="false"
                        :counter="currentRelevantIngredientDict[item.ingredient_id]"
                >
                </Ingredient>
              </div>
            </div>
            <div v-if="currentStep === 4" >
              <div class="grid">
                <!--Choosing a bun, allows only one bun otherwise the + and - is disabled -->
                <!--In first case the bun box which was selected allows only to click -  -->
                <Ingredient
                        ref="ingredient"
                        v-for="item in relevantIngredients"
                        v-if="item.ingredient_id === burgerBun"
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
                        v-for="item in relevantIngredients"
                        v-if="item.ingredient_id !== burgerBun"
                        v-on:increment="addToOrder(item)"
                        v-on:decrement="removeOrder(item)"
                        :item="item"
                        :lang="lang"
                        :key="item.ingredient_id"
                        :disabled="Boolean(burgerBun)"
                        :plusDisabled="Boolean(burgerBun)"
                        :counter="0">
                </Ingredient>
              </div>
          </div>
            <!-- Create a new burger and add it to the order -->
            <NewBurger
                    v-if="currentStep===7 && burgerPrice > 0"
                    v-on:newBurger="addNewBurger"
                    :ui-labels="uiLabels"
                    :lang="lang">
            </NewBurger>
            <!--show the bill: with the amount of selected burgers, sides and drinks in step 5,6,7,8-->
            <TotalBill
                v-if="[5,6,7,8].includes(currentStep)"
                :order="order"
                :allIngredients="ingredients"
                :ui-labels="uiLabels"
                :lang="lang"
            >
            </TotalBill>
        </div>
        <PayButton
                v-if="currentStep===8"
                v-on:clickedPay="placeOrder"
                :orderNum="orderNumber"
                :ui-labels="uiLabels"
                :lang="lang"
        >
        </PayButton>
        <!--TODO: basically not needed: but datastructure can be seen here -->
        {{this.order}}
        <br>
        {{this.prefs}}
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
    import NavButtons from "../components/NavButtons.vue";
    import OrderOverviewSidesDrinks from "../components/OrderOverviewSidesDrinks.vue";
    import TotalBill from "../components/TotalBill.vue";
    import PayButton from '@/components/Pay.vue';

    /* instead of defining a Vue instance, export default allows the only
    necessary Vue instance (found in main.js) to import your data and methods */
    export default {
        name: 'Ordering',
        components: {
            TotalBill,
            OrderOverviewSidesDrinks,
            NavButtons,
            Ingredient,
            OrderItem,
            FoodPref,
            NewBurger,
            BurgerView,
            PayButton
        },
        mixins: [sharedVueStuff], // include stuff that is used in both
                                  // the ordering system and the kitchen
        data: function () {
            return {
                chosenIngredientsDict: {},
                chosenSidesDrinks: {},
                oldBurgers: [],
                price: 0,
                burgerPrice:0,
                burgerAmount: 1,
                burgerBun: "",
                orderNumber: "",
                currentStep: 0,
                prefs: [false, false, false],
            }
        },
        computed: {
            relevantIngredients: function() {
                // Return the relevant ingredients to show based on the current step and selected preferences
                return Array.from(this.ingredients).filter( item => {
                    let filterConditions = [true,true,true,true];
                    filterConditions[0] = (item.category  === this.currentStep);
                    filterConditions[1] = this.prefs[0] ? (item.vegan === 1): true;
                    filterConditions[2] = this.prefs[1] ? (item.milk_free === 1): true;
                    filterConditions[3] = this.prefs[2] ? (item.gluten_free === 1): true;
                    return filterConditions.every(condition => condition);
                })
            },
            addBurgerOrCheckPage: function (){
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
                return this.oldBurgers.length + 1
            },
            order: function() {
                // Wrap sides and burgers in order object
                return {currentBurger: this.burger,
                        otherBurgers: this.oldBurgers,
                        sides: this.chosenSidesDrinks,
                        price: this.price}
            },
            burger: function() {
                return {
                    id: this.currentBurgerNumber,
                    amount: this.burgerAmount,
                    price: this.burgerPrice,
                    bun: this.burgerBun,
                    chosenIngredients: this.chosenIngredientsDict
                };
            },
            currentRelevantIngredientDict: function() {
                // As two different objects for burgers and sides/drinks are used
                // the objects are switched depending on the steps
                if (this.currentStep === 5 || this.currentStep === 6 || this.currentStep === 8) {
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

            changePreferences: function(prefId) {
                //prefId is the id of the button in the component food preferences
                switch (prefId) {
                    case 'veg':
                        this.$set(this.prefs, 0, !this.prefs[0]);
                        break;
                    case 'lact':
                        this.$set(this.prefs, 1, !this.prefs[1]);
                        break;
                    case 'glut':
                        this.$set(this.prefs, 2, !this.prefs[2]);
                        break;
                    case 'noFP':
                        this.prefs = [false, false, false];
                        break;
                    default:
                }
            },

            addToOrder: function (item) {
                //add ingredients to order

                let itemKey = item.ingredient_id;
                if (this.currentStep === 4) {
                    this.burgerBun = itemKey;
                } else {
                    let newCount = (this.currentRelevantIngredientDict[itemKey] || 0) + 1;
                    this.$set(this.currentRelevantIngredientDict, itemKey, newCount);
                }
                //if ingredients are sides or drinks then the order price has to be increased
                //otherwise order price and burger price increases
                if (this.currentStep === 5 || this.currentStep === 6 || this.currentStep === 8) {
                    this.price += item.selling_price;
                } else {
                    this.price += item.selling_price;
                    this.burgerPrice += item.selling_price;
                }
            },
            removeOrder: function (item) {
                //remove ingredients from order
                let itemKey = item.ingredient_id;
                if (item.category === 4) {
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
                if (this.currentStep === 5 || this.currentStep === 6 || this.currentStep === 8) {
                    this.price -= item.selling_price;
                } else {
                    this.price -= item.selling_price;
                    this.burgerPrice -= item.selling_price;
                }

            },
            addNewBurger: function() {
                // Wrap current burger ingredients from chosenIngredientsDict in object burger
                this.oldBurgers.push(this.burger);
                // reset chosen ingredients from previous burger, reset price and bun
                this.chosenIngredientsDict = {};
                this.burgerPrice = 0;
                this.burgerAmount = 1;
                this.burgerBun = "";
                // go back to the food preferences
                this.changeStep(0);
            },

            addFinishedBurger: function (burgerId) {
                //adding the amount of already finished burgers
                if (burgerId === this.currentBurgerNumber) {
                    this.burgerAmount += 1;
                } else {
                    let incrementedBurger = this.oldBurgers.filter(burger => burger.id === burgerId)[0];
                    incrementedBurger.amount += 1;
                }
            },
            removeFinishedBurger: function (burgerId) {
                //remove the amount of already finished burgers
                if (burgerId === this.currentBurgerNumber) {
                    this.burgerAmount -= 1;
                } else {
                    let incrementedBurger = this.oldBurgers.filter(burger => burger.id === burgerId)[0];
                    incrementedBurger.amount -= 1;
                }
            },

            placeOrder: function () {
                // Add current burger to burger list because it can not be edited after placing order
                this.oldBurgers.push(this.burger);
                //Wrap the order in an object
                 let order = {
                        allBurgers: this.oldBurgers,
                        sidesAndDrinks: this.chosenSidesDrinks,
                        price: this.price};
                this.$store.state.socket.emit('order', {order: order});
                //reset everything for new order
                this.chosenIngredientsDict = {};
                this.chosenSidesDrinks = {};
                this.oldBurgers = [];
                this.burgerBun = "";
                this.burgerAmount = 1;
                this.price = 0;
                this.burgerPrice = 0;
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
        grid-gap: 2em;
        grid-template-columns: 20em 20em;
        margin: 0.3em;
        padding: 20px;
        width: 19vw;
        border: 1.5px solid grey;
        display: block;
    }
.grid {
    display: grid;
    grid-column-gap: 2em;
    grid-template-columns: 20vw 20vw 20vw;
    margin-left: 2em;
}
</style>