<template>
  <div class="ingredient" id="box">
      <div v-if="!orderCheck">
          {{item["ingredient_"+ lang]}} {{item.selling_price}}kr <br>
      </div>
      <img :src="getImgUrl(item.image_path)" v-bind:alt="item.image_path" id="image"> <br>
      <div v-if="orderCheck">
          {{item["ingredient_"+ lang]}} {{item.selling_price}}kr <br>
      </div>
      <input type="button" :disabled="disabled" value="-" class="button-minus" data-field="quantity" v-on:click="decrementCounter()">
      {{validatedCounter}}
      <input type="button" :disabled="disabled || plusDisabled" value="+" class="button-plus" data-field="quantity" v-on:click="incrementCounter()">
  </div>
</template>
<script>
export default {
  name: 'Ingredient',
  props: {
    item: Object,
    lang: String,
    counter: Number,
    disabled: Boolean,
    plusDisabled: Boolean,
    //show caption of sides and drinks directly above + - not above picture like in sides and drinks pages
    orderCheck: Boolean
  },
    computed: {
      validatedCounter: function () {
          return isNaN(this.counter) ? 0 : this.counter;
      }
    },
  methods: {
    incrementCounter: function () {
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('increment');
    },
    decrementCounter: function () {
      if(this.counter > 0){
        this.$emit('decrement');
      }
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
    },
    resetCounter: function () {
      this.counter = 0;
    },
    getImgUrl: function(ingredient) {
        return require('../assets/'+ingredient)
    }
  }
}
</script>
<style scoped>
  .ingredient {
      display: grid;
      grid-gap: 2em;
      grid-template-columns: 20em 20em;
      margin: 0.3em;
      padding: 20px;
      width: auto;
      border-style: solid;
      border-color: black;
      font-size: 2em;
      display: block;
      text-align: center;
      font-family:arial;
  }
  #image {
      width:250px;
  }
</style>