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
    background: green;
}
</style>