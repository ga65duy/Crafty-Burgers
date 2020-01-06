<template>
    <div id="mainContainer">
            <div id="burgerGrid">
                <BurgerView
                        class="burgerNewPage"
                        v-on:incrementBurger ="incrementBurger"
                        v-on:decrementBurger="decrementBurger"
                        :burger="currentBurger"
                        :allIngredients="allIngredients"
                        :addBurgerOrCheckPage="true"
                        :ui-labels="uiLabels"
                        :lang="lang"/>

                <BurgerView
                    class="burgerNewPage"
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

    .burgerNewPage {
        height: 400px;
        max-width: 18.5vw;
        margin: 5px;
    }

    #burgerGrid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-left: 10px;
        margin-top: 20px;
        height: 75vh;
        width: 42vw;
        overflow: auto;
    }
    #burgerGrid::-webkit-scrollbar {
        display: none;
    }

    #burgerGrid {
        -ms-overflow-style: none;
    }

    #itemButton {
        align-self: center;
    }

    #itemBill {
        align-self: flex-end;
        margin-top: 20px;
        margin-right: 10px;
    }

</style>