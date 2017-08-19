(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.isEmpty = function () {
    return (list.items.lenght == 0);
  };
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.searchTerm = "";
  list.foundItems = [];

  list.doSearch = function () {
    if(list.searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
      promise.then(function (items) {
        list.foundItems = items;
      });
    }
  }

  list.removeItem = function(itemIndex) {
      list.foundItems.splice(itemIndex, 1);
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function(result){
      var menuItems = result.data["menu_items"];

      for (var i = 0; i < menuItems.length; i++) {
        var name = menuItems[i].name;
        if (name.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItem = {
            name: menuItems[i].name,
            short_name: menuItems[i].short_name,
            description: menuItems[i].description
          };
          foundItems.push(foundItem);
        }
      }

      return foundItems;
    });
  };
}

})();
