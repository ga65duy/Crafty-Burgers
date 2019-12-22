<template>
    <div>
        <Ingredient
                v-for="(count, key) in chosenSidesDrinks"
                v-on:increment="incrementCounter(key)"
                v-on:decrement="decrementCounter(key)"
                :item="getItemForKey(key)"
                :lang="lang"
                :key="getItemForKey(key).ingredient_id"
                :disabled="false"
                :plusDisabled="false"
                :counter="count"
                :orderCheck="orderCheck">
        </Ingredient>
    </div>
</template>
<script>
    import Ingredient from '@/components/Ingredient.vue'

    export default {
        name: 'OrderOverviewSidesDrinks',
        components: {
            Ingredient
        },
        props: {
            allIngredients: Array,
            chosenSidesDrinks: Object,
            uiLabels: Object,
            lang: String,
            //show caption of sides and drinks directly above + - not above picture like in sides and drinks
            orderCheck: Boolean
        },

        methods: {
            getItemForKey: function (key) {
                return this.allIngredients.filter(item => item.ingredient_en === key)[0];
            },

            incrementCounter: function (key) {
                // sending 'increment' message to parent component or view so that it
                // can catch it with v-on:increment in the component declaration
                let item = this.getItemForKey(key);
                this.$emit('increment', item);
            },
            decrementCounter: function (key) {
                let item = this.getItemForKey(key);
                this.$emit('decrement', item);
                // sending 'increment' message to parent component or view so that it
                // can catch it with v-on:increment in the component declaration
            },
            getImgUrl: function(ingredient) {
                return require('../assets/'+ingredient)
            }
        }
    }
</script>
<style scoped>
    .ingredient {
        display: block;
        grid-gap: 2em;
        grid-template-columns: 20em 20em;
        margin: 0.3em;
        padding: 20px;
        width: auto;
        border-style: solid;
        border-color: black;
        font-size: 2em;
        text-align: center;
        font-family:arial;
    }
    #image {
        width:250px;
    }
</style>