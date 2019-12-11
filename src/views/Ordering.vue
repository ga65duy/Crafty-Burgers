<template>
  <div id="ordering">
    <img class="example-panel" src="@/assets/exampleImage.jpg">
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
  <section>
    <NavButtons
      ref="navigation"
      v-for="s in steps"
      v-bind:step="s"
      v-on:selected="changeStep">
    </NavButtons>
  </section>
    <FoodPref
            v-if="currentStep===0"
            :ui-labels="uiLabels"
            :lang="lang">
    </FoodPref>
    <div id="ing">
      <Ingredient
              ref="ingredient"
              v-for="item in ingredients"
              v-if="item.category===currentStep"
              v-on:increment="addToOrder(item)"
              v-on:decrement="removeOrder(item)"
              :item="item"
              :lang="lang"
              :key="item.ingredient_id">
      </Ingredient>
    </div>

    <h1>{{ uiLabels.order }}</h1>
    {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}, {{ price }} kr
    <button v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>

    <h1>{{ uiLabels.ordersInQueue }}</h1>
    <div>
      <OrderItem 
        v-for="(order, key) in orders"
        v-if="order.status !== 'done'"
        :order-id="key"
        :order="order" 
        :ui-labels="uiLabels"
        :lang="lang"
        :key="key">
      </OrderItem>
    </div>
  </div>
</template>
<script>

//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'
import FoodPref from '@/components/FoodPref.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'
import NavButtons from "../components/NavButtons";

/* instead of defining a Vue instance, export default allows the only 
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: 'Ordering',
  components: {
    NavButtons,
    Ingredient,
    OrderItem,
    FoodPref
  },
  mixins: [sharedVueStuff], // include stuff that is used in both 
                            // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
      steps: [{step: 0, label: "Preferences"},{step: 4, label: "Bun"},{step: 1, label: "Patty"},{step: 2, label: "Extras"},
              {step: 3, label: "Sauce"},{step: 5, label: "Sides"},{step: 6, label: "Drinks"},{step: 7, label: "+Burger"}],
      currentStep: 0
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    changeStep: function(nextStep){
      this.currentStep = nextStep;
    },
    addToOrder: function (item) {
      this.chosenIngredients.push(item);
      this.price += +item.selling_price;
    },
    removeOrder: function (item){
      this.chosenIngredients.pop(item);
      this.price -= -item.selling_price;
    },
    placeOrder: function () {
      var i,
      //Wrap the order in an object
        order = {
          ingredients: this.chosenIngredients,
          price: this.price
        };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit('order', {order: order});
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];
    }
  }
}
</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
#ordering {
  margin:auto;
  width: 40em;
}

.example-panel {
  position: fixed;
  left:0;
  top:0;
  z-index: -2;
}
#ing{
  display: grid;
  grid-gap: 2em;
  grid-template-columns: 20em 20em 20em;
}

/*.ingredient {
  border: 1px solid #ccd;
  padding: 1em;
  background-image: url('~@/assets/exampleImage.jpg');
  color: white;
}*/
</style>