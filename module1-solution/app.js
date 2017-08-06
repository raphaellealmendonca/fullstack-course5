(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
  $scope.lunchText = "";

  $scope.checkQuantity = function () {
    var lunchText = $scope.lunchText;

    if (lunchText.length == 0) {
      $scope.resultMessage = "Please enter data first";
    } else {

      $scope.resultMessage = splitFoodFromText(lunchText);

    }
  }

  function splitFoodFromText(lunchText) {
    var food = lunchText.split(',');

    if (food.length > 3) {
      return "Too much!";
    }

    return "Enjoy!";
  }
});

})();
