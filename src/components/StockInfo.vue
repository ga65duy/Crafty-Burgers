<template>
  <div v-if="item.stock <5" id="stocklist" >
    Soon out of stock:
    <ul id="example-1">
    <li>
        {{item.ingredient_en}} ({{ item.stock }})
    </li>
    </ul> 
  </div>

  <div v-else>
    Soon out of stock:
  </div>
</template>
<script>
export default {
  name: 'StockInfo',
  props: {
    item: Object,
  }
}
</script>
<style scoped>
 
</style>