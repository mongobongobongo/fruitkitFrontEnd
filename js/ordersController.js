fruitkitControllers.controller('ordersController', 
  ['$scope', '$routeParams' ,'$location', '$http', 'connectToKallesServer', 'connectToStagingServer',
  function($scope, $routeParams, $location, $http, connectToKallesServer, connectToStagingServer) {

  //scope variables  
  $scope.orders = [];
  $scope.packs = [];
  $scope.customers = [];
  $scope.employees = [];
  $scope.driversList  = [];

  //old server  
  /*connectToKallesServer.getOrders(function (data) {
    $scope.orders = data;
  });*/

  connectToKallesServer.getPackages(function (data) {
    $scope.packs = data;
  });

  connectToKallesServer.getCustomers(function (data) {
    $scope.customers = data;
  });

  connectToKallesServer.getEmployees(function(data){
     $scope.employees = data;
  });

  //new server
  //info from new server

    connectToStagingServer.getOrders(function (data) {
      $scope.orders = data;
    });

    //info from new servers
    connectToStagingServer.getPackages(function (data) {
      $scope.packs = data;
    });

    connectToStagingServer.getCustomers(function (data) {
      $scope.customers = data;
    });

    connectToStagingServer.getEmployees(function (data){
      $scope.employees = data;
    });


  $scope.removeOrder = function(id, index){
    console.log("deleted", id); 
    //new server
  //info from new server
    connectToKallesServer.deleteOrder(id);
    connectToStagingServer.deleteOrder(id);
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
