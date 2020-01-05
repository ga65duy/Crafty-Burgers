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
    font-family: comfortaa, sans-serif;
    font-size: 2vw;
    font-weight: bold;
    color: darkslategrey;
    background-color: lightblue;
    border-radius: 10px;
    border: 2px solid grey;
    padding: 2vh 3vw 2vh 3vw;
    width: 20vw;
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
    width: 3vw;
    padding-left: 1vw;
}
</style>