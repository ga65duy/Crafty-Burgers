<template>
    <div id="mainContainer">
        <div id="itemGrid">
            <BurgerView
                    class="itemCheckPage"
                    v-on:removeIngredient="removeIngredient"
                    v-on:incrementBurger ="incrementBurger"
                    v-on:decrementBurger="decrementBurger"
                    :burger="currentBurger"
                    :allIngredients="allIngredients"
                    :addBurgerOrCheckPage="true"
                    :ui-labels="uiLabels"
                    :lang="lang"/>

            <BurgerView
                    class="itemCheckPage"
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
                    class="itemCheckPage"
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
            <div id="itemBill">
                <TotalBill
                        :order="order"
                        :allIngredients="allIngredients"
                        :ui-labels="uiLabels"
                        :lang="lang"
                />
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
        flex-wrap: nowrap;
        justify-content: space-between;
    }

    /* In the check page the boxes around ingredients and burgers must have the same size */
    .itemCheckPage {
        height: 400px;
        max-width: 20vw;
        margin: 5px;
        font-weight: bold;
        font-family: comfortaa, sans-serif;
        font-size: 1.5em;
        color: black;
        background: #e7e7e7;

    }

    #itemGrid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-left: 10px;
        margin-top: 20px;
        height: 75vh;
        width: 65vw;
        overflow: auto;
    }

    #itemBill {
        align-self: flex-end;
        margin-top: 20px;
        margin-right: 10px;
    }

</style>