(function () {
  "use strict";

  angular.
    module("MenuApp").
    controller("CategoryItemsController", CategoryItemsController);

  CategoryItemsController.$inject = ["items"];
  function CategoryItemsController(items) {
    var ctrl = this;

    ctrl.items = items;
  }

})();
