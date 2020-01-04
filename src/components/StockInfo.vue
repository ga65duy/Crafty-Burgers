<template>
  <div>
    Soon out of stock:
    <ul>
      <li v-for="item in ingredients" v-if="item.stock < 5">
        {{item.ingredient_en}} ({{item.stock > 0 ? item.stock : 0}})
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'StockInfo',
  props: {
    ingredients: Array,
  }
}
</script>
<style scoped>
 
</style>