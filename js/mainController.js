fruitkitControllers.controller('mainController', ['$scope', '$routeParams' ,'$location', '$http', 'GetJson', 'connectToKallesServer', function($scope, $routeParams, $location, $http, GetJson, connectToKallesServer ) {
    
    $scope.driversList = [];
    $scope.packList = [];
    $scope.orders = [];
    $scope.packs = [];
    $scope.employees = [];

    $scope.statusToSort = "";
    $scope.listOfstatuses = ["not packed", "packed", "to be picked", "picked", "delivered" ];

    $scope.dayToSort = "";
    $scope.lostOfdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    $scope.driverToSort = "";
    $scope.packToSort = "";


    $scope.showextra = false;
    $scope.datailOrder = "";


    $scope.resetSort = function(){
      $scope.statusToSort = "";
      $scope.driverToSort = "";
      $scope.packToSort = "";
      $scope.dayToSort = "";
    }

    connectToKallesServer.getPackages(function (data) {
      $scope.packs = data;
      console.log("real packages", $scope.packs );
    });

    connectToKallesServer.getOrders(function (data) {
        $scope.orders = data;
    });

    connectToKallesServer.getEmployees(function (data) {
        $scope.employees = data;
        $scope.employees.push({firstName: "no driver"});
    });

    connectToKallesServer.getCustomers(function (data) {
      $scope.customers = data;
    });

     $scope.changedOrderStatus = function(changedValue, id, $index){ 
        connectToKallesServer.putOrder({
             orderStatus: changedValue
        },id);
    };

    $scope.changedDriver = function(changedValue, id, $index){ 
        console.log(changedValue);
        connectToKallesServer.putOrder({
             orderDriver: {firstName: changedValue}
        },id);
    };

    $scope.getOrder = function(id, index){
      connectToKallesServer.getOrder(function(data){
        $scope.datailOrder = data;
      },id);
    };

    $scope.showExtraInfo = function(id , $index){
      $scope.getOrder(id , $index);
      $scope.showextra = true;

    }

    $scope.hideDetails = function(){
      $scope.showextra = false;
    }


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

    $scope.sortByPack = function(packToSort){
        $scope.packList = [];
        angular.forEach($scope.orders, function(order){
            if(order.pack.name === packToSort.name){
                 $scope.packList.push(order);
            }
        });
    }

    $scope.sortByDriver = function(driverToSort){
        $scope.driversList = [];
        angular.forEach($scope.orders, function(order){
            if(order.orderDriver.firstName === driverToSort.firstName){
                $scope.driversList.push(order);
            }
        });
    }
     

}]);