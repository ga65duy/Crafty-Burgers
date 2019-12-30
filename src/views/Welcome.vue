<template>
  <div id="welcome">
    <h1>Welcome to Crafty Burgers!</h1>
    <a href="http://localhost:8080/#/ordering"> Click here to Craft</a>
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
}
}
</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
a {
    text-decoration: none;
    color: black;
    border: solid;
    padding: 10px;
    }

</style>