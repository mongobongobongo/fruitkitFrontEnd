'use strict';
var fruitkitDirectives = angular.module('fruitkitDirectives', []);


/*fruitkitDirectives.directive('addOrder', function() {
	return {
			restrict: 'E',
			templateUrl: '../templates/addOrder.html',
			controller: function($scope, $routeParams, $location, $http, connectToStagingServer ){
							//scope variables  
              $scope.showForm = true;
					  	$scope.orders = [];
					  	$scope.packs = [];
					  	$scope.customers = [];
					  	$scope.employees = [];
					  	$scope.driversList  = [];

					   //info
					  	$scope.orderCustomer = "";
					  	$scope.orderHeadquarter = "";

					  	$scope.orderPack = "";

					  	$scope.orderPacks = [];

					  	$scope.orderAddress = "";
					  	$scope.orderAddressMaps = "";
					  	$scope.orderDays = [];
					  	$scope.orderFirstsDeliveryDate = "";
					  	$scope.orderStatus = "";
					  	$scope.orderDriver = { };
					  	$scope.orderDriver.firstName = "";
					  	$scope.orderIsActive = "";
					  	$scope.orderDetails = "";
					  	$scope.orderContactPerson = "";
					  	$scope.orderContactPersonTelephone = " ";

              //get info from old Kalles server
              

              

              //info from new servers
              connectToStagingServer.getPackages(function (data) {
                $scope.packs = data;
              });

              connectToStagingServer.getCustomers(function (data) {
                $scope.customers = data;
              });

              connectToStagingServer.getEmployees(function(data){
                $scope.employees = data;
              });

						 function resetAddForm(){
						    $scope.orderCustomer = "";
						    $scope.orderAddress = "";
						    $scope.orderPack = "";
						    $scope.orderPacks = [];
						    $scope.orderDays = [];
						    $scope.orderFirstsDeliveryDate = "";
						    $scope.orderStatus = "";
						    $scope.orderDriver = "";
						    $scope.orderIsActive = false;
						    $scope.orderWeeks = "";
						    $scope.everyCheck = false;
						    $scope.evenCheck = false;
						    $scope.oddCheck = false;
						    $scope.activeCheck = false;
						    $scope.nonactiveCheck = false;
						    $scope.dayChecked = false;
						 }

					  	

					 	$scope.addPack = function(orderPack){
					    	$scope.orderPacks.push(orderPack);
					 	} 

						$scope.isActive = function(){
							$scope.orderIsActive = true;
					    	$scope.activeCheck = true;
					    	$scope.nonactiveCheck = false;
						};

					  	$scope.isNotActive = function(){
					    	$scope.orderIsActive = false;
					    	$scope.activeCheck = false;
					    	$scope.nonactiveCheck = true;
					  	};

						$scope.selectWeek = function(week){
							if(week == "even"){
								$scope.orderWeeks = "even";
							    $scope.everyCheck = false;
							    $scope.evenCheck = true;
							    $scope.oddCheck = false;
							} else if(week == "every"){
								$scope.orderWeeks = "every";
							    $scope.everyCheck = true;
							    $scope.evenCheck = false;
							    $scope.oddCheck = false;
							} else{
								$scope.orderWeeks = "odd";
							    $scope.everyCheck = false;
							    $scope.evenCheck = false;
							    $scope.oddCheck = true;
							}
						};

  					//record "uncheck event" to track which days were 

					$scope.addDay = function(day){
              $scope.dayChecked = false;
              var day = day;
    					//ToDO: write function to check if the same day has been added before
              function findDay(element) { 
                return element === day;
              }
              if(!$scope.orderDays.find(findDay)){
                $scope.orderDays.push(day);
              }
					};
	 
					  $scope.addOrder = function(){
					    $scope.order = {};
					    $scope.order.address = $scope.orderAddress  || "no address";
					    //$scope.order.pack = $scope.orderPacks || "no pack";
					    $scope.order.pack = $scope.orderPack || "no pack";
					    $scope.order.isActive = $scope.orderIsActive || false;
					    $scope.order.weeks = $scope.orderWeeks ||  "no weeks";
					    $scope.order.days = $scope.orderDays ||  "no days";
					    $scope.order.firstDelivery = $scope.orderFirstsDeliveryDate  ||  "no first delivery";
					    $scope.order.customer = $scope.orderCustomer  ||  "no customer";
					    $scope.order.orderDriver = {};
					    $scope.order.orderDriver.firstName = $scope.orderDriver.firstName || "no driver";
					    $scope.order.orderStatus = $scope.orderStatus || "not packed";
					    $scope.order.statusList = ["not packed", "packed", "to be picked", "picked", "delivered" ];
					    $scope.order.details = $scope.orderDetails || " ";
					    $scope.order.telephone = $scope.telephone || " ";
					    $scope.orders.push($scope.order);
					    //connectToKallesServer.postOrders( $scope.order);
              connectToStagingServer.postOrders( $scope.order);
              console.log("cool");
					    $scope.showForm = false;
					    resetAddForm();
					  };

			}
		} 
});*/


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
            
					    /*connectToStagingServer.getCustomers(function (data) {
					      $scope.customers = data;
					      console.log("real customers", $scope.customers );
					    });*/


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

fruitkitDirectives.directive('addFruitpack', function() {
	return {
			restrict: 'E',
			templateUrl: '../templates/addFruitpack.html',
			controller: function($scope, $routeParams, $location, $http, connectToStagingServer  ){
					//$scope.packs = [];
          $scope.showForm = true;
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
			      connectToStagingServer.postPackages($scope.pack);
            $scope.reset();
			    };

			    $scope.reset= function(){
			       $scope.packName = "";
					   $scope.packWeight = "";
					   $scope.packFruits = "";
             $scope.showForm = false;
			     };
			}
		} 
});


fruitkitDirectives.directive('addEmployee', function() {
	return {
			restrict: 'E',
			templateUrl: '../templates/addEmployee.html',
			controller: function($scope, $routeParams, $location, $http, connectToStagingServer ){
					//$scope.employees = [];
          $scope.showForm = true;
			    $scope.employeeName = "";
			    $scope.employeeSurname = "";
			    $scope.employeePhone = "";
			    $scope.addEmployee = function(){
			      $scope.employee = {};
			      $scope.employee.firstName = $scope.employeeName || "no name";
			      $scope.employee.surname = $scope.employeeSurname || "no surname";
			      $scope.employee.phone = $scope.employeePhone || "no phone";
			      $scope.employees.push($scope.employee);
			      connectToStagingServer.postEmployees( $scope.employee);
			      $scope.showForm = false;
			    };
			}
		} 
});
