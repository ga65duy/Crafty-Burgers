<template>
  <div class="preferences">
    <label>
        <input type="checkbox" id="noFP" v-on:click="noFoodPref()" checked/>
        <label class="btn" for="noFP">{{uiLabels.noFoodPreferences}}</label>
        <input type="checkbox" id="veg" v-on:click="foodPref()"/>
        <label class="btn" for="veg">{{uiLabels.vegan}}</label>
        <input type="checkbox" id="lact" v-on:click="foodPref()"/>
        <label class="btn" for="lact">{{uiLabels.lactoseFree}}</label>
        <input type="checkbox" id="glut" v-on:click="foodPref()"/>
        <label class="btn" for="glut">{{uiLabels.glutenFree}}</label>
    </label>
  </div>
</template>
<script>
export default {
  name: 'FoodPref',
  props: {
    uiLabels: Object,
    lang: String
  },
    data: function () {
    return {
        prefs: [false,false,false]
    };
  },
  methods: {
    noFoodPref: function () {
      document.getElementById("veg").checked = false;
      document.getElementById("lact").checked = false;
      document.getElementById("glut").checked = false;
      this.prefs=[false,false,false];
      this.$emit('noPreference', this.prefs)
    },
    foodPref: function () {
      document.getElementById("noFP").checked = false;
      this.prefs[0]= document.getElementById("veg").checked;
      this.prefs[1]= document.getElementById("lact").checked;
      this.prefs[2]= document.getElementById("glut").checked;
      this.$emit('yesPreference', this.prefs)
        //console.log(this.prefs)
    }
  }
  // this.$emit('preference');*/
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