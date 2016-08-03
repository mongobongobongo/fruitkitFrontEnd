fruitkitControllers.controller('mainController', ['$scope', '$routeParams' ,'$location', '$http', 'GetJson', 'connectToKallesServer', function($scope, $routeParams, $location, $http, GetJson, connectToKallesServer ) {
    $scope.message = 'Every order will be displayed here';
    $scope.orders = [];

    connectToKallesServer.getOrders(function (data) {
      $scope.orders = data;
      console.log("real orders", $scope.orders );
    });

    connectToKallesServer.getPackages(function (data) {
      $scope.packs = data;
      console.log("real packages", $scope.packs );
    });


	
	$scope.orderAddress = "";
	$scope.orderPack = $scope.selectedPack || "no pack";
	$scope.orderCustomer = "";
	$scope.orderDays = [];
	$scope.orderFirstsDeliveryDate = "";

	$scope.isActive = function(){
		$scope.orderIsActive = true;
	};

	$scope.selectWeek = function(week){
		if(week == "even"){
			$scope.orderWeeks = "even";
		}
		else if(week == "every"){
			$scope.orderWeeks = "every";
		}
		else{
			$scope.orderWeeks = "odd";
		}
	};

	$scope.addDay = function(day){
		$scope.orderDays.push(day);
	};

	
  	connectToKallesServer.getCustomers(function (data) {
      $scope.customers = data;
  	});

	$scope.toggle = function(){
	  	$scope.showForm = !$scope.showForm;

        $scope.orderAddress = "";
		$scope.orderPack = $scope.selectedPack || "no pack";
	 	$scope.orderDays = [];
		$scope.orderFirstsDeliveryDate = "";
		$scope.orderIsActive = true;
		$scope.orderWeeks = "";
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

      $scope.orders.push($scope.order);
      connectToKallesServer.postOrders( $scope.order);
      $scope.showForm = !$scope.showForm;
    };

    $scope.removeOrder = function(id, index){
      console.log("deleted", id);
      connectToKallesServer.deleteOrder(id);
      $scope.orders.splice(index, 1);
     };
     

}]);