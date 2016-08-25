fruitkitControllers.controller('ordersController', 
  ['$scope', '$routeParams' ,'$location', '$http', 'GetJson', 'connectToKallesServer', 
  function($scope, $routeParams, $location, $http, GetJson, connectToKallesServer ) {

  //scope variables  
  $scope.orders = [];
  $scope.packs = [];
  $scope.customers = [];
  $scope.employees = [];
  $scope.driversList  = [];

  //WTF???
  $scope.driverToSort = [];

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

  connectToKallesServer.getOrders(function (data) {
    $scope.orders = data;
  });

  connectToKallesServer.getPackages(function (data) {
    $scope.packs = data;
  });

  connectToKallesServer.getCustomers(function (data) {
    $scope.customers = data;
  });

  connectToKallesServer.getEmployees(function(data){
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

  $scope.toggle = function(){
    $scope.showForm = !$scope.showForm;
  };

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
    //ToDO: write function to check if the same day has been added before
		$scope.orderDays.push(day);
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
    connectToKallesServer.postOrders( $scope.order);
    $scope.showForm = !$scope.showForm;
    resetAddForm();
  };

  $scope.removeOrder = function(id, index){
    console.log("deleted", id); 
    connectToKallesServer.deleteOrder(id);
    $scope.orders.splice(index, 1);
  };

  $scope.sortBy = function(driverToSort){
    $scope.driversList = [];
    angular.forEach($scope.orders, function(order){
        //$scope.order =  order;
        if(order.orderDriver.firstName === driverToSort.firstName){
             $scope.driversList.push(order);
        }
    });
  }
     

}]);