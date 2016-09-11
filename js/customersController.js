// create the controller and inject Angular's $scope
fruitkitControllers.controller('customersController', ['$scope', '$location', '$http', '$rootScope', 'GetJson', 'connectToKallesServer', function($scope, $location, $http, $rootScope, GetJson, connectToKallesServer)  {
    //scope variables
    $scope.customers = [];



    //get all customers list
    connectToKallesServer.getCustomers(function (data) {
      $scope.customers = data;
      console.log("real customers", $scope.customers );
    });


    $scope.removeCustomer = function(id, index){
      console.log("deleted", id);
      connectToKallesServer.deleteCustomers(id);
      $scope.customers.splice(index, 1);
    };


     $scope.toggle = function(){
        $scope.showForm = !$scope.showForm;

        $scope.customerName = "";
        $scope.customerSurname = "";

        $scope.isCompany = false;
        $scope.companyName = "";
        $scope.isCompanyChecked = false;

        $scope.customerCity = "";
        $scope.customerPostcode = "";
        $scope.customerStreet = "";
        $scope.customerEmail = "";
        $scope.customerPhone = "";
     };
            
}]);
