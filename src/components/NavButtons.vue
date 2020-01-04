<template>
    <div>
        <button
        class="buttonSelected"
        v-if="currentStep===step.step"
        v-bind:ref="step.label"
        v-bind:id="step.label"
        v-on:click="selectedButton" autoFocus>
            {{step.label}}
        </button>
        <button
        v-else
        v-bind:ref="step.label"
        v-bind:id="step.label"
        v-on:click="selectedButton" autoFocus>
            {{step.label}}
        </button>
    </div>
</template>

<script>
    export default {
        name: "NavButtons",
        props: {
            step: Object,
            currentStep: Number
        },
        data: function () {
            return {
            }
        },
        mounted() {
            this.focusInput();
        },
        methods: {
            selectedButton: function () {
                this.$emit('selected',this.step.step);
            },
            focusInput: function() {
                this.$refs.Preferences.focus();
            },

        },
    }
</script>

<style scoped>
button {
    margin: 0.1em;
    margin-right: 5px;
    width: 130px;
    height: 50px;
    padding: 5px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid grey;
    border-radius: 20px;
    background-color: #e7e7e7;
    font-family: Comfortaa, sans-serif;
    font-size: 1.5em;
    color: darkslategrey;
}
button:focus {
    background-color: #70db70;
    box-shadow: 0 0 8px 0 #52cc10ff;
    border: 1px solid #5cd65c;
    outline: none;
}
 .buttonSelected {
    background-color: #70db70;
    box-shadow: 0 0 8px 0 #52cc10ff;
    border: 1px solid #5cd65c;
    outline: none;
}
#Preferences {
    width: 190px;
}
</style>