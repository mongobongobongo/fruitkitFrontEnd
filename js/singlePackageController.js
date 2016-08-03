fruitkitControllers.controller('singlePackageController', ['$scope', '$routeParams','$location', '$http', 'GetJson', 'connectToKallesServer', function($scope, $routeParams, $location, $http, GetJson, connectToKallesServer) {
$scope.message = 'This is one package here';
      //push orders into array as we receive the json 
      $scope.thisPack = "";
    connectToKallesServer.getPackages(function (data) {
      $scope.packs = data;
      console.log("real packages", $scope.packs );
      $scope.packID = $routeParams.packageId;
        
       
        
       angular.forEach(data, function(pack) {
             if(pack._id == $routeParams.packageId){
              $scope.thisPack = pack;
              console.log("this order", $scope.thisPack);
             }
        }); 
    });

    connectToKallesServer.getOrders(function (data) {
        
       angular.forEach(data, function(order) {
             if($scope.thisPack.name == order.pack){
                $scope.ordersWithThisPack.push(order);
             }
        }); 
    });
   /* GetJson.fetchAllOrders().success(function (response) {
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
       
     });*/
}]);