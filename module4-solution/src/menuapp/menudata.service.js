(function () {
  "use strict";

  angular.module("Data").
    service("MenuDataService", MenuDataService).
    constant("ApiBaseUri", "https://davids-restaurant.herokuapp.com");

  MenuDataService.inject = ["$http", "ApiBaseUri"];
  function MenuDataService ($http, ApiBaseUri) {
    var service = this;

    service.getAllCategories = function () {
      return $http({
        url: ApiBaseUri + "/categories.json"
      }).then(function (response) {
        return response.data;
      });
    };

    service.getItemsForCategory = function (categoryShortName) {
      return $http({
        url: (ApiBaseUri + "/menu_items.json"),
        params: {category: categoryShortName}
      }).then(function (response) {
        return response.data.menu_items;
      });
    }
  }

})();
