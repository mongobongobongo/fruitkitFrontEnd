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
  $scope.orderAddress = "";
  $scope.orderDays = [];
  $scope.orderFirstsDeliveryDate = "";
  $scope.orderStatus = "";
  $scope.orderDriver = "";
  $scope.orderIsActive = "";
  $scope.details = "";
  $scope.telephone = " ";

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
    $scope.orderPack = "no pack";
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
      $scope.everyCheck = true;
      $scope.evenCheck = false;
      $scope.oddCheck = false;
		} else if(week == "every"){
			$scope.orderWeeks = "every";
      $scope.everyCheck = false;
      $scope.evenCheck = true;
      $scope.oddCheck = false;
		} else{
			$scope.orderWeeks = "odd";
      $scope.everyCheck = false;
      $scope.evenCheck = false;
      $scope.oddCheck = true;
		}
	};

	$scope.addDay = function(day){
		$scope.orderDays.push(day);
	};
	 
  $scope.addOrder = function(){
    $scope.order = {};
    $scope.order.address = $scope.orderAddress  || "no address";
    $scope.order.pack = $scope.orderPack  || "no pack";
    $scope.order.isActive = $scope.orderIsActive || false;
    $scope.order.weeks = $scope.orderWeeks ||  "no weeks";
    $scope.order.days = $scope.orderDays ||  "no days";
    $scope.order.firstDelivery = $scope.orderFirstsDeliveryDate  ||  "no first delivery";
    $scope.order.customer = $scope.orderCustomer  ||  "no customer";
    $scope.order.orderDriver = $scope.orderDriver || "no driver";
    $scope.order.orderStatus = $scope.orderStatus || "not packed";
    $scope.order.statusList = ["not packed", "packed", "to be picked", "picked", "delivered" ];
    $scope.order.details = $scope.details || " ";
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

    angular.forEach($scope.orders, function(order){
            //$scope.order =  order;
            if(order.orderDriver === driverToSort.firstName){
                 $scope.driversList.push(order);
            }

           
        });
  }
     

}]);