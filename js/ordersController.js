fruitkitControllers.controller('ordersController', 
  ['$rootScope', '$scope', '$http', 'connectToStagingServer', 'AuthService', 'API_ENDPOINT', '$state', 'cloneObj',
  function($rootScope, $scope, $http, connectToStagingServer, AuthService, API_ENDPOINT, $state, cloneObj) {
  
  $scope.orderToEdit = {};

  $scope.orderWeeks = [];
  $scope.orderDays = [];

  $scope.edit = function(order){
    $scope.orderToEdit = cloneObj.clone(order);
    $scope.currentOrder= order;
    $scope.editing = true;
  };

  $scope.editOrder = function(changedValue, id){
    var data = {};

    data.address = changedValue.address|| null;
    data.pack = angular.fromJson(angular.toJson(changedValue.pack)) || null;
    data.isActive = changedValue.isActive || null;
    data.weeks = changedValue.weeks || null;
    data.days = changedValue.days|| [];
    data.firstDelivery = changedValue.firstDelivery || null;
    data.customer = angular.fromJson(angular.toJson(changedValue.customer)) || null;
    data.orderDriver = angular.fromJson(angular.toJson(changedValue.orderDriver))|| {};
    data.orderDriver.firstName = changedValue.orderDriver.firstName || null;
    data.orderStatus = changedValue.orderStatus || null;
    data.statusList = changedValue.statusList || [];
    data.details = changedValue.details || null;
    data.contactPerson = changedValue.contactPerson || null;
    data.telephone = changedValue.telephone || null;


    connectToStagingServer.putOrder(data, id)
      .success(function () {
        Object.assign($scope.currentOrder, changedValue);
        $scope.currentOrder = null;
        $scope.editing = false;
      });
  };

  $scope.removeOrder = function(id, index){
    connectToStagingServer.deleteOrder(id);
    $scope.orders.splice(index, 1);
    console.log("deleted", id); 
  }; 

}]);
