<template>
    <div v-on:click="clickedPay()">
    <a href="http://localhost:8080/#/thankyou">
      <button type="submit" v-on:click="clickedPay()">
        {{uiLabels.pay}}
        <img width = 40  src="https://image.flaticon.com/icons/svg/1411/1411444.svg">
        </button>
    </a>
    </div>
</template>

<script>
    export default {
        name: "PayButton",
        props: {
            uiLabels: Object,
            lang: String
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
    font-size: 1.9em;
    font-weight: bold;
    color: darkslategrey;
    background-color: #e7e7e7;
    border-radius: 10px;
    border: 2px solid grey;
    padding: 15px 20px 15px 20px;;
    width: 27vw;
}
button:hover {
    cursor: pointer;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    background-color: lightgreen;
}
img {
    padding-left: 10px;
}
</style>