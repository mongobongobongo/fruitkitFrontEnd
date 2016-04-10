fruitkitControllers.controller('singleOrderController', ['$scope', '$routeParams','$location', '$http', 'GetJson', function($scope, $routeParams, $location, $http, GetJson) {
$scope.message = 'This is one order here';
      //push orders into array as we receive the json 
    GetJson.fetchAllOrders().success(function (response) {
        $scope.allData = response;
        $scope.newOrderList = [];
        console.log(response);
        console.log($scope.allData );
        
        $scope.orderID = $routeParams.orderId;
         console.log($scope.orderID);
        $scope.thisOrder = {};
        //console.log($scope.ordersJson.orders);
        //console.log($scope.ordersJson.orders);
       angular.forEach($scope.allData.orders, function(order) {
             if(order.orderId == $routeParams.orderId){
              $scope.thisOrder = order;
              console.log("this order", $scope.thisOrder);
             }

        }); 
       
     });
}]);

