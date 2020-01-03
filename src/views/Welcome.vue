<template>
  <div id="welcome">
   
    <h1>{{ uiLabels.welcomeText }}</h1>
    <a href="http://localhost:8080/#/ordering">{{ uiLabels.startButton }}</a>
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
  </div>
</template>
<script>

//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

/* instead of defining a Vue instance, export default allows the only 
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: 'Welcome',
  components: {
  },
  mixins: [sharedVueStuff], // include stuff that is used in both 
                            // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
    }
  },
  computed: {
    
  },
  methods: {
    /*openFullscreen: function() {
      var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { // Firefox 
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { // Chrome, Safari & Opera 
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { // IE/Edge 
        elem.msRequestFullscreen();
      }
    }*/
  }
}




</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
a {
    display: block;
    text-decoration: none;
    color: black;
    border: solid;
    padding: 10px;
    text-align: center;
    }
#welcome {
  background-image: url("../assets/woodImage.jpg");
  width: 100vw;
  height: 100vh;
  margin: 0px;
  border: 0px;
  padding: 0px;
  text-align:center;
}

h1 {
  text-align: center;
  color: #d9d9d9;
  font-size: 3em;
}

button{
  margin-top: 50px;
}
</style>