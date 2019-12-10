<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//import Ordering from "./views/Ordering.vue"
import Bun from "./views/Bun.vue"
import Patty from "./views/Patty.vue"
import Extras from "./views/Extras.vue"
import Sauce from "./views/Sauces.vue"
import Sides from "./views/Sides.vue"
import Drinks from "./views/Drinks.vue"

export default {
  name: 'app',
  components: {
    Bun,
    Patty,
    Extras,
    Sauce,
    Sides,
    Drinks
  }
}
</script>

<style>

</style>
