<template>
    <button onclick="next"> Next </button>
</template>

<script>
    export default {
        name: "NextButtonKitchen",
        methods: {
            next: function () {
                this.$emit('ClickedNext');
            }
        }
    }

</script>

<style scoped>

</style>