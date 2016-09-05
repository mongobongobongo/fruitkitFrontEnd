fruitkitControllers.controller('ordersController', 
  ['$scope', '$routeParams' ,'$location', '$http', 'GetJson', 'connectToKallesServer', 
  function($scope, $routeParams, $location, $http, GetJson, connectToKallesServer ) {

  //scope variables  
  $scope.orders = [];
  $scope.packs = [];
  $scope.customers = [];
  $scope.employees = [];
  $scope.driversList  = [];

 
  connectToKallesServer.getOrders(function (data) {
    $scope.orders = data;
  });

  connectToKallesServer.getPackages(function (data) {
    $scope.packs = data;
  });

  connectToKallesServer.getCustomers(function (data) {
    $scope.customers = data;
  });

  connectToKallesServer.getEmployees(function(data){
     $scope.employees = data;
  });

  $scope.removeOrder = function(id, index){
    console.log("deleted", id); 
    connectToKallesServer.deleteOrder(id);
    $scope.orders.splice(index, 1);
  };

  $scope.sortBy = function(driverToSort){
    $scope.driversList = [];
    angular.forEach($scope.orders, function(order){
        //$scope.order =  order;
        if(order.orderDriver.firstName === driverToSort.firstName){
             $scope.driversList.push(order);
        }
    });
  }
     

}]);