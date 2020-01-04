<template>
    <div>
        Sides and Drinks
        <p v-for="(value,ing) in item.sidesAndDrinks" :key="ing">
            {{value}}x {{getItemForKey(ing)["ingredient_"+lang]}}<br>
        </p>
        #{{item.orderId}} ({{item.step}}/{{item.totalSteps}})
    </div>
</template>

<script>
    export default {
        name: "SidesDrinksKitchen",
        props:{
            item: Object,
            allIngredients: Array,
            orderId: Number,
            lang: String
        },
        methods: {
            getItemForKey: function (key) {
                return this.allIngredients.filter(item => item.ingredient_id === Number(key))[0];
            },
        }
    }
</script>

<style scoped>
</style>