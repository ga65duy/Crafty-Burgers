<template>
  <div class="preferences">
    <label>
        <button v-on:click="foodPref(noFoodPref)">{{uiLabels.noFoodPreferences}}</button>
        <button v-on:click="foodPref(veg)">{{uiLabels.vegan}}</button>
        <button v-on:click="foodPref(lact)">{{uiLabels.lactoseFree}}</button>
        <button v-on:click="foodPref(glut)">{{uiLabels.glutenFree}}</button>
    </label>
  </div>
</template>
<script>
export default {
  name: 'foodPreferences',
  props: {
    item: Object,
    lang: String
  },
    data: function () {
    return {
        prefs: [0,0,0]
    };
  },
  methods: {
    foodPref: function (choice) {
      if choice == noFoodPref{
          prefs=[0,0,0]
      }
      else if choice == veg{
          if prefs[0]==1{
            prefs[0]=1
          }
          else{
            prefs[0]=0
          }
      }
      else if choice == lact{
          if prefs[1]==1{
            prefs[1]=1
          }
          else{
            prefs[1]=0
          }
      }
      else if choice ==glut{
          if prefs[2]==1{
            prefs[2]=1
          }
          else{
            prefs[2]=0
          }
      }
      this.$emit('preference');
    }
  }
}
</script>
<style scoped>
  
</style>