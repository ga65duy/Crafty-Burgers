<template>
    <div class="grid-container">
        <StockInfo
          class="grid-item"
          id="itemStock"
          :ingredients="ingredients"
        >
        </StockInfo>

        <OrderViewKitchen
                class="grid-item"
                id="item1"
                :item="ordersItemList[0]"
                :allIngredients="ingredients"
                :lang="lang"
                :showingTime="new Date()"
                :showTimer="true"
       />

        <OrderViewKitchen
                class="grid-item"
                id="item2"
                :item="ordersItemList[1]"
                :allIngredients="ingredients"
                :lang="lang"
                :showingTime="new Date()"
                :showTimer="false"
        />

        <OrderViewKitchen
                class="grid-item"
                id="item3"
                :item="ordersItemList[2]"
                :allIngredients="ingredients"
                :lang="lang"
                :showingTime="new Date()"
                :showTimer="false"
        />

        <OrderViewKitchen
                class="grid-item"
                id="item4"
                :item="ordersItemList[3]"
                :allIngredients="ingredients"
                :lang="lang"
                :showingTime="new Date()"
                :showTimer="false"
        />

        <TimeAndEmp
            v-on:next="next"
            class="grid-item"
            id="itemEmployeeNext"
        />

    </div>
</template>
<script>
    import sharedVueStuff from '@/components/sharedVueStuff.js'
    import BurgerViewKitchen from "../components/BurgerViewKitchen";
    import OrderViewKitchen from "../components/OrderViewKitchen";
    import TimeAndEmp from "../components/KitchenViewEmployeeComp";
    import StockInfo from "../components/StockInfo"

    export default {
        name: 'Kitchen',
        components: {
            OrderViewKitchen,
            BurgerViewKitchen,
            TimeAndEmp,
            StockInfo
        },
        mixins: [sharedVueStuff], // include stuff that is used in both
                                  //the ordering system and the kitchen
        computed: {
            ordersItemList: function () {
                // Return the items (i.e. burger, sides, drinks) of all ongoing orders as an list.
                let allOrdersItemList = [];
                for (let order of Object.values(this.orders)) {
                        let singleOrderItemList = [];
                        // 1. Put all burgers of each order in the list
                        for (let burger  of order.allBurgers) {
                            if (burger.status !== "done") {
                                singleOrderItemList.push(burger);
                            }
                        }
                        // 2. Add the sides and drinks to the item list as well
                        if (Object.entries(order.sidesAndDrinks.sidesAndDrinks).length > 0) {
                            if (order.sidesAndDrinks.status !== "done") {
                                singleOrderItemList.push(order.sidesAndDrinks);
                            }

                        }
                        // 3. Now we can calculate the total number of items in one order and give every item a step number
                        for (let item of singleOrderItemList) {
                            // For a burger the step is its id. For the sides and drinks the step is one more than the number of burgers
                            item["step"] = item.type === 'burger' ? item.id : order.allBurgers.length + 1;

                            // If a drink or side is selected a further step is necessary to complete the order
                            let stepSidesAndDrinksNecessary = Object.entries(order.sidesAndDrinks.sidesAndDrinks).length === 0 ? 0 : 1;
                            item["totalSteps"] = order.allBurgers.length + stepSidesAndDrinksNecessary;
                            item["orderId"] = order.orderId;
                        }
                        allOrdersItemList.push(...singleOrderItemList)
                }
                return allOrdersItemList;
            }
        },
        methods: {
            next: function () {
                let completedItem = this.ordersItemList[0];
                if (completedItem && completedItem.type === 'burger' ) {
                    this.$store.state.socket.emit("burgerDone", [completedItem.orderId, completedItem.id]);

                } else if (completedItem && completedItem.type === 'sidesAndDrinks') {
                    this.$store.state.socket.emit("sidesDone", completedItem.orderId);

                } else {
                    //console.log("Next clicked without an order");
                }

            },
        }
    }
</script>
<style scoped>
    .grid-container {
        display: grid;
        background: #e7e7e7;
        height:97vh;
    }
    #itemStock {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 2;

        display: block;
        padding: 20px;
        width: auto;
        border-right: 1px solid lightslategrey;
        border-bottom: 1px solid lightslategrey;
        font-size: 2em;
        text-align: center;
        font-family:arial, sans-serif;
    }
    #item1 {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;

        background: white;
        border: 1px solid lightslategrey;
        border-top: none;
    }
    #item2 {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;

        border-top: 1px solid lightslategrey;
        border-right: 1px solid lightslategrey;
    }
    #item3 {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;

        border: 1px solid lightslategrey;
        border-bottom: none;
    }
    #item4 {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 3;

        border-top: 1px solid lightslategrey;
        border-left: 1px solid lightslategrey;
    }
    #itemEmployeeNext {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 2;

        display: block;
        padding: 20px;
        width: auto;
        height: auto;
        font-size: 2em;
        text-align: center;
        font-family:arial, sans-serif;;

        border-left: 1px solid lightslategrey;
        border-bottom: 1px solid lightslategrey;
    }

</style>