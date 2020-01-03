<template>
  <div class="preferences">
    <label>
        {{prefs}}
        <input type="checkbox" id="noFP" v-on:click="foodPref" :checked="prefsNotSelected"/>
        <label class="btn" for="noFP">{{uiLabels.noFoodPreferences}}</label>
        <input type="checkbox" id="veg" v-on:click="foodPref" :checked="prefs[0]"/>
        <label class="btn" for="veg">{{uiLabels.vegan}} </label>
        <input type="checkbox" id="lact" v-on:click="foodPref" :checked="prefs[1]"/>
        <label class="btn" for="lact">{{uiLabels.lactoseFree}}</label>
        <input type="checkbox" id="glut" v-on:click="foodPref" :checked="prefs[2]"/>
        <label class="btn" for="glut">{{uiLabels.glutenFree}}</label>
    </label>
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
      prefsNotSelected: function () {
          return this.prefs.every(elem => elem === false)
      }
    },
  methods: {
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
    border-style: solid;
    border-color: black;
    width: 400px;
    font-size: 2em;
    display: block;
    text-align: center;
    font-family:arial; 
    background-color: lightgrey;
}

input[type="checkbox"]:checked + label {
    background-color: rgb(64, 165, 0);
}
</style>