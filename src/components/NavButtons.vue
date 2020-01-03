<template>
    <div>
        <button id="button" v-on:click="selectedButton">{{step.label}}</button>
    </div>
</template>

<script>
    export default {
        name: "NavButtons",
        props: {
            step: Object
        },
        data: function () {
            return {
            }
        },
        methods: {
            selectedButton: function () {
                this.$emit('selected',this.step.step);
            },
        },
    }
</script>

<style scoped>
#button {
    margin: 0.1em;
    border: 2px solid grey;
    border-radius: 20px;
    width: auto;
    font-size: 2em;
    text-align: center;
    background-color: #e7e7e7;
    font-family: Comfortaa, sans-serif;
}
</style>