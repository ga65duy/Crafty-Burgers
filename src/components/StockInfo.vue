<template>
  <div id="stock">
    <span id="header"> Soon out of stock </span>
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
#header {
    color: #ff1a1a;
    font-weight: bold;
    font-size: 0.9em;
}
</style>