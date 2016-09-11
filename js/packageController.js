fruitkitControllers.controller('packageController', 
  ['$scope', '$routeParams' ,'$location', '$http', 'GetJson', 'connectToKallesServer',  
  function($scope, $routeParams, $location, $http, GetJson, connectToKallesServer ) {
    $scope.packs = [];
    connectToKallesServer.getPackages(function (data) {
      $scope.packs = data;
      console.log("real packages", $scope.packs );
    });

    $scope.packName = "";
	   $scope.packWeight = "";
	   $scope.packFruits = "";
     $scope.price = "";
    
    $scope.addPackage = function(){
    	$scope.pack = {};
      	$scope.pack.name = $scope.packName || "no name";
      	$scope.pack.weight = $scope.packWeight  || "no weight";
      	$scope.pack.fruits = $scope.packFruits || "no fruits";
       
      	$scope.packs.push($scope.pack);
      	connectToKallesServer.postPackages($scope.pack);
      	$scope.showForm = !$scope.showForm;
    };

    $scope.removePackage = function(id, index){
      console.log("deleted", id);
      connectToKallesServer.deletePackage(id);
      $scope.packs.splice(index, 1);
     };
   

}]);