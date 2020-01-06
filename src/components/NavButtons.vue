<template>
    <div>
        <button
        class="buttonSelected"
        v-if="currentStep===step.step"
        v-bind:id="step.label"
        v-on:click="selectedButton">
            {{step.label}}
        </button>
        <button
        v-else
        v-bind:id="step.label"
        v-on:click="selectedButton">
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
        methods: {
            selectedButton: function () {
                this.$emit('selected',this.step.step);
            },
        },
    }
</script>

<style scoped>
button {
    margin: 0.1em;
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
    outline: none;
}
button:hover {
    cursor: pointer;
    background:lightgrey;
}
button:active {
    background:lightgrey;
}
 .buttonSelected {
    background-color: #52cc10ff;
    box-shadow: 0 0 8px 0 #52cc10ff;
    border: 1px solid #5cd65c;
}
 .buttonSelected:hover {
    background: #52cc10ff;
}
#Preferences {
    width: 190px;
}
#Preferenser {
    width: 190px;
}

@media only screen and (max-width: 850px){
            button {
            margin: 0.1em;
            margin-right: 5px;
            width: auto;
            height: 30px;
            padding: 5px;
            text-align: center;
            vertical-align: middle;
            border: 1px solid grey;
            border-radius: 20px;
            background-color: #e7e7e7;
            font-family: Comfortaa, sans-serif;
            font-size: 1.1em;
            color: darkslategrey;
            outline: none;
        }
        .buttonSelected {
            background-color: #52cc10ff;
            box-shadow: 0 0 8px 0 #52cc10ff;
            border: 1px solid #5cd65c;
            outline: none;
        }
        #Preferences {
            width: 130px;
        }
        #Preferenser {
            width: 130px;
        }
}
</style>