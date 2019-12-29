<template>
  <div class="newBurger">
    <label>
      <button id="newBurgerButton"
      v-on:click="craftNewBurger">
<!-- Insert new Burger picture here       <img id="newBurgerImage" src="@/assets/NewBurger.jpg" width=80%>-->
       <p id="newBurgerText">{{uiLabels.newBurger}}</p>
     </button>
    </label>
  </div>
  
</template>
<script>
export default {
  name: 'NewBurger',
  props: {
  uiLabels: Object,
  lang: String
  },
  methods: {
    craftNewBurger: function() {
        console.log("Hallo");
    }
  }
}
</script>
<style scoped>
  #newBurgerButton {
    background-color: #e7e7e7;
    border-radius: 10px;
    border: 2px solid grey;
    padding-left: 20px;
    padding-right: 20px;
    width: 20vw;
}

#newBurgerButton:hover {
    cursor: pointer;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    background-color: lightgrey;
}

#newBurgerText {
    font-family: 'Comfortaa', cursive;
    font-size: 18pt;
    color: darkslategrey;
    
    padding-top: 30px;
    border-top: 2px solid grey;
}

#newBurgerImage {
    padding-top: 20px;
}
</style>
