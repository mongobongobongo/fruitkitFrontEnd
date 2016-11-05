fruitkitDirectives.directive('addCustomer', function() {
  return {
      restrict: 'E',
      templateUrl: '../templates/addCustomer.html',
      controller: function($scope, $routeParams, $location, $http,  connectToStagingServer ){
              //info about new customer
              $scope.showForm = true;
              $scope.customerName = "";
              $scope.customerSurname = "";

              //if the client is a company
              $scope.isCompany = false;
              $scope.companyName = "";

              //contact details
              $scope.customerStreet = "";
              $scope.customerCity = "";
              $scope.customerPostcode = "";
              $scope.customerEmail = "";
              $scope.customerPhone = "";

              //get all customers list
            
              connectToStagingServer.getCustomers(function (data) {
                $scope.customers = data;
                console.log("real customers", $scope.customers );
              });


              //TODO: fix checkbox
              $scope.setIsCompany = function(){
                $scope.isCompany = !$scope.isCompany;
              };

              $scope.addCustomer = function(){
                $scope.customer = {};

                $scope.customer.name = $scope.customerName || "no name";
                $scope.customer.surname = $scope.customerSurname|| "no surname";
                $scope.customer.isCompany = $scope.isCompany;
                $scope.customer.company = {};
                $scope.customer.company.name = $scope.companyName  || "no name";
                //$scope.customer.company.headquarters = $scope.companyHeadquarters;

                $scope.customer.street = $scope.customerStreet || "no street address";
                $scope.customer.city = $scope.customerCity || "no city";
                $scope.customer.postcode = $scope.customerPostcode  || "no postcode";
                $scope.customer.email = $scope.customerEmail ||  "no email";
                $scope.customer.phone = $scope.customerPhone ||  "no phone";

                $scope.customers.push($scope.customer);
                //connectToKallesServer.postCustomers($scope.customer);
                connectToStagingServer.postCustomers($scope.customer);

                resetAddForm();
                $route.reload();
              };

               function resetAddForm(){
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
             }
      }
    } 
});
