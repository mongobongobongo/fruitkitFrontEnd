fruitkit.controller('addItemsController', 
  ['$scope', '$routeParams' , '$http', 'connectToStagingServer',
  function($scope, $routeParams, $http, connectToStagingServer){
    $scope.addOrder  = function(){
      $scope.addNewOrder = !$scope.addNewOrder;
    };

    $scope.addEmployee = function(){
      $scope.addNewEmployee = !$scope.addNewEmployee;
    };
     
    $scope.addCustomer = function(){
      $scope.addNewCustomer = !$scope.addNewCustomer;
    };

    $scope.addFruitpack = function(){
      $scope.addNewFruitpack = !$scope.addNewFruitpack;
    };

}]);
