<template>
    <div id="mainContainer">
        <div id="burgerParent">
            <div id="burgerContainer">
                <BurgerView
                        class="burgerView"
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
                    v-on:incrementBurger ="incrementBurger"
                    v-on:decrementBurger="decrementBurger"
                    :burger="burger"
                    :allIngredients="allIngredients"
                    :addBurgerOrCheckPage="true"
                    :ui-labels="uiLabels"
                    :lang="lang"
                    :key="burger.id"
                />
            </div>
        </div>
        <div id="itemButton">
            <NewBurgerButton
                    v-if="currentBurger.price > 0"
                    v-on:newBurger="newBurger"
                    :ui-labels="uiLabels"
                    :lang="lang"
            />
        </div>
        <div id="itemBill">
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
    #mainContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    #burgerContainer {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
    }

    #itemButton {
        align-self: center;
    }

    #itemBill {
        align-self: flex-end;
    }
</style>