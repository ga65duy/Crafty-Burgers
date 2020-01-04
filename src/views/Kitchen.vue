<template>
    <div class="grid-container">
        <!--  TODO: remove following line: only for understanding-->
       {{orders}}

        <!--  <div class="grid-item">
          <OrderViewKitchen
                  v-for="order in orders"
                  :order="order"
                  :allIngredients="ingredients"
                  :lang="lang"
                  :key="order.orderId"
          >
          </OrderViewKitchen>
          </div>
          <div class="grid-item">-->
        <!--TODO: add stock component here-->
        <div class="grid-item" id="itemStock">Stock</div>
        <!--TODO: add employee time component here
            use in employee time component the nextButtonKitchen component
        -->
        <div class="grid-item" id="itemEmployeeNext">
            <NextButtonKitchen
                    class="grid-item"
                    id="itemNext"
                    v-on:ClickedNext="goToNextOrderItem"
            >
            </NextButtonKitchen>
        </div>
        <OrderViewKitchen
                class="grid-item"
                id="item1"
                :item="ordersItemList[0]"
                :allIngredients="ingredients"
                :lang="lang"
        >
        </OrderViewKitchen>
        <OrderViewKitchen
                class="grid-item"
                id="item2"
                :item="ordersItemList[1]"
                :allIngredients="ingredients"
                :lang="lang"
        >
        </OrderViewKitchen>
        <OrderViewKitchen
                class="grid-item"
                id="item3"
                :item="ordersItemList[2]"
                :allIngredients="ingredients"
                :lang="lang"
        >
        </OrderViewKitchen>
        <OrderViewKitchen
                class="grid-item"
                id="item4"
                :item="ordersItemList[3]"
                :allIngredients="ingredients"
                :lang="lang"
        >
        </OrderViewKitchen>
    </div>


    <!--TODO: remove commented code-->
    <!--<h1>{{ uiLabels.ordersInQueue }}</h1>
    <div>
      <OrderItemToPrepare
        v-for="(order, key) in orders"
        v-if="order.status !== 'done'"
        v-on:done="markDone(key)"
        :order-id="key"
        :order="order"
        :ui-labels="uiLabels"
        :lang="lang"
        :key="key">
      </OrderItemToPrepare>
    </div>
    <h1>{{ uiLabels.ordersFinished }}</h1>
    <div>
      <OrderItem
        v-for="(order, key) in orders"
        v-if="order.status === 'done'"
        :order-id="key"
        :order="order"
        :lang="lang"
        :ui-labels="uiLabels"
        :key="key">
      </OrderItem>
    </div>
    </div>-->
</template>
<script>
    //import OrderItem from '@/components/OrderingComponents/OrderItem.vue'
    //import OrderItemToPrepare from '@/components/OrderingComponents/OrderItemToPrepare.vue'

    //import methods and data that are shared between ordering and kitchen views
    import sharedVueStuff from '@/components/sharedVueStuff.js'
    import BurgerViewKitchen from "../components/BurgerViewKitchen";
    import OrderViewKitchen from "../components/OrderViewKitchen";
    import NextButtonKitchen from "../components/NextButtonKitchen";

    export default {
        name: 'Kitchen',
        components: {
            NextButtonKitchen,
            OrderViewKitchen,
            BurgerViewKitchen
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
                        // Add if condition burger is in state not started
                        singleOrderItemList.push(burger);
                    }
                    // 2. Add the sides and drinks to the item list as well
                    if (Object.entries(order.sidesAndDrinks.sidesAndDrinks).length > 0) {
                        // Add if condition sidesAndDrink is in state not started
                        singleOrderItemList.push(order.sidesAndDrinks);
                    }

                    // 3. Now we can calculate the total number of items in one order and give every item a step number
                    for (let [itemId, item] of singleOrderItemList.entries()) {
                        item["step"] = itemId + 1;
                        item["totalItems"] = singleOrderItemList.length;
                        item["orderId"] = order.orderId;
                    }
                    allOrdersItemList.push(...singleOrderItemList)
                }
                return allOrdersItemList;
            }
        },
        methods: {
            markDone: function (orderid) {
                this.$store.state.socket.emit("orderDone", orderid);
            },
            goToNextOrderItem: function () {
                console.log("Next")
            }
        }
    }
</script>
<style scoped>
    .grid-container {
        font-size: 0.8em;
        display: grid;
    }
    #itemStock {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 2;

        display: block;
        padding: 20px;
        width: auto;
        border: 2px solid black;
        font-size: 2em;
        text-align: center;
        font-family:arial;
    }
    #item1 {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;

        border-width: 2px 2px 2px 0;
    }
    #item2 {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;

        border-width: 0 2px 2px 2px;
    }
    #item3 {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;

        border-width: 0 2px 2px 0;
    }
    #item4 {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 3;

        border-width: 2px 2px 2px 0px;
    }
    #itemEmployeeNext {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 2;

        display: block;
        padding: 20px;
        width: auto;
        border-style: solid;
        border-color: black;
        font-size: 2em;
        text-align: center;
        font-family:arial;

        border-width: 2px 2px 0px 0px;
    }
</style>