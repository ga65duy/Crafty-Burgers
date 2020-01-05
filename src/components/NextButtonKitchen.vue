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
button{
    width: 100px;
    background-color: #52cc10ff;
    font-size: 1.2em;
    margin-top: 0.6em;
}
</style>