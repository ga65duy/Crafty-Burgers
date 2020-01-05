<template>
  <div class="preferences">
        <input type="checkbox" id="noFP" v-on:click="foodPref" :checked="prefsNotSelected"/>
        <label class="btn" for="noFP">{{uiLabels.noFoodPreferences}}</label>
        <input type="checkbox" id="veg" v-on:click="foodPref" :checked="prefs[0]"/>
        <label class="btn" for="veg">{{uiLabels.vegan}} </label>
        <input type="checkbox" id="lact" v-on:click="foodPref" :checked="prefs[1]"/>
        <label class="btn" for="lact">{{uiLabels.lactoseFree}}</label>
        <input type="checkbox" id="glut" v-on:click="foodPref" :checked="prefs[2]"/>
        <label class="btn" for="glut">{{uiLabels.glutenFree}}</label>
  </div>
</template>
<script>
export default {
  name: 'FoodPref',
  props: {
    uiLabels: Object,
    lang: String,
    prefs: Array
  },
    computed: {
      // mark the button no food preferences if the other options are not chosen
      prefsNotSelected: function () {
          return this.prefs.every(elem => elem === false)
      }
    },
  methods: {
    // changes the states of the buttons
    foodPref: function (event) {
      this.$emit('preferencesChanged', event.target.id);
    }
  }
}
</script>
<style scoped>
  #noFP,#veg,#lact,#glut {
    display: none;
}
.btn {
    margin: 0.3em;
    border: 1.5px solid grey;
    border-radius: 3px;
    width: 450px;
    padding: 5px;
    display: block;
    text-align: center;
    font-family: comfortaa, sans-serif; 
    font-size: 2em;
    background-color: #e7e7e7;
    margin: 10px auto 10px auto;
    
}
input[type="checkbox"]:checked + label {
    background-color: #52cc10ff;
}

.preferences{
  text-align: center;
  padding-top: 50px
}
</style>