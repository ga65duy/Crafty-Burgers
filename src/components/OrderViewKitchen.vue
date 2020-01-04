<template>
    <div v-if="item" class="orderItem">
        <BurgerViewKitchen
                v-if="item.type === 'burger'"
                :burger="item"
                :allIngredients="allIngredients"
                :lang="lang"
        />
        <SidesDrinksKitchen
                v-if="item.type === 'sidesAndDrinks'"
                :item="item"
                :allIngredients="allIngredients"
                :lang="lang"
        />
        #{{item.orderId}} ({{item.step}}/{{item.totalSteps}})
    </div>
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