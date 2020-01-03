<template>
    <div id="sidesDrinksBox">
        Sides and Drinks
        <p v-for="(value,ing) in sidesDrinks" :key="ing">
            {{value}}x {{getItemForKey(ing)["ingredient_"+lang]}}<br>
        </p>
        #{{orderId}}
    </div>
</template>

<script>
    export default {
        name: "SidesDrinksKitchen",
        props:{
            sidesDrinks: Object,
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
    #sidesDrinksBox {
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