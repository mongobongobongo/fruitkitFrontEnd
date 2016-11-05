fruitkitControllers.controller('packageController', 
  ['$scope', '$routeParams' ,'$location', '$http', 'connectToStagingServer', 'AuthService', 'API_ENDPOINT', '$state', 'cloneObj',
  function($scope, $routeParams, $location, $http, connectToStagingServer, AuthService, API_ENDPOINT, $state, cloneObj) {
    $scope.packToEdit = {};

    $scope.edit = function(pack){
      $scope.packToEdit = cloneObj.clone(pack);
      $scope.currentPack = pack;
      $scope.editing = true;
    };

    $scope.editPack = function(changedValue, id){
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
  
    $scope.removePackage = function(id, index){
      console.log("deleted", id);
      connectToStagingServer.deletePackage(id);
      $scope.packs.splice(index, 1);
     };
   

}]);
