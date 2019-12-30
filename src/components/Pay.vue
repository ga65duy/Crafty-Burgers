<template>
    <div v-on:click="clickedPay()">
        <br><br>
        <a href="http://localhost:8080/#/thankyou">Pay--></a>
    </div>
</template>

<script>
    export default {
        name: "PayButton",
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
a {
    text-decoration: none;
    color: black;
    border: solid;
    padding: 10px;
    border-radius: 4em;
    margin-top: 7em
    }
</style>