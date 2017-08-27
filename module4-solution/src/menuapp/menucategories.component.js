(function () {
  "use strict";

  angular.
    module("MenuApp").
    controller("MenuCategoriesController", CategoriesController);

  CategoriesController.$inject = ["categories"];
  function CategoriesController(categories) {
    var ctrl = this;
    ctrl.categories = categories;
  }

})();
