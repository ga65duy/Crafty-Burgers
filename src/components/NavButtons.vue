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
    border-style: solid;
    border-color: black;
    width: auto;
    font-size: 3em;
    text-align: center;
    font-family:arial;
    background-color: lightgrey;
}
</style>