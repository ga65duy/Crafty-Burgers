<template>
    <div id="mainContainer">
        <div id="itemGrid">
            <BurgerView
                    class="burgerView"
                    v-on:removeIngredient="removeIngredient"
                    v-on:incrementBurger ="incrementBurger"
                    v-on:decrementBurger="decrementBurger"
                    :burger="currentBurger"
                    :allIngredients="allIngredients"
                    :addBurgerOrCheckPage="true"
                    :ui-labels="uiLabels"
                    :lang="lang"/>

            <BurgerView
                    class="burgerView"
                    v-for="burger in oldBurgers"
                    v-on:removeIngredient="removeIngredient"
                    v-on:incrementBurger ="incrementBurger"
                    v-on:decrementBurger="decrementBurger"
                    :burger="burger"
                    :allIngredients="allIngredients"
                    :addBurgerOrCheckPage="true"
                    :ui-labels="uiLabels"
                    :lang="lang"
                    :key="burger.id"
            />

            <Ingredient
                    v-for="(count, key) in chosenSidesDrinks"
                    v-on:increment="incrementCounter(key)"
                    v-on:decrement="decrementCounter(key)"
                    :item="getItemForKey(key)"
                    :lang="lang"
                    :key="getItemForKey(key).ingredient_id"
                    :disabled="false"
                    :plusDisabled="false"
                    :counter="count"
                    :orderCheck="true">
            </Ingredient>
        </div>
        <div>
            <div id="itemBill">
                <TotalBill
                        :order="order"
                        :allIngredients="allIngredients"
                        :ui-labels="uiLabels"
                        :lang="lang"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import Ingredient from '../components/Ingredient.vue'
    import BurgerView from '../components/BurgerView.vue';
    import TotalBill from "../components/TotalBill.vue";

    export default {
        name: 'OrderCheckPage',
        components: {
            Ingredient,
            BurgerView,
            TotalBill

        },
        props: {
            allIngredients: Array,
            chosenSidesDrinks: Object,
            currentBurger: Object,
            oldBurgers: Array,
            order: Object,
            uiLabels: Object,
            lang: String,
            //show caption of sides and drinks directly above + - not above picture like in sides and drinks

        },

        methods: {
            getItemForKey: function (key) {
                return this.allIngredients.filter(item => item.ingredient_id === Number(key))[0];
            },

            incrementCounter: function (key) {
                // sending 'increment' message to parent component or view so that it
                // can catch it with v-on:increment in the component declaration
                let item = this.getItemForKey(key);
                this.$emit('increment', item);
            },
            decrementCounter: function (key) {
                let item = this.getItemForKey(key);
                this.$emit('decrement', item);
                // sending 'increment' message to parent component or view so that it
                // can catch it with v-on:increment in the component declaration
            },

            removeIngredient: function(item) {
                this.$emit('removeIngredient', item);
            },

            //add burgers by clicking +
            incrementBurger: function (burgerId) {
                this.$emit('incrementBurger', burgerId);
            },

            //remove burgers by clicking -
            decrementBurger: function (burgerId) {
                this.$emit('decrementBurger', burgerId);
            }
        }
    }
</script>
<style scoped>

    #mainContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    #itemGrid {
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

    #itemBill {
        align-self: flex-end;
    }

    .ingredient {
        display: block;
        grid-gap: 2em;
        grid-template-columns: 20em 20em;
        margin: 0.3em;
        padding: 20px;
        width: auto;
        border-style: solid;
        border-color: black;
        font-size: 2em;
        text-align: center;
        font-family:arial;
    }

    #image {
        width:250px;
    }

    @media only screen and (max-width: 850px){
        .ingredient {
            display: block;
            grid-gap: 2em;
            grid-template-columns: 20em 20em;
            margin: 0.5em;
            padding: 10px;
            width: 18vw;
            height: 60vh;
            border-style: solid;
            border-color: grey;
            font-size: 1.4em;
            text-align: center;
            font-family:arial;
        }
        #image {
            width:250px;
        }
    }
</style>