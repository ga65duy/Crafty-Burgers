<template>
    <div>
        <section class="navigation">
            <button v-on:click.prevent="step=1">Step 1</button>
            <button v-on:click.prevent="step=2">Step 2</button>
            <button v-on:click.prevent="step=3">Step 3</button>
            <button v-on:click.prevent="step=4">Step 4</button>
            <button v-on:click.prevent="step=5">Step 5</button>
            <button v-on:click.prevent="step=6">Step 6</button>
            <button v-on:click.prevent="step=7">Step 7</button>
            <button v-on:click.prevent="step=8">Step 8</button>
            <br><!--I would like to display the next/previous buttons at the bottom of the page only, does this require 2 components?-->
            <button v-if="step!=1" v-on:click.prevent="previousStep">Previous</button><!--".prevent" is to prevent refreshing of the page-->
            <button v-if="step!=totalSteps" v-on:click.prevent="nextStep">Next</button><!--otherwise every button press will reset to step 1-->
            <!--probably do not need to display next step button on submit order page, submit order button should double up function-->
        </section>
    </div>
</template>

<script>
    export default {
        name: "NavButtons",
        data: function () {
            return {
                step: 1,
                totalSteps: 8,
            }
        },
        methods: {
            previousStep: function () {
                this.step--;
            },
            nextStep: function () {
                this.step++;
            },
        },
        computed: {
            isPickingOrderItems: function () {
                return this.step== 1||this.step==2||this.step== 3||this.step== 4||this.step== 5||this.step== 6
                //this.$emit("isPickingOrderItems")
            }
        }
    }
</script>

<style scoped>

</style>