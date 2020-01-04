<template>
  <div id="stocklist">
    Soon out of stock:
    <ul id="example-1">
    <li>
        {{item.ingredient_en}} ({{ item.stock }})
    </li>
    </ul> 
  </div>
</template>
<script>
export default {
  name: 'StockInfo',
  props: {
    uiLabels: Object,
    lang: String,
    item: Object,
  },
  computed: {},
  methods: {
  }
}
</script>
<style scoped>
 
</style>