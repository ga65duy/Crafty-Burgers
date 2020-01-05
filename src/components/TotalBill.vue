<template>
    <div id="priceTable">
        <table>
            <tr>
                <th>{{uiLabels.item}}</th>
                <th>{{uiLabels.price}}</th>
                <th>{{uiLabels.amount}}</th>
                <th>{{uiLabels.sum}}</th>
            </tr>
            <tr v-if="order.currentBurger.price > 0">
                <td>{{name(order.currentBurger.id)}}</td>
                <td>{{order.currentBurger.price}} kr</td>
                <td>x{{order.currentBurger.amount}}</td>
                <td>{{order.currentBurger.price * order.currentBurger.amount}} kr</td>
            </tr>
            <tr v-for="burger in order.otherBurgers" :key="burger.id">
                <td>{{name(burger.id)}}</td>
                <td>{{burger.price}} kr</td>
                <td>x{{burger.amount}}</td>
                <td>{{burger.price * burger.amount}} kr</td>
            </tr>
            <tr v-for="(count, key) in this.order.sides" :key="key">
                <td>{{getItemForKey(key)["ingredient_"+lang]}}</td>
                <td>{{getItemForKey(key).selling_price}} kr</td>
                <td>x{{count}}</td>
                <td>{{getItemForKey(key).selling_price * count}} kr</td>
            </tr>
            <tr id="total">
                <td>Total</td>
                <td></td>
                <td></td>
                <td>{{getTotal()}}kr</td>
            </tr>
        </table>

    </div>
</template>

<script>
export default {
    name: "TotalBill",
    props: {
        order: Object,
        uiLabels: Object,
        lang: String,
        allIngredients: Array
    },

    methods: {
        getItemForKey: function (key) {
            return this.allIngredients.filter(item => item.ingredient_id === Number(key))[0];
        },
        name: function (id) {
            return this.uiLabels.burger + " #" + id;
        },
        getTotal: function (){
            let res = 0;
            for (const burger of this.order.otherBurgers){
                res = res + burger.amount * burger.price;
            }
           for(const [key, count] of Object.entries(this.order.sides)) {
                res = res + count * this.getItemForKey(key).selling_price
            }
            res = res + this.order.currentBurger.price * this.order.currentBurger.amount;
            return res;
        }
        }
    }
</script>

<style scoped>
#priceTable {
    font-size: 1.5em;
    display: block;
    text-align: center;
    font-family: comfortaa, sans-serif;
}
table {
    border-collapse: collapse;
    text-align: center;
    width: auto;
}
th {
    padding: 10px;
     border-bottom: 2px solid grey;
}
td {
    padding: 10px;
    border-bottom: 1px solid lightgrey;
}
#total td {
    padding: 10px;
    padding-top: 20px;
    border-top: 3px solid grey;
    border-bottom: none;
    font-size: 1.5em;
    font-weight: bold;
}
</style>