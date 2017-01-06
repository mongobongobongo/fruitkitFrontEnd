fruitkitControllers.controller('customersController', 
  ['$scope', '$location', '$http', '$rootScope', 'connectToStagingServer', 'AuthService', 'API_ENDPOINT', '$state', 'cloneObj', 'CustomerFactory',
  function($scope, $location, $http, $rootScope, connectToStagingServer, AuthService, API_ENDPOINT, $state, cloneObj, CustomerFactory)  {

    $scope.customerToEdit = {};

    $scope.edit = function(customer){
      $scope.customerToEdit = cloneObj.clone(customer);
      $scope.currentCustomer = customer;
      $scope.editing = true;
    };

    $scope.removeCustomer = function(id, index){
      console.log("deleted", id);
      connectToStagingServer.deleteCustomers(id);
      $scope.customers.splice(index, 1);
    };

    $scope.editCustomer = function(changedValue, id){
      var data = {};

      data.name = changedValue.name || null;
      data.surname = changedValue.surname || null;
      data.company = {};
      data.company.name = changedValue.company.name || null;
      data.street = changedValue.street || null;
      data.city = changedValue.city || null;
      data.postcode = changedValue.postcode || null;
      data.email = changedValue.email || null;
      data.phone = changedValue.phone || null;

      connectToStagingServer.putCustomers(data, id)
        .success(function () {
          Object.assign($scope.currentCustomer, changedValue);
          $scope.currentCustomer = null;
          $scope.editing = false;
        });
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
