<template>
    <div>
        <span id="header"> Burger ingredients: make 
            <span id="amount"> {{burger.amount}} </span>
        </span> <br>
        <dl>
            <dt v-if="burger.bun">
                1x {{getItemForKey(burger.bun)["ingredient_"+lang]}}<br>
            </dt>
            <dt v-for="(amount,ing) in burger.chosenIngredients" :key="ing">
                {{amount}}x {{getItemForKey(ing)["ingredient_"+lang]}}<br>
            </dt>
        </dl>
    </div>
</template>

<script>
    export default {
        name: "BurgerViewKitchen",
        props: {
            burger: Object,
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
#amount {
    font-weight: bold;
}
</style>