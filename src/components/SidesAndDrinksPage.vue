<template>
    <div id="mainContainer">
        <div id="ingredientGrid">
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
                    :counter="relevantIngredientDict[item.ingredient_id]"
            />
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
    import Ingredient from '@/components/Ingredient.vue'
    import TotalBill from "../components/TotalBill.vue";

    export default {
        name: "SidesAndDrinksPage",
        components: {
            Ingredient,
            TotalBill
        },
        props: {
            order: Object,
            relevantIngredients: Array,
            relevantIngredientDict: Object,
            allIngredients: Array,
            uiLabels: Object,
            lang: String

        },
        methods: {
            addToOrder: function (item) {
                this.$emit("increment", item)
            },
            removeOrder: function (item) {
                this.$emit("decrement", item)
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

    #ingredientGrid {
        display: grid;
        grid-column-gap: 1.6em;
        grid-row-gap: 1em;
        grid-template-columns: 20vw 20vw 20vw;
        margin-left: 5px;
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

@media only screen and (max-width: 850px){
       #ingredientGrid {
        display: grid;
        grid-column-gap: 0.7em;
        grid-row-gap: 0.7em;
        grid-template-columns: 20vw 20vw 20vw;
        margin-left: 15px;
        margin-top: 20px;
        height: 80vh;
        width: 65vw;
        overflow: auto;
    } 
    }
</style>