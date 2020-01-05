<template>
    <div v-if="item" class="orderItem">
        <BurgerViewKitchen
                v-if="item.type === 'burger'"
                :burger="item"
                :allIngredients="allIngredients"
                :lang="lang"
        />
        <SidesDrinksKitchen
                v-if="item.type === 'sidesAndDrinks'"
                :item="item"
                :allIngredients="allIngredients"
                :lang="lang"
        />
        <div v-if="showTimer">
            Timer: {{timerMinutes}}:{{timerSeconds}} <br>
        </div>

        #{{item.orderId}} ({{item.step}}/{{item.totalSteps}})
    </div>
    <div v-else class="orderItem">
        No order available
    </div>

</template>

<script>
    import BurgerViewKitchen from "./BurgerViewKitchen";
    import SidesDrinksKitchen from "./SidesDrinksKitchen";

    export default {
        name: "OrderViewKitchen",
        components: {SidesDrinksKitchen, BurgerViewKitchen},
        data: function () {
            return {
                timerSeconds: 0,
                timerMinutes: 0
            }
        },
        props:{
            item: Object,
            allIngredients: Array,
            uiLabels: Object,
            lang: String,
            // The time the object is shown on screen
            showingTime: Date,
            showTimer: Boolean
        },
        // Code taken from
        // https://github.com/vuejs/Discussion/issues/214   and
        // https://stackoverflow.com/questions/13903897/javascript-return-number-of-days-hours-minutes-seconds-between-two-dates

        created: function() {
            this.updateTimer();
            setInterval(this.updateTimer, 1000);
        },
        destroyed: function() {
            clearInterval();
        },
        methods: {
            updateTimer: function() {
                let now = new Date();
                let delta = Math.floor((now - this.showingTime) / 1000);
                this.timerMinutes = Math.floor(delta / 60) % 60;
                delta -= this.timerMinutes * 60;
                this.timerSeconds = Math.floor(delta % 60);
            }
        }
    }
</script>

<style scoped>
    .orderItem {
        display: block;
        padding: 20px;
        width: auto;
        height: auto;
        font-size: 2em;
        text-align: center;
        font-family:arial;
        overflow: auto;
    }
</style>