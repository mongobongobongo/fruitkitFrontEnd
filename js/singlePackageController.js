fruitkitControllers.controller('singlePackageController', ['$scope', '$routeParams','$location', '$http', 'GetJson', function($scope, $routeParams, $location, $http, GetJson) {
$scope.message = 'This is one package here';
      //push orders into array as we receive the json 
    GetJson.fetchAllOrders().success(function (response) {
        $scope.allData = response;
        $scope.ordersWithThisPack = [];
        console.log(response);
        console.log($scope.allData );
        
        $scope.packID = $routeParams.packageId;
         console.log($scope.packID);
        $scope.thisPack = {};
        //console.log($scope.ordersJson.orders);
        //console.log($scope.ordersJson.orders);
       angular.forEach($scope.allData.packs, function(pack) {
             if(pack.id == $routeParams.packageId){
              $scope.thisPack = pack;
              console.log("this order", $scope.thisPack);
             }
        }); 
       angular.forEach($scope.allData.orders, function(order) {
             if(order.orderPack.packname == $scope.thisPack.name){
              
              $scope.ordersWithThisPack.push(order);
             }
        }); 
       console.log($scope.ordersWithThisPack);
       
     });
}]);