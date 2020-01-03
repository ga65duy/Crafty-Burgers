<template>
    <div>
    <BurgerViewKitchen
            v-for="burger in order.allBurgers"
            :burger="burger"
            :orderId="order.orderId"
            :allIngredients="allIngredients"
            :lang="lang"
            :key="burger.id"
    >
    </BurgerViewKitchen>
    <SidesDrinksKitchen
            v-if="!(Object.keys(order.sidesAndDrinks).length === 0)"
            :sidesDrinks="order.sidesAndDrinks"
            :orderId="order.orderId"
            :allIngredients="allIngredients"
            :lang="lang"
    >
    </SidesDrinksKitchen>
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
            allIngredients: Array,
            uiLabels: Object,
            lang: String
        }
    }
</script>

<style scoped>

</style>