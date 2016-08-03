// create the controller and inject Angular's $scope
fruitkitControllers.controller('customersController', ['$scope', '$location', '$http', '$rootScope', 'GetJson', 'connectToKallesServer', function($scope, $location, $http, $rootScope, GetJson, connectToKallesServer)  {
    $scope.customers = [];

    connectToKallesServer.getCustomers(function (data) {
      $scope.customers = data;
      console.log("real customers", $scope.customers );
    });

    $scope.customerName = "";
    $scope.customerSurname = "";
    $scope.customerCity = "";
    $scope.customerPostcode = "";
    $scope.customerStreet = "";
    $scope.customerEmail = "";
    $scope.customerPhone = "";
    
    $scope.companyName = "";
    $scope.setIsCompany = function(){
      $scope.isCompany = true;
    };

    $scope.addCustomer = function(){
      $scope.customer = {};
      $scope.customer.name = $scope.customerName || "no name";
      $scope.customer.surname = $scope.customerSurname|| "no surname";
      $scope.customer.isCompany = $scope.isCompany ||  false;
      $scope.customer.companyName = $scope.companyName  || "no name";
      $scope.customer.city = $scope.customerCity || "no city";
      $scope.customer.postcode = $scope.customerPostcode  || "no postcode";
      $scope.customer.street = $scope.customerStreet || "no street address";
      $scope.customer.email = $scope.customerEmail ||  "no email";
      $scope.customer.phone = $scope.customerPhone ||  "no phone";

      $scope.customers.push($scope.customer);
      connectToKallesServer.postCustomers( $scope.customer);
      $scope.showForm = !$scope.showForm;

    };

    $scope.removeCustomer = function(id, index){
      console.log("deleted", id);
      connectToKallesServer.deleteCustomers(id);
      $scope.customers.splice(index, 1);
     };


     $scope.toggle = function(){
        $scope.showForm = !$scope.showForm;
        $scope.customerName = "";
        $scope.customerSurname = "";
        $scope.customerCity = "";
        $scope.customerPostcode = "";
        $scope.customerStreet = "";
        $scope.customerEmail = "";
        $scope.customerPhone = "";
    
        $scope.companyName = "";
     };
            
}]);
