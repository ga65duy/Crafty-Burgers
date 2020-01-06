<template>
    <div id="mainContainer">
        <div>
            <BurgerView
                v-on:removeIngredient="removeOrder"
                :burger="burger"
                :allIngredients="allIngredients"
                :addBurgerOrCheckPage="false"
                :ui-labels="uiLabels"
                :lang="lang">
            </BurgerView>
        </div>
        <div class="grid">
            <Ingredient
                class="burgerIngredient"
                ref="ingredient"
                v-for="item in relevantIngredients"
                v-on:increment="addToOrder(item)"
                v-on:decrement="removeOrder(item)"
                :item="item"
                :lang="lang"
                :key="item.ingredient_id"
                :disabled="false"
                :plusDisabled="false"
                :counter="relevantIngredientDict[item.ingredient_id]"
            />
        </div>
    </div>
</template>

<script>
    import BurgerView from '../components/BurgerView.vue'
    import Ingredient from '../components/Ingredient.vue'

    export default {
        name: "BurgerIngredientsPage",
        components: {
            BurgerView,
            Ingredient
        },
        props: {
            uiLabels: Object,
            lang: String,
            burger: Object,
            allIngredients: Array,
            relevantIngredients: Array,
            relevantIngredientDict: Object
        },
        methods: {
            addToOrder: function(item) {
                this.$emit("increment", item)
            },
            removeOrder: function(item) {
                this.$emit("decrement", item)
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

    .grid {
        display: grid;
        grid-column-gap: 2em;
        grid-row-gap: 1em;
        grid-template-columns: 20vw 20vw 20vw;
        margin-left: 30px;
        margin-top: 20px;
        height: 75vh;
        width: 70vw;
        overflow: auto;
    }

    .burgerIngredient {
        max-height: 250px;
    }

    /* Medium screens */
    @media all and (max-width: 800px) {
        .grid {
            /* When on medium sized screens, we have only two columns*/
            grid-template-columns: 20vw 20vw;
        }
    }

    /* Small screens */
    @media all and (max-width: 500px) {
        .grid {
            /* On small screens, we have only one column */
            grid-template-columns: 20vw;
        }
    }
</style>