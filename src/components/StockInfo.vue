<template>
  <div id="stock">
    Soon out of stock:
    <dl>
      <dt v-for="item in ingredients" v-if="item.stock < 5">
        {{item.ingredient_en}} ({{item.stock > 0 ? item.stock : 0}})
      </dt>
    </dl>
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
dt {
    padding: 5px;
}
</style>