<template>
    <div v-on:click="clickedPay()">
    <a href="http://localhost:8080/#/thankyou">
      <button type="submit"
              v-on:click="clickedPay()"
              :disabled="disabled"
      >
        {{uiLabels.pay}}
        <img src="https://image.flaticon.com/icons/svg/1411/1411444.svg">
        </button>
    </a>
    </div>
</template>

<script>
    export default {
        name: "PayButton",
        props: {
            uiLabels: Object,
            lang: String,
            disabled: Boolean
        },
        data: function () {
            return {
            }
        },
        methods: {
            clickedPay(){
                this.$emit("clickedPay")
            }
        },
    }
</script>

<style scoped>
button {
    font-family: 'Comfortaa', cursive;
    font-size: 14pt;
    color: darkslategrey;
    border-radius: 10px;
    border: 2px solid grey;
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 40px;
    width: 200px;
    height: 40px;
    align-self: center;
    text-align: center;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

button:disabled {
    background: rgba(0,0,0,0.24);
    box-shadow: none;
    pointer-events: none;
}

button:hover {
    cursor: pointer;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    background-color: lightgreen;
}
img {
    width: 1.8vw;
    padding-left: 1vw;
}
</style>