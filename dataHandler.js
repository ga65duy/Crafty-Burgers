'use strict';

let csv = require("csvtojson");

let ingredientsDataName = "ingredients";
let transactionsDataName = "transactions";
let defaultLanguage = "en";

// Store data in an object to keep the global namespace clean
function Data() {
  this.data = {};
  this.orders = {};
  this.currentOrderNumber = 0;
}

Data.prototype.getUILabels = function (lang) {
  var ui = require("./data/ui_" + (lang || defaultLanguage) + ".json");
  return ui;
};

/*
  Returns a JSON object array of ingredients with the fields from
  the CSV file, plus a calculated amount in stock, based on
  transactions.
*/
Data.prototype.getIngredients = function () {
  var d = this.data;
  return d[ingredientsDataName].map(function (obj) {
    obj.stock = d[transactionsDataName].reduce(function (sum, trans) {
      if (trans.ingredient_id === obj.ingredient_id) {
        return sum + trans.change;
      } else {
        return sum;
      }
    }, 0);
    return obj;
  });
};

/*
  Function to load initial data from CSV files into the object
*/
Data.prototype.initializeTable = function (table) {
  csv({checkType: true})
    .fromFile("./data/" + table + ".csv")
    .then((jsonObj) => {
      //console.log("JSON object", jsonObj, "done");
      this.data[table] = jsonObj;
    });
};

Data.prototype.initializeData = function() {
  // Load initial ingredients. If you want to add columns, do it in the CSV file.
  this.initializeTable(ingredientsDataName);
  // Load initial stock. Make alterations in the CSV file.
  this.initializeTable(transactionsDataName);
}
/*
  Adds an order to to the queue and makes an withdrawal from the
  stock. If you have time, you should think a bit about whether
  this is the right moment to do this.
*/

Data.prototype.getOrderNumber = function () {
  this.currentOrderNumber += 1;
  return this.currentOrderNumber;
};

//adds order id to order and updates transactions
Data.prototype.addOrder = function (order) {
  var orderId = this.getOrderNumber();
  this.orders[orderId] = order.order;
  this.orders[orderId].orderId = orderId;
  this.orders[orderId].status = "not-started";

  // Add a status to every burger and sidesDrink object within a order
  // Then we can have a status on item level instead of order level
    this.orders[orderId].allBurgers = this.orders[orderId].allBurgers.map(burger => {
      return {...burger,  type: "burger", status: "not-started"}
    });
    this.orders[orderId].sidesAndDrinks =
        {sidesAndDrinks: this.orders[orderId].sidesAndDrinks, type: "sidesAndDrinks", status:"not-started"};

  var transactions = this.data[transactionsDataName],
      //find out the currently highest transaction id
      transId =  transactions[transactions.length - 1].transaction_id;
      let orderIngredients = calculateTotalIngredientUse(order.order);
  for(const [key,amount] of Object.entries(orderIngredients)){
    transId += 1;
    transactions.push({transaction_id: transId,
      ingredient_id: Number(key),
      change: -amount});
  }
  return orderId;
};

function calculateTotalIngredientUse (order) {
  let allBurgers = order.allBurgers;
  // Multiply buns with burger amount and aggregate buns of all burgers
  let bunCount = allBurgers.reduce((accu, burger) => {
    if(burger.bun) {
      accu[burger.bun] = (accu[burger.bun] || 0) + burger.amount;
    }
    return accu;
  }, {});

// For each burger multiply the chosenIngredients with the burger amount
  let ingredients = allBurgers.map(burger => {
    let multipliedIngredients = Object.keys(burger.chosenIngredients).reduce((accu, ingredientKey) => {
      accu[ingredientKey] = burger.chosenIngredients[ingredientKey] * burger.amount;
      return accu;
    }, {});
    return multipliedIngredients;
  });

// Aggregate ingredients of all burgers
  let ingredientCount = ingredients.reduce((accu, choosenIngredients) => {
    for (const [key, value] of Object.entries(choosenIngredients)) {
      accu[key] = (accu[key] || 0) + value
    }
    return accu;
  }, {});
// Combine buns, ingredients and sides and drinks
  return {...bunCount, ...ingredientCount, ...order.sidesAndDrinks}
}

//used to refill the stock in kitchen
Data.prototype.changeStock = function (item, saldo) {
  var transactions = this.data[transactionsDataName];
  var transId = transactions[transactions.length - 1].transaction_id;
  transactions.push({transaction_id: transId,
                     ingredient_id: item.ingredient.ingredient_id,
                     change: saldo - item.ingredient.stock});
};

Data.prototype.getAllOrders = function () {
  return this.orders;
};

Data.prototype.markOrderDone = function (orderId) {
  // Send when all items (i.e. burger or sidesAndDrinks) of an order are done
  this.orders[orderId].status = "done";
};

Data.prototype.markOrderStarted = function (orderId) {
  // Send when the first item is in preperation

  this.orders[orderId].status = "started";
};

Data.prototype.markOrderNotStarted = function (orderId) {
  this.orders[orderId].status = "not-started";
};

Data.prototype.markBurgerFinished = function(orderId, burgerId) {
  // Set the given burger of an order to status 'done'
};

Data.prototype.markSidesFinished = function(orderId) {
  // Set the sidesAndDrinks item of an order to 'done'
};

module.exports = Data;



