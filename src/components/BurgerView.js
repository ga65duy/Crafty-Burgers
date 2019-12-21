function BurgerItem(n,img,p,s){
	this.name = n;
	this.image =img;
	this.price =p;
	this.sort =s; // The sort can be topping, bun, mea, etc...
	this.show =function(item){ // this function return the link to the image if you work in Vue or just shows the img if you work with J
		item.innerHTML += '<td><img src='+ this.image+'  title='+this.name+'/></td>';
		return img
	}
}
class Bun extends BurgerItem(bottom){
	this.bot = bottom; //This will be the bottom img of the bun
		this.showbot =function(item){ // Same as above but for the bottom bun
		item.innerHTML += '<td><img src='+ this.bot+'  title='+this.name+'/></td>';
		return img
	}
}
function Burger(n,b,i ){
	this.name = n;
	this.bun = b;
	this.top = i ;// i is an array of BurgerItem
	this.cost = function(){
		var total;
		for(var element of this.top){
			total += element.price;
		}
		total += this.bun.price;
		return total
	}
	this.show =function(item){
		var list = document.createElement('ul');
		list.style.listStyleType = "none";
		var topbun_item = document.createElement('li');
		bun.show(topbun_item);
		list.appendChild(topbun_item)
		for(var element of this.top){
	 	var listitem = document.createElement('li');
		element.show(listitem);
		list.appendChild(listitem);
		}
		
		var botbun_item = document.createElement('li');
		bun.showbot(botbun_item);
		list.appendChild(topbun_item)
		
		item.appendChild(list)// there is still to create the "remove button"
	}
}