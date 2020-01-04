<template>
    <div v-if="order">
    <BurgerViewKitchen
            class="orderItem"
            v-for="burger in order.allBurgers"
            :burger="burger"
            :orderId="order.orderId"
            :allIngredients="allIngredients"
            :lang="lang"
            :key="burger.id"
    >
    </BurgerViewKitchen>
    <SidesDrinksKitchen
            class="orderItem"
            v-if="!(Object.keys(order.sidesAndDrinks).length === 0)"
            :sidesDrinks="order.sidesAndDrinks"
            :orderId="order.orderId"
            :allIngredients="allIngredients"
            :lang="lang"
    >
    </SidesDrinksKitchen>
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
            order: Object,
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