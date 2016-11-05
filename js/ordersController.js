fruitkitControllers.controller('ordersController', 
  ['$rootScope', '$scope', '$http', 'connectToStagingServer', 'AuthService', 'API_ENDPOINT', '$state', 'cloneObj',
  function($rootScope, $scope, $http, connectToStagingServer, AuthService, API_ENDPOINT, $state, cloneObj) {
  
  $scope.orderToEdit = {};

  $scope.edit = function(order){
    $scope.orderToEdit = cloneObj.clone(order);
    $scope.currentOrder= order;
    $scope.editing = true;
  };

  $scope.editOrder = function(changedValue, id){
    var data = {};

    data.name = changedValue.name || null;
    data.weight = changedValue.weight || null;
    data.fruits = changedValue.fruits || null;
    data.price = changedValue.price|| null;

    connectToStagingServer.putPackage(data, id)
      .success(function () {
        Object.assign($scope.currentPack, changedValue);
        $scope.currentPack = null;
        $scope.editing = false;
      });
  }
  $scope.removeOrder = function(id, index){
    connectToStagingServer.deleteOrder(id);
    $scope.orders.splice(index, 1);
    console.log("deleted", id); 
  }; 

}]);
