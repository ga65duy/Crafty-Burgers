<template>
  <div id="welcome">
   
    <h1>{{ uiLabels.welcomeText }}</h1>
    <div id="proceedButton">
      <a href="http://localhost:8080/#/ordering">{{ uiLabels.startButton }}</a>
    </div>
    <div id="langButton">
      <input type="image"
       v-bind:src="uiLabels.flag"
       v-on:click="switchLang()">
    </div>
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
#welcome {
  background-image: url("../assets/woodImage.jpg");
  width: 100%;
  height: 100%;
  margin: 0px;
  border: 0px;
  padding: 0px;
  text-align: center;
  font-family: Comfortaa, sans-serif;
}
h1 {
  text-align: center;
  display: inline-block;
  color: #e6e6e6;
  font-size: 5em;
  margin-top: 150px;
  margin-bottom: 0vh;
}
a {
    display: block;
    text-decoration: none;
    color: black;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 16px 0 #52cc10ff;
    margin-top: 130px;
    padding: 10px;
    text-align: center;
    background-color: #52cc10ff;
    width: 600px;
    font-size: 3em;
}
input{
  width: 5vw;
}
#proceedButton{
  display: inline-block;
  text-align:center;
  margin-bottom: 15vh;
}
#langButton {
  text-align: center;
  padding-bottom: 20px;
}

@media only screen and (max-width: 850px){
    #welcome {
      background-image: url("../assets/woodImage.jpg");
      width: 100vw;
      height: 100vh;
      margin: 0px;
      border: 0px;
      padding: 0px;
      text-align: center;
      font-family: Comfortaa, sans-serif;
    }
    h1 {
      text-align: center;
      display: inline-block;
      color: #e6e6e6;
      font-size: 4em;
      margin-top: 30px;
      margin-bottom: 0vh;
    }
    a {
        display: block;
        text-decoration: none;
        color: black;
        border: none;
        border-radius: 10px;
        box-shadow: 0 0 16px 0 #52cc10ff;
        margin-top: 30px;
        padding: 10px;
        text-align: center;
        background-color: #52cc10ff;
        width: 600px;
        font-size: 2em;
    }
    input{
      width: 5vw;
    }
    #proceedButton{
      display: inline-block;
      text-align:center;
      margin-bottom: 15vh;
    }
    #langButton {
      text-align: center;
      padding-bottom: 20px;
    }

}
</style>