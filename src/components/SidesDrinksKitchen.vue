<template>
    <div>
         <span id="header"> Sides and Drinks </span>
        <dl>
            <dt v-for="(value,ing) in item.sidesAndDrinks" :key="ing">
                {{value}}x {{getItemForKey(ing)["ingredient_"+lang]}}
            </dt>
        </dl>
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

#header {
    font-size: 0.8em;
    color: darkslategrey;
}
dl {
    margin-top: 15px;
}
dt {
    padding-bottom: 5px;
    font-size: 0.9em;
}
</style>