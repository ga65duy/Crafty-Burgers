<template>
    <div v-if="burger.price>0">
        Burger ingredients: make {{burger.amount}} <br>
        <p v-if="burger.bun">
            1x {{getItemForKey(burger.bun)["ingredient_"+lang]}}<br>
        </p>
        <p v-for="(amount,ing) in burger.chosenIngredients" :key="ing">
            {{amount}}x {{getItemForKey(ing)["ingredient_"+lang]}}<br>
        </p>
        #{{orderId}}
    </div>
</template>

<script>
    export default {
        name: "BurgerViewKitchen",
        props: {
            burger: Object,
            orderId: Number,
            allIngredients: Array,
            uiLabels: Object,
            lang: String
        },
        methods:{
            getItemForKey: function (key) {
                return this.allIngredients.filter(item => item.ingredient_id === Number(key))[0];
            },
        }
    }
</script>

<style scoped>
</style>