<template>
  <div class="newBurger">
  
<!--warning message -->
    <transition name="modal">
    <div class="modal">
      <div v-if="isOpen">
        <div class="overlay" @click.self="isOpen = false;">
          <div class="modal">
            <header class="modal-header">
        <slot name="header">
          <p class = "text"> Do you want to craft a new burger? </p>

          <button
            type="button"
            class="btn-close"
            @click = "isOpen = false;">
            <p class = "text"> x </p>
          </button>
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
          <p class = "text"> <span class="bold">Changes</span> in your current burger are <span class="bold"> no more possible</span>.</p>
        </slot>
       </section>
       <footer class="modal-footer">
          <slot name="footer">
          <button
              type="button"
              class="btn-choice"
              id="btn-yes"
              @click="isOpen = false;"
              <!--v-on:click="addNewBurger"
              v-on:click="changeStep(1) --> >
              YES
          </button>

            <button
              type="button"
              class="btn-choice"
              id="btn-no"
              @click="isOpen = false;">
              NO
          </button>
        </slot>
      </footer>
          </div>
        </div>
      </div>
      </div>
    </transition>
    
<!--button -->
    <label>
      <button id="newBurgerButton"
      @click="isOpen = !isOpen;">
<!-- Insert new Burger picture here       <img id="newBurgerImage" src="@/assets/NewBurger.jpg" width=80%>-->
       <p id="newBurgerText">{{uiLabels.newBurger}}</p>
     </button>
    </label>
  </div>
  
</template>

<script>
export default {
  name: 'NewBurger',
  components: {
    NavButtons
  },
  props: {
  uiLabels: Object,
  lang: String
  },
  data: function() {
    return {
      isOpen: false
    };
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


  .modal {
    background: #e7e7e7;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    font-size: 32px;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }
  
.text {
    font-family: 'Comfortaa', cursive;
    color: darkslategrey;
}
.bold {
    font-weight: bold;
}

.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}

.btn-close {
    margin-left: 30px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    background: transparent;
  }

  .btn-choice {
    padding: 7px;
    margin: auto;
    color: white;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
    font-size: 1.1rem;
    cursor: pointer;
    width: 100px;
  }
  
  #btn-yes {
    background: #8FBC8F;
  }
  #btn-no {
    background: #F08080;
  }
</style>
