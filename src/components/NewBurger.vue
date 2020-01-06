<template>
  <div class="newBurger">

<!--warning message -->
  <transition name="modal">
    <div class="modal">
      <div v-if="isOpen">
        <div class="overlay" @click.self="isOpen = false">
          <div class="modal">
           
           <header class="modal-header">
              <slot name="header">
                <p class = "text"> {{uiLabels.warningHeader}} </p>
                  <button
                    type="button"
                    class="btn-close"
                    @click = "isOpen = false">
                        <span class = "text"> x </span>
                  </button>
              </slot>
            </header>
           
           <section class="modal-body">
              <slot name="body">
                <p class = "text">
                    <span class="bold"> {{uiLabels.warningBodyBold1}} </span>
                    {{uiLabels.warningBody}}
                    <span class="bold"> {{uiLabels.warningBodyBold2}} </span>
                </p>
              </slot>
            </section>
            
            <footer class="modal-footer">
              <slot name="footer">
                <button
                    type="button"
                    class="btn-choice"
                    id="btn-yes"
                    @click="isOpen = false"
                    v-on:click="craftNewBurger()">
                      {{uiLabels.yes}}
                </button>
                <button
                  type="button"
                  class="btn-choice"
                  id="btn-no"
                  @click="isOpen = false">
                      {{uiLabels.no}}
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
      @click="isOpen = !isOpen">
      <img id="newBurgerImage" :src="require('../assets/new_burger.png')">
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
      craftNewBurger: function () {
          this.$emit('newBurger');
      }
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
    width: 18vw;
    height: 22vh;
    outline: none;
}
#newBurgerButton:hover {
    cursor: pointer;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    background-color: lightgrey;
}
#newBurgerText {
    font-family: 'Comfortaa', cursive;
    font-size: 1.25em;
    color: darkslategrey;
    
    padding-top: 15px;
    border-top: 2px solid grey;
}
#newBurgerImage {
    padding-top: 15px;
    width: 28%
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
    padding-left: 30px;
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
    margin-left: 20px;
    border: none;
    width: 20px;
    height: 20px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    background: transparent;
    text-align: center;
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
    outline: none;
}
.btn-choice:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24);
}
#btn-yes {
    background: #8FBC8F;
}
#btn-yes:hover, btn-no:active {
    background:  #609f60;
}
#btn-no {
    background: #F08080;
}
#btn-no:hover, btn-no:active {
   background: #ea4848;
}
</style>
