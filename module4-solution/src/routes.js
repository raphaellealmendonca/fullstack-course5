(function () {
  "use strict";

  angular.module("MenuApp")
  .config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise("/");

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state("home", {
      url: "/",
      templateUrl: "src/menuapp/templates/home.html"
    })

    //Cateogires Page
    .state("categories", {
      url: "/categories",
      templateUrl: "src/menuapp/templates/menu_categories.html",
      controller: "MenuCategoriesController as menuCategories",
      resolve: {
        categories: ["MenuDataService", function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    // Items page
    .state("items", {
      url: "/categories/{categoryShortName}/items",
      templateUrl: "src/menuapp/templates/category_items.html",
      controller: "CategoryItemsController as categoryItems",
      resolve: {
        items: ["MenuDataService", "$stateParams", function (MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    });
  }
})();
