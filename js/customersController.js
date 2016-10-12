// create the controller and inject Angular's $scope
fruitkitControllers.controller('customersController', 
  ['$scope', '$location', '$http', '$rootScope', 'connectToStagingServer', 'AuthService', 'API_ENDPOINT', '$state',
  function($scope, $location, $http, $rootScope, connectToStagingServer, AuthService, API_ENDPOINT, $state)  {
    //scope variables
    $scope.customers = [];

    //get customers list from new server 
    connectToStagingServer.getCustomers(function (data) {
      $scope.customers = data;
    });

    $scope.removeCustomer = function(id, index){
      console.log("deleted", id);
      connectToStagingServer.deleteCustomers(id);
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
