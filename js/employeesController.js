fruitkitControllers.controller('employeesController', 
  ['$scope', '$routeParams' ,'$location', '$http', 'GetJson', 'connectToKallesServer', 
  function($scope, $routeParams, $location, $http, GetJson, connectToKallesServer ) {
   
     
    connectToKallesServer.getEmployees(function (data) {
    	$scope.employees = data;
    });
    $scope.employeeName = "";
    $scope.employeeSurname = "";
    $scope.employeePhone = "";
    $scope.addEmployee = function(){
      $scope.employee = {};
      $scope.employee.firstName = $scope.employeeName || "no name";
      $scope.employee.surname = $scope.employeeSurname || "no surname";
      $scope.employee.employeePhone = $scope.employeePhone || "no phone";
      $scope.employees.push($scope.employee);
      connectToKallesServer.postEmployees( $scope.employee);
      $scope.showForm = !$scope.showForm;
    };
   	 
   	$scope.remove = function(id, index){
   	 	//console.log("deleted", id);
   	 	connectToKallesServer.deleteEmployees(id);
   	 	$scope.employees.splice(index, 1);
   	 };

    $scope.toggle = function(){
      $scope.showForm = !$scope.showForm;
    };
}]);