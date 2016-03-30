fruitkitControllers.controller('singleOrderController', ['$scope', '$routeParams','$location', '$http', 'GetJson', function($scope, $routeParams) {
    $scope.message = 'This is one order here';
    $scope.orderID = $routeParams.orderId;
   	$scope.thisOrder = {};
   console.log($scope.ordersJson.orders);
   console.log($scope.ordersJson.orders);
   angular.forEach($scope.ordersJson.orders, function(order) {
         if(order.orderId == $routeParams.orderId){
         	$scope.thisOrder = order;
         	console.log("this order", $scope.thisOrder);
         }

    });	
    
}]);

