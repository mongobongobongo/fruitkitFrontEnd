fruitkitControllers.controller('employeesController', 
  ['$scope', '$routeParams' ,'$location', '$http', 'connectToStagingServer', 'cloneObj',
  function($scope, $routeParams, $location, $http, connectToStagingServer, cloneObj) {
    $scope.employeeToEdit = {};

    $scope.edit = function(employee){
      $scope.employeeToEdit = cloneObj.clone(employee);
      $scope.currentEmployee = employee;
      $scope.editing = true;
    };

    $scope.editEmployee = function(changedValue, id){
      var data = {};

      data.firstName = changedValue.firstName || null;
      data.surname= changedValue.surname || null;
      data.phone = changedValue.phone || null;

      connectToStagingServer.putEmployee(data, id)
        .success(function () {
          Object.assign($scope.currentEmployee, changedValue);
          $scope.currentEmployee = null;
          $scope.editing = false;
        });
    }
   	 
   	$scope.remove = function(id, index){
      connectToStagingServer.deleteEmployees(id);
     	$scope.employees.splice(index, 1);
    };

    $scope.toggle = function(){
      $scope.showForm = !$scope.showForm;
    };
}]);
