<template>
    <div id="ordering">


        <section id="NavButtons">
            <input id="flag"
                   type="image"
                   v-bind:src="uiLabels.flag"
                   v-on:click="switchLang()">
            <!--shows the buttons to navigate to different food categories-->
            <NavButtons id="tabbar"
                        v-for="s in steps"
                        v-bind:step="s"
                        v-on:selected="changeStep"
                        :currentStep="currentStep"
                        :key="s.step"
            >
            </NavButtons>
        </section>
    
    <section class="content">
        <!--shows possible preferences how the food shall be filtered-->
        <FoodPref
                v-if="currentStep===0"
                v-on:preferencesChanged="changePreferences"
                :prefs="prefs"
                :ui-labels="uiLabels"
                :lang="lang">
        </FoodPref>

        <!-- Select the patty for a burger -->
        <BurgerBunPage
                v-if="currentStep===4"
                v-on:removeIngredient="removeOrder"
                v-on:increment="addToOrder"
                v-on:decrement="removeOrder"
                :burger="burger"
                :allIngredients="ingredients"
                :relevantIngredients="relevantIngredients"
                :relevantIngredientDict="chosenIngredientsDict"
                :ui-labels="uiLabels"
                :lang="lang"
        />

        <!-- Select patties, extras, and sauces for the current burger -->
        <BurgerIngredientsPage
                v-if="[1,2,3].includes(currentStep)"
                v-on:removeIngredient="removeOrder"
                v-on:increment="addToOrder"
                v-on:decrement="removeOrder"
                :burger="burger"
                :allIngredients="ingredients"
                :relevantIngredients="relevantIngredients"
                :relevantIngredientDict="chosenIngredientsDict"
                :ui-labels="uiLabels"
                :lang="lang"
            />

        <!-- Create a new burger and add it to the order -->
        <NewBurgerPage
                v-if="currentStep===7"
                v-on:newBurger="addNewBurger"
                v-on:incrementBurger ="addFinishedBurger"
                v-on:decrementBurger="removeFinishedBurger"
                :ui-labels="uiLabels"
                :lang="lang"
                :currentBurger="burger"
                :oldBurgers="oldBurgers"
                :order="order"
                :allIngredients="ingredients"

        />

        <!-- Add sides and drinks to an order -->
        <SidesAndDrinksPage
                v-if="currentStep===5 || currentStep===6"
                :order="order"
                :allIngredients="ingredients"
                :relevantIngredients="relevantIngredients"
                :relevantIngredientDict="chosenSidesDrinks"
                v-on:increment="addToOrder"
                v-on:decrement="removeOrder"
                :ui-labels="uiLabels"
                :lang="lang"
            />

        <!--show selected burger, sides, and drinks in order overview step 8-->
        <OrderCheckPage
                v-if="currentStep===8"
                v-on:increment="addToOrder"
                v-on:decrement="removeOrder"
                v-on:incrementBurger ="addFinishedBurger"
                v-on:decrementBurger="removeFinishedBurger"
                :ui-labels="uiLabels"
                :lang="lang"
                :chosenSidesDrinks="chosenSidesDrinks"
                :allIngredients="ingredients"
                :currentBurger="burger"
                :order="order"
                :oldBurgers="oldBurgers"
        />
    </section>

    <section class="footerButtons" >
        <CancelAndPayButton
                :currentStep="currentStep"
                :lang="lang"
                :ui-labels="uiLabels"
                v-on:clickedPay="placeOrder"
                :price="price"
        />
    </section>

    </div>
</template>
<script>

    //import methods and data that are shared between ordering and kitchen views
    import sharedVueStuff from '@/components/sharedVueStuff.js'

    //import the components that are used in the template, the name that you
    //use for importing will be used in the template above and also below in
    //components
    import FoodPref from '@/components/FoodPref.vue'
    import NavButtons from "../components/NavButtons.vue";
    import NewBurgerPage from "../components/NewBurgerPage";
    import SidesAndDrinksPage from "../components/SidesAndDrinksPage";
    import CancelAndPayButton from "../components/CancelAndPayButton";
    import OrderCheckPage from "../components/OrderCheckPage";
    import BurgerIngredientsPage from "../components/BurgerIngredientsPage";
    import BurgerBunPage from "../components/BurgerBunPage";

    /* instead of defining a Vue instance, export default allows the only
    necessary Vue instance (found in main.js) to import your data and methods */
    export default {
        name: 'Ordering',
        components: {
            BurgerBunPage,
            BurgerIngredientsPage,
            CancelAndPayButton,
            NavButtons,
            FoodPref,
            NewBurgerPage,
            SidesAndDrinksPage,
            OrderCheckPage,
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
                if (this.burgerPrice > 0) {
                    // To exclude if an order contains only sides and drinks
                    this.oldBurgers.push(this.burger);
                }

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
            },
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
#NavButtons {
    margin-left: 5px;
    width: auto;
}
#tabbar {
     display: inline-block;
     width: auto;

}
.burgerView {
    grid-gap: 2em;
    grid-template-columns: 20em 20em;
    margin-top: 20px;
    padding: 20px;
    width: 22vw;
    height: 63vh;
    border: 1.5px solid grey;
    display: block;
    overflow: auto;
    }
.grid {
    display: grid;
    grid-column-gap: 2em;
    grid-row-gap: 1em;
    grid-template-columns: 20vw 20vw 20vw;
    margin-left: 30px;
    margin-top: 20px;
    height: 70vh;
    width: 70vw;
    overflow: auto;
}
#flag {
    margin-bottom: -20px;
    width: 50px;
    height: 42px;
    padding: 1px;
    border: 1px solid grey;
    border-radius: 15px;
    background-color: #e7e7e7;
    color: darkslategrey;
}

@media only screen and (max-width: 850px){
        #ing {
                display: grid;
                grid-gap: 3em;
                grid-template-columns: 20% 40%;
            }

            #tabbar {
                display: inline-block;
                width: auto; 
            }
        .burgerView {
                grid-gap: 2em;
                grid-template-columns: 20em 20em;
                margin-top: 10px;
                padding: 20px;
                width: 18vw;
                height: 55vh;
                border: 1.5px solid grey;
                display: block;
                overflow: auto;
            }
        .grid {
            display: grid;
            grid-column-gap: 1.6em;
            grid-row-gap: 1em;
            grid-template-columns: 20vw 20vw 20vw;
            margin-left: 5px;
            margin-top: 10px;
            height: 75vh;
            width: 70vw;
            overflow: auto;
        }
        #flag {
            width: 3vw;
            margin-left: 20px;
        }
}
#FoodPref {
    position: absolute;
    left: 33vw;
    top: 200px;
}
#TotalBill {
    position: absolute;
    left: 73vw;
    bottom: 180px;
    font-size: 0.7em;
    overflow: auto;
    height: 50vh;
}
#PayButton {
    margin-left: 180px;
    margin-bottom: 30px;
    position: absolute;
    left: 63vw;
    bottom: 20px;
}
#NewBurger {
    position: absolute;
    left: 77vw;
    bottom: 10px;
}

</style>