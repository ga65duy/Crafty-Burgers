<template>
  <div class="ingredient" id="box">
      {{item["ingredient_"+ lang]}}   {{item.selling_price}}kr <br>
      Picture <br>
      <input type="button" value="-" class="button-minus" data-field="quantity" v-on:click="decrementCounter()">
      {{counter}}
      <input type="button" value="+" class="button-plus" data-field="quantity" v-on:click="incrementCounter()">
  </div>
</template>
<script>
export default {
  name: 'Ingredient',
  props: {
    item: Object,
    lang: String
  },
    data: function () {
    return {
      counter: 0
    };
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1;
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('increment');
    },
    decrementCounter: function () {
      if(this.counter!==0){
        this.counter -= 1;
      }
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('decrement');
    },
    resetCounter: function () {
      this.counter = 0;
    }
  }
}
</script>
<style scoped>
  .ingredient {
    padding: 20px;
    margin: 20px;
    width: auto;
    border-width: 1px;
    border-style: solid;
    border-color: black;
  }
</style>