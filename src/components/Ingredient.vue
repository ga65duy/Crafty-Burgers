<template>
          <div class="ingredient">
                  <div v-if="!orderCheck">
                      <span class="name"> {{item["ingredient_"+ lang]}} </span> <br>
                      <span class="price"> {{item.selling_price}} kr </span> <br>
                  </div>

                  <img :src="getImgUrl(item.image_path)" v-bind:alt="item.image_path" id="image"> <br>

                  <div v-if="orderCheck">
                      <span class="nameOrderCheck"> {{item["ingredient_"+ lang]}} </span>:
                      <span class="priceOrderCheck"> {{item.selling_price}} kr </span> <br>
                  </div>

                  <!-- Minus button -->
                  <input
                       type="image"
                       src="https://image.flaticon.com/icons/svg/149/149146.svg"
                       :disabled="validatedCounter === 0"
                       value="-"
                       class="button-minus"
                       data-field="quantity"
                       v-on:click="decrementCounter()"
                  />

                 <span id="counter">
                     {{validatedCounter}}
                 </span>

                  <!-- Plus button -->
                  <input type="image"
                   src="https://image.flaticon.com/icons/svg/149/149145.svg"
                   :disabled="disabled || plusDisabled"
                   value="+" class="button-plus"
                   data-field="quantity"
                   v-on:click="incrementCounter()"
                  />
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
    getImgUrl: function(ingredient) {
        return require('../assets/'+ingredient)
    }
  }
}
</script>
<style scoped>

  .ingredient {
      padding: 20px;
      width: 18vw;
      height: auto;
      max-height: 400px;
      max-width: 18vw;
      border: 1.5px solid grey;
      border-radius: 3px;
      font-size: 2em;
      text-align: center;
      font-family:comfortaa, sans-serif;
      background: #e7e7e7;
  }

  #image {
      width: 90%;
      padding: 10px;
  }
  .name {
    font-size: 0.8em;
    font-weight: bold;
  }
  .price {
    font-size: 0.7em;
  }

  #counter {
      text-align: center;
      margin-right: 2vw;
      margin-left: 2vw;
      font-size: 0.8em;
  }

  .nameOrderCheck {
      font-weight: bold;
      font-size: 0.9em;
  }
  .priceOrderCheck {
      font-size: 0.9em;
      margin-left: 15px;
      font-weight: bold;
  }
  input {
    background:  lightgrey;
    border: none;
    border-radius: 50%;
    width: 2.5vw;
    height: 2.5vw;
    vertical-align: middle;
    font-weight: bold;
    outline: none;
    }
  input:hover, input:active  {
    background-color: #bfbfbf;
    }
  input:disabled {
    background: #e7e7e7;
    box-shadow: none;
  }


  @media only screen and (max-width: 850px){
      .ingredient {
          padding: 10px;
          width: 20vw;
          border: 1.5px solid grey;
          border-radius: 3px;
          font-size: 1.4em;
          display: block;
          text-align: center;
          font-family:comfortaa, sans-serif;
          background: #e7e7e7;
      }
      #image {
          width: 80%;
          padding: 10px;
      }
      #name {
        font-size: 0.8em;
        font-weight: bold;
      }
      #price {
        font-size: 0.7em;
      }
      input {
        background:  lightgrey;
        border: none;
        border-radius: 50%;
        width: 2.5vw;
        height: 2.5vw;
        vertical-align: middle;
        font-weight: bold;
        outline: none;
        }
      input:hover, input:active {
        background-color: #bfbfbf;
        }
      input:disabled {
        background: #e7e7e7;
        box-shadow: none;
      }
      #counter {
        margin-right: 2vw;
        margin-left: 2vw;
        font-size: 0.8em; 
        }
  }
</style>