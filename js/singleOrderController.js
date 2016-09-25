fruitkitControllers.controller('singleOrderController', 
  ['$scope', '$routeParams','$location', '$http', 'GetJson', 'connectToKallesServer', 'connectToStagingServer',
  function($scope, $routeParams, $location, $http, GetJson, connectToKallesServer, connectToStagingServer) {
    $scope.message = 'This is one order here';

    //old server
    connectToKallesServer.getOrders(function (data) {
        $scope.orders = data;   
        $scope.orderID = $routeParams.orderId;
        $scope.thisOrder = {};
        angular.forEach($scope.orders, function(order) {
            if(order._id == $routeParams.orderId){
                $scope.thisOrder = order;
            }
        }); 
    });

    connectToKallesServer.getCustomers(function (data) {
        $scope.customers = data;
    });

    connectToKallesServer.getPackages(function (data) {
        $scope.packs = data;
    });

    //new server
  //info from new server

    connectToStagingServer.getOrders(function (data) {
        $scope.orders = data;   
        $scope.orderID = $routeParams.orderId;
        $scope.thisOrder = {};
        angular.forEach($scope.orders, function(order) {
            if(order._id == $routeParams.orderId){
                $scope.thisOrder = order;
            }
        }); 
    });

    connectToStagingServer.getCustomers(function (data) {
        $scope.customers = data;
    });

    connectToStagingServer.getPackages(function (data) {
        $scope.packs = data;
    });

    $scope.changedOrderPack = function(changedValue, id){ 
        connectToKallesServer.putOrder({
             pack: changedValue
        },id);
    };
    $scope.changedOrderCustomer = function(changedValue, id){ 
        connectToKallesServer.putOrder({
             customer: changedValue
        },id);
    };

    $scope.toggle = function(){
        $scope.showForm = !$scope.showForm;
    };
}]);

