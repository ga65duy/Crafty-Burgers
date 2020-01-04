<template>
    <BurgerViewKitchen
            v-if="item && item.type === 'burger'"
            class="orderItem"
            :burger="item"
            :allIngredients="allIngredients"
            :lang="lang"
    >
    </BurgerViewKitchen>
    <SidesDrinksKitchen
            v-else-if="item && item.type === 'sidesAndDrinks'"
            class="orderItem"
            :item="item"
            :allIngredients="allIngredients"
            :lang="lang"
    >
    </SidesDrinksKitchen>
    <div v-else class="orderItem">
        No order available
    </div>

</template>

<script>
    import BurgerViewKitchen from "./BurgerViewKitchen";
    import SidesDrinksKitchen from "./SidesDrinksKitchen";
    export default {
        name: "OrderViewKitchen",
        components: {SidesDrinksKitchen, BurgerViewKitchen},
        props:{
            item: Object,
            allIngredients: Object,
            uiLabels: Object,
            lang: String
        }
    }
</script>

<style scoped>
    .orderItem {
        display: block;
        padding: 20px;
        width: auto;
        border-style: solid;
        border-color: black;
        font-size: 2em;
        text-align: center;
        font-family:arial;
    }
</style>