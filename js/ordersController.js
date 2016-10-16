fruitkitControllers.controller('ordersController', 
  ['$rootScope', '$scope', '$http', 'connectToStagingServer', 'AuthService', 'API_ENDPOINT', '$state',
  function($rootScope, $scope, $http, connectToStagingServer, AuthService, API_ENDPOINT, $state) {

  $scope.orders = [];
  $scope.packs = [];
  $scope.customers = [];
  $scope.employees = [];

  //info from new server

  connectToStagingServer.getOrders(function (data) {
    $scope.orders = data;
  });

  connectToStagingServer.getPackages(function (data) {
    $scope.packs = data;
  });

  connectToStagingServer.getCustomers(function (data) {
    $scope.customers = data;
  });

  connectToStagingServer.getEmployees(function (data){
    $scope.employees = data;
  });

  //check if working correctly
  $scope.removeOrder = function(id, index){
    connectToStagingServer.deleteOrder(id);
    $scope.orders.splice(index, 1);
    console.log("deleted", id); 
  }; 

}]);
