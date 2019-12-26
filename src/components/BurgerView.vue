<template>
<div class="burgerpre">
	<!-- Show the top bun -->
	<div v-if="Boolean(burger.bun)">
		<button v-if="addBurgerOrCheckPage===false" v-on:click="removeIngredient(bunItem)">X</button>
		<img :src="getImgUrl(bunItem.image_path)">
	</div>
	<!-- Show the burger ingredients -->
	<div v-for="item in ingredientItemList">
		<button v-if="addBurgerOrCheckPage===false" v-on:click="removeIngredient(item)">X</button>
		<img :src="getImgUrl(item.image_path)" v-bind:alt="item.image_path" id="image"> <br>
	</div>

	<!-- Show the bottom bun -->
	<div v-if="Boolean(burger.bun)">
		<img id="bunFlipped" :src="getImgUrl(bunItem.image_path)" v-bind:alt="bunItem.image_path">
	</div>
	{{name}}:  {{burger.price * burger.amount}} kr <br>
	<div v-if="addBurgerOrCheckPage">
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
		addBurgerOrCheckPage: Boolean,
		uiLabels: Object,
		lang: String
	},
	computed: {
		//based on english name, return the whole item
		//e.g salad and return the whole object for this item (swedisch/englisch name, price...)
		ingredientItemList: function () {
			console.log(this.burger);
			let ingredientKeyList = this.getChosenIngredientsAsList(this.burger.chosenIngredients);
			return ingredientKeyList.map(key => this.getItemForKey(key));
		},
		//based on english name (only buns) return the object
		bunItem: function() {
				return this.getItemForKey(this.burger.bun)
		},
		name: function () {
			return this.uiLabels.burger+ " #" + this.burger.id;
		}
	},

	methods: {
		//load img for burger ingredeints
		getImgUrl: function (ingredient) {
			return require('../assets/' + ingredient)
		},
		getItemForKey: function (key) {
			return this.allIngredients.filter(item => item.ingredient_id === Number(key))[0];
		},
		//make out of dictionary e.g. {brioche: 3,salad:1} a list -> [brioche,brioche,brioche,salad]
		getChosenIngredientsAsList: function (chosenIngredientsDict) {
			let ingredientList = [];
			for (const [itemKey, count] of Object.entries(chosenIngredientsDict)) {
				for (let i = count; i > 0; i--) {
					ingredientList.push(itemKey)
				}
			}
			return ingredientList
		},
		//remove ingredient from the burgerView by clicking on x
		removeIngredient: function (item) {
			this.$emit('removeIngredient', item);
		},
		//add ingredients by clicking +
		incrementBurger: function () {
			// Send burger id to know which burger is incremented
			this.$emit('incrementBurger', this.burger.id);
		},
		//remove ingredients by clicking -
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
