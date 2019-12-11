<template>
    <div>
        <button v-on:click="selectedButton">{{step.label}}</button>
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

</style>