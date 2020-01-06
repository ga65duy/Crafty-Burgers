<template>
    <button v-on:click="next"> Next </button>
</template>

<script>
    export default {
        name: "NextButtonKitchen",
        methods: {
            next: function () {
                this.$emit('next');
            }
        }
    }

</script>

<style scoped>
button {
    background: rgb(64, 165, 0);
    width: 280px;
    margin-top: 30px;
    padding: 5px;
    height: 60px;
    font-size: 1.5em;
    box-shadow: 0 0 8px 0 rgb(64, 165, 0);
    border: none;
    border-radius: 12px;
    outline: none;
}
button:active {
    background: green;
}

</style>