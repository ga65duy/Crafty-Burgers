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
            <!--Choosing a bun, allows only one bun otherwise the + and - is disabled -->
            <!--In first case the bun box which was selected allows only to click -  -->
            <Ingredient
                    class="burgerIngredient"
                    ref="ingredient"
                    v-for="item in relevantIngredients"
                    v-if="item.ingredient_id === burger.bun"
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
                    class="burgerIngredient"
                    ref="ingredient"
                    v-for="item in relevantIngredients"
                    v-if="item.ingredient_id !== burger.bun"
                    v-on:increment="addToOrder(item)"
                    v-on:decrement="removeOrder(item)"
                    :item="item"
                    :lang="lang"
                    :key="item.ingredient_id"
                    :disabled="Boolean(burger.bun)"
                    :plusDisabled="Boolean(burger.bun)"
                    :counter="0">
            </Ingredient>
        </div>
    </div>


</template>

<script>
    import Ingredient from '@/components/Ingredient.vue'
    import BurgerView from '@/components/BurgerView.vue'

    export default {
        name: "BurgerBunPage",
        components: {
            Ingredient,
            BurgerView
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
        height: auto;
        width: 70vw;
        overflow: auto;
    }

    @media only screen and (max-width: 850px){
       .grid {
        display: grid;
        grid-column-gap: 1em;
        grid-row-gap: 1em;
        grid-template-columns: 20vw 20vw 20vw;
        margin-left: 15px;
        margin-top: 20px;
        height: 80vh;
        width: 70vw;
        overflow: auto;
    }
    }

    .burgerIngredient {
        max-height: 250px;
    }
</style>