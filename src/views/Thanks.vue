<template>
  <div id="thanks">
    <h1>{{uiLabels.checkoutText}} {{orderNumber}}</h1>
    <div id="againButton">
        <a href="http://localhost:8080/#/">{{uiLabels.startAgainButton}}</a>
    </div>
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

a {
    display: block;
    text-decoration: none;
    color: black;
    border: solid;
    margin-top: 175px;
    padding: 10px;
    text-align: center;
    background-color: #52cc10ff;
    width: 600px;
    font-size: 3em;
    }
#thanks {
  background-image: url("../assets/woodImage.jpg");
  width: 100%;
  height: 100vh;
  margin: 0px;
  border: 0px;
  padding: 0px;
  text-align: center;
}

h1 {
  text-align: center;
  display: inline-block;
  color: #d9d9d9;
  font-size: 5em;
  margin-top: 150px;
}

button{
  position: fixed;
  bottom: 50px;
  font-size: 2em;
 }

#langButton a{
  text.align: center;
  display: inline-block;
}

#againButton{
  display: inline-block;
  text-align:center;
}
</style>