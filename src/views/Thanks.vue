<template>
  <div id="thanks">
    <img class="picture" src="@/assets/woodImage.jpg">
    <h1>{{uiLabels.checkoutText}} {{orderNumber}}</h1>
    <div id="againButton">
      <router-link id="routerLink" to="/">{{uiLabels.startAgainButton}}</router-link>
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
  name: 'Thanks',
  components: {
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      orderNumber: ""
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
}
</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */

#thanks {
  width: 100%;
  height: 100%;
  margin: 0;
  border: 0;
  padding: 0;
  text-align: center;
  font-family: Comfortaa, sans-serif;
}
h1 {
  text-align: center;
  display: inline-block;
  color: #e6e6e6;
  font-size: 5em;
  margin-top: 150px;
  margin-bottom: 0;
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
  width: 800px;
  font-size: 3em;
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
  width: 800px;
  font-size: 3em;
}
input {
  width: 5vw;
  outline: none;
 }
 #againButton{
  display: inline-block;
  text-align:center;
  margin-bottom: 15vh;
}
#langButton {
  text-align: center;
  padding-bottom:  20px;
}
.picture {
  position: fixed;
  left:0;
  top:0;
  z-index: -1;
}

@media only screen and (max-width: 850px){
        #thanks {
        width: 100vw;
        height: 100vh;
        margin: 0;
        border: 0;
        padding: 0;
        text-align: center;
        font-family: Comfortaa, sans-serif;
        }
        h1 {
        text-align: center;
        display: inline-block;
        color: #e6e6e6;
        font-size: 3.5em;
        margin-top: 50px;
        margin-bottom: 0;
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
        input {
        width: 5vw;
        outline: none;
        }
        #againButton{
        display: inline-block;
        text-align:center;
        margin-bottom: 15vh;
        }
        #langButton {
        text-align: center;
        padding-bottom:  20px;
        }
        .picture {
          position: fixed;
          left:0;
          top:0;
          z-index: -1;
        }
}
</style>