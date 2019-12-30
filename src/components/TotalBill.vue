<template>
    <div id="priceTable">
        <table>
            <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Sum</th>
            </tr>
            <tr v-if="order.currentBurger.price > 0">
                <td>{{name(order.currentBurger.id)}}</td>
                <td>{{order.currentBurger.price}}</td>
                <td>x{{order.currentBurger.amount}}</td>
                <td>{{order.currentBurger.price * order.currentBurger.amount}}</td>
            </tr>
            <tr v-for="burger in order.otherBurgers" :key="burger.id">
                <td>{{name(burger.id)}}</td>
                <td>{{burger.price}}</td>
                <td>x{{burger.amount}}</td>
                <td>{{burger.price * burger.amount}}</td>
            </tr>
            <tr v-for="(count, key) in this.order.sides" :key="key">
                <td>{{getItemForKey(key)["ingredient_"+lang]}}</td>
                <td>{{getItemForKey(key).selling_price}}</td>
                <td>x{{count}}</td>
                <td>{{getItemForKey(key).selling_price * count}}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td></td>
                <td></td>
                <td>{{getTotal()}}</td>
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
    font-size: 2em;
    display: block;
    text-align: center;
    font-family:arial;
}
</style>