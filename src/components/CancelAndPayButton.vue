<template>
    <div class="footer">
        <CancelButton
                :ui-labels="uiLabels"
                :lang="lang"
        />
        <PayButton
                v-if="currentStep===8"
                v-on:clickedPay="clickedPay"
                :ui-labels="uiLabels"
                :lang="lang"
                :disabled="price===0"
        />
    </div>
</template>

<script>
    import PayButton from '@/components/Pay.vue';
    import CancelButton from '@/components/CancelButton.vue';

    export default {
        name: "CancelAndPayButton",
        components: {
            PayButton,
            CancelButton
        },
        props: {
            currentStep: Number,
            uiLabels: Object,
            lang: String,
            price: Number
        },
        methods: {
            clickedPay: function () {
                this.$emit("clickedPay")
            }
        }
    }
</script>

<style scoped>
    .footer {
        position: relative;
        padding: 0;
        margin: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

</style>