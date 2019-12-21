<template>
<div>
	<div id = 'burgerpre' v-for="item in ing">
	<img v-bind:src="'@/assets/' + item.image_path"/>
	<img class="example-panel" src="src/assets/beefpatty200">
	{{item.image_path}}
	<button v-on:click="remove_ing(item)">Button_img</button>
	</div>
</div>
</template>

<script>

export default {
  name: 'Burgerview',
  props: {
    ing: Array
  },
    data: function () {
    return {
      coutains: [],	
    };
  },
  methods: {
    remove_ing: function (item) {
    },
  }
}
</script>
<style scoped>
ul {
list-style-type: none
}
border: solid;
</style>
