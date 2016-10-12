fruitkitControllers.controller('packageController', 
  ['$scope', '$routeParams' ,'$location', '$http', 'connectToStagingServer', 'AuthService', 'API_ENDPOINT', '$state',
  function($scope, $routeParams, $location, $http, connectToStagingServer, AuthService, API_ENDPOINT, $state) {
    $scope.packs = [];

    //old server
    /*connectToKallesServer.getPackages(function (data) {
      $scope.packs = data;
      console.log("real packages", $scope.packs );
    });*/

    // new server
    //info from new servers
    connectToStagingServer.getPackages(function (data) {
      $scope.packs = data;
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
      connectToStagingServer.deletePackage(id);
      $scope.packs.splice(index, 1);
     };
   

}]);
