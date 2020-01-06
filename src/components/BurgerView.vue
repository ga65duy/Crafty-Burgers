<template>
<div class="burgerpre">
	<!-- Show the top bun -->
	<div v-if="Boolean(burger.bun)">
        <img :src="getImgUrl(bunItem.image_path)"/>
        <input class="remove"
               type="image"
               src="https://image.flaticon.com/icons/svg/149/149147.svg"
               v-if="addBurgerOrCheckPage===false"
               v-on:click="removeIngredient(bunItem)"
        />
	</div>

	<!-- Show the burger ingredients -->
	<div v-for="item in ingredientItemList">
        <img id="image"
             :src="getImgUrl(item.image_path)"
             v-bind:alt="item.image_path"
        />
        <input class="remove"
               type="image"
               src="https://image.flaticon.com/icons/svg/149/149147.svg"
               v-if="addBurgerOrCheckPage===false"
               v-on:click="removeIngredient(item)"
        />
		<br>
	</div>

	<!-- Show the bottom bun -->
	<div v-if="Boolean(burger.bun)">
		<img id="bunFlipped" :src="getImgUrl(bunItem.image_path)" v-bind:alt="bunItem.image_path">
	</div>

    <!-- Show name and price of burger -->
	<p id="total"> {{name}}:
    <span id="price"> {{burger.price}} kr </span>
    </p>

    <!-- If the burger view is used in the addBurger or checkOrder pages a counter is shown to change the number of burgers -->
	<div v-if="addBurgerOrCheckPage" id="counter">
        <!-- Minus button -->
		<input type="image"
               src="https://image.flaticon.com/icons/svg/149/149146.svg"
               class="button-minus"
               data-field="quantity"
               v-on:click="decrementBurger()"
               :disabled="burger.amount === 0"
        />

		<span id="amount">
            {{burger.amount}}
        </span>

        <!-- Plus button -->
		<input type="image"
               src="https://image.flaticon.com/icons/svg/149/149145.svg"
               class="button-plus"
               data-field="quantity"
               v-on:click="incrementBurger()"
        />
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
	display: block;
    font-family: comfortaa, sans-serif;
	font-size: 2em;
    margin-left: 10px;
    padding: 20px;
    border-radius: 3px;
    color: darkslategrey;
    background: #e7e7e7;
	margin-top: 20px;
	width: 22vw;
	height: 68vh;
	border: 1.5px solid grey;
	overflow: auto;
}
img {
	width:16vw;
}
img, .remove{
    vertical-align: middle;
}
.remove {
    background: lightgrey;
    border: none;
    border-radius: 50%;
    width: 2vw;
    height: 2vw;
    vertical-align: middle;
    font-weight: bold;
}
input {
    background:  lightgrey;
    border: none;
    border-radius: 50%;
    width: 2.5vw;
    height: 2.5vw;
    vertical-align: middle;
    font-weight: bold;
    outline: none;
}
input:hover, input:active {
    background-color: #bfbfbf;
}
 input:disabled {
    background: #e7e7e7;
    box-shadow: none;
 }
#total {
    padding-top: 20px;
    font-size: 0.8em;
    margin-bottom: 30px;
    text-align: center;
}
#price {
    margin-left: 15px;
    font-weight: bold;
}
#counter {
    text-align: center;
    padding-top: 15px;
    border-top: 1px solid grey;
}
#amount {
    margin-right: 2.5vw;
    margin-left: 2.5vw;
    font-size: 0.8em;
}

@media only screen and (max-width: 850px){
		#bunFlipped {
			transform: scaleY(-1);
		}
		.burgerpre {
			display: block;
			font-family: comfortaa, sans-serif;
			font-size: 1.5em;
			margin-left: 10px;
			padding: 20px;
			border-radius: 3px;
			color: darkslategrey;
			background: #e7e7e7;
		}
		img {
			width:14vw;
		}
		img, .remove{
			vertical-align: middle;
		}
		.remove {
			background: lightgrey;
			border: none;
			border-radius: 50%;
			width: 2vw;
			height: 2vw;
			vertical-align: middle;
			font-weight: bold;
		}
		input {
			background:  lightgrey;
			border: none;
			border-radius: 50%;
			width: 2.5vw;
			height: 2.5vw;
			vertical-align: middle;
			font-weight: bold;
			outline: none;
		}
		input:hover {
			background-color: #bfbfbf;
		}
		input:disabled {
			background: #e7e7e7;
			box-shadow: none;
		}
		#total {
			padding-top: 20px;
			font-size: 0.8em;
			margin-bottom: 30px;
			text-align: center;
		}
		#price {
			margin-left: 15px;
			font-weight: bold;
		}
		#counter {
			text-align: center;
			padding-top: 15px;
			border-top: 1px solid grey;
		}
		#amount {
			margin-right: 2.5vw;
			margin-left: 2.5vw;
			font-size: 0.8em;
		}
}
</style>
