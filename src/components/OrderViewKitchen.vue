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
        <div v-if="showTimer" id="timer">
           Time: {{timerMinutes}}:{{timerSeconds}} <br>
        </div>

        <div id="step"> 
            #{{item.orderId}} ({{item.step}}/{{item.totalSteps}})
        </div>
    </div>
    <div v-else class="orderItem">
        <span class="text"> No order available </span>
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
                if(Math.floor(delta / 60) % 60>9){
                    this.timerMinutes = Math.floor(delta / 60) % 60;
                }
                else{
                   this.timerMinutes = "0" + Math.floor(delta / 60) % 60; 
                }
                delta -= this.timerMinutes * 60;
                if(Math.floor(delta % 60)>9){
                    this.timerSeconds = Math.floor(delta % 60);
                }
                else{
                   this.timerSeconds = "0" + Math.floor(delta % 60); 
                }
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
        font-family:arial, sans-serif;;
        overflow: auto;
    }
#timer {
    font-size: 0.8em;
}
#step {
    font-size: 0.8em;
}
.text {
    padding-top: 5px;
    font-size: 0.8em;
    color: grey;
}
</style>