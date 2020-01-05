<template>
    <div class="container">
        <div class="container">
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
            >
            </BurgerView>
        </div>
        <div class="item">
            <NewBurgerButton
                    v-on:newBurger="newBurger"
                    :ui-labels="uiLabels"
                    :lang="lang"
            />
        </div>
        <div class="item">
            <TotalBill
                :order="order"
                :allIngredients="allIngredients"
                :ui-labels="uiLabels"
                :lang="lang"/>
        </div>
    </div>
</template>

<script>
    import TotalBill from "../components/TotalBill.vue";
    import NewBurgerButton from "../components/NewBurgerButton";
    import BurgerView from '../components/BurgerView.vue';

    export default {
        name: "NewBurgerPage",
        components: {
            TotalBill,
            NewBurgerButton,
            BurgerView
        },
        props: {
            uiLabels: Object,
            lang: String,
            currentBurger: Object,
            oldBurgers: Array,
            order: Object,
            allIngredients: Array
        },
        methods: {
            // Pass on all messages to the main component

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
                },

            newBurger: function() {
                this.$emit('newBurger');
            }
            }
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;

    }

    .item {
        flex-grow: 1;
    }
</style>