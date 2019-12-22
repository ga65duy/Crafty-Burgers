<template>
<div class="burgerpre">
	<div v-for="item in ingredientItemList">
		<button v-if="addBurgerPage===false" v-on:click="removeIngredient(item)">X</button>
		<img :src="getImgUrl(item.image_path)" v-bind:alt="item.image_path" id="image"> <br>
<!--		<img id="bunFlipped" :src="getImgUrl(item.image_path)" v-bind:alt="item.image_path"> <br>-->
	</div>
	Name: {{this.burger.name}}
	Total: {{burger.price * burger.amount}} kr
	<div v-if="addBurgerPage">
		<input  type="button" value="-" class="button-minus" data-field="quantity" v-on:click="decrementBurger()">
		{{burger.amount}}
		<input  type="button" value="+" class="button-plus" data-field="quantity" v-on:click="incrementBurger()">
	</div>
	</div>
</template>

<script>

export default {
	name: 'BurgerView',
	props: {
		allIngredients: Array,
		burger: Object,
		addBurgerPage: Boolean,
	},
	computed: {
		ingredientItemList: function () {
			let ingredientKeyList = this.getChosenIngredientsAsList(this.burger.chosenIngredients);
			console.log(ingredientKeyList);
			return ingredientKeyList.map(key => this.getItemForKey(key));
		}
	},

	methods: {
		getImgUrl: function (ingredient) {
			return require('../assets/' + ingredient)
			//filter all Ingredients, returns the english name
		},
		getItemForKey: function (key) {
			return this.allIngredients.filter(item => item.ingredient_en === key)[0];
		},
		getChosenIngredientsAsList: function (chosenIngredientsDict) {
			let ingredientList = [];
			for (const [itemKey, count] of Object.entries(chosenIngredientsDict)) {
				for (let i = count; i > 0; i--) {
					ingredientList.push(itemKey)
				}
			}
			return ingredientList
		},
		removeIngredient: function (item) {
			this.$emit('removeIngredient', item);
		},
		incrementBurger: function () {
			// Send burger id to know which burger is incremented
			this.$emit('incrementBurger', this.burger.id);
		},
		decrementBurger: function () {
			if (this.burger.amount > 0) {
				// Send burger id to know which burger is decremented
				this.$emit('decrementBurger', this.burger.id);
			}
		}
	}
}

</script>
<style scoped>
	#bunFlipped {
		transform: scaleY(-1);
	}
	.burgerpre {
		display: grid;
		grid-template-columns: 1em 2em;
		display: block;
		font-size: 2em;
		display: block;
		text-align: center;
		font-family:arial;
	}
	img {
		width:250px;
	}
</style>
