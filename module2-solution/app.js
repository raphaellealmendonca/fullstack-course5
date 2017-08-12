(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];

function ToBuyShoppingController(ShoppingListCheckOffService) {
  var toBuy = this;
  var service = ShoppingListCheckOffService;

  toBuy.itemsList = service.getToBuyItemsList();
  toBuy.buyItem = service.buyItem;
  toBuy.listIsEmpty = service.toBuyItemsListIsEmpty;

}

function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var alreadyBought = this;
  var service = ShoppingListCheckOffService;

  alreadyBought.itemsList = service.getBoughtItemsList();
  alreadyBought.listIsEmpty = service.boughtItemsListIsEmpty;
}

function ShoppingListCheckOffService() {
  var service = this;
  var toBuyItemsList = new Array();
  var boughtItemsList = new Array();

  toBuyItemsList.push({name: "Cookies", quantity: "10"});
  toBuyItemsList.push({name: "Apples", quantity: "4"});
  toBuyItemsList.push({name: "Milks", quantity: "5"});
  toBuyItemsList.push({name: "Corns", quantity: "7"});
  toBuyItemsList.push({name: "Oranges", quantity: "8"});
  toBuyItemsList.push({name: "Eggs", quantity: "12"});

  service.getToBuyItemsList = function () {
    return toBuyItemsList;
  }

  service.getBoughtItemsList = function () {
    return boughtItemsList;
  }

  service.buyItem = function (itemIndex) {
    var boughtItem = toBuyItemsList[itemIndex];

    toBuyItemsList.splice(itemIndex, 1);

    boughtItemsList.push(boughtItem);
  }

  service.toBuyItemsListIsEmpty = function () {
    return (toBuyItemsList.length == 0);
  }

  service.boughtItemsListIsEmpty = function () {
    return (boughtItemsList.length == 0);
  }

}

})();
