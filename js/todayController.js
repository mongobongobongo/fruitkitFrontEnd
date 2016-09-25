
fruitkitControllers.controller('todayController', 
  ['$scope', '$location', '$http', 'weekdayToNumber', 'connectToKallesServer', 'connectToStagingServer',
  function($scope, $location, $http, weekdayToNumber, connectToKallesServer, connectToStagingServer) {
    $scope.today = new Date();
    var orderList = this;
    $scope.driversList = [];
    $scope.packList = [];
    $scope.orders = [];
    $scope.packs = [];
    $scope.employees = [];

    connectToKallesServer.getOrders(function (data) {
        $scope.orders = data;
        console.log("real orders", $scope.orders );
        $scope.defineOrdersForToday(data);
    });

    connectToKallesServer.getEmployees(function (data) {
        $scope.employees = data;
    });

    connectToKallesServer.getPackages(function (data) {
        $scope.packs = data;
         console.log("real packs", $scope.packs);
    });

    //get the number of the day from string
    $scope.weekdayToNumber = function(day){
        return weekdayToNumber.weekdayToNumber(day);
    };
    
    //gets the week number of the current day
    Date.prototype.getWeek = function() {
		var onejan = new Date(this.getFullYear(),0,1);
		return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
	};

	//get current week number
	$scope.weekno = $scope.today.getWeek();

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

    $scope.defineOrdersForToday = function(response){
        $scope.newOrderList = [];
        $scope.order = {};
          
        angular.forEach($scope.orders, function(order){
            $scope.order=  order;
            if(order.isActive){
                if($scope.order.weeks == 'even' && $scope.weekno%2 == 0){
                    $scope.newOrderList.push($scope.order);
                } else if ($scope.order.weeks == 'odd' && $scope.weekno%2 != 0){
                    $scope.newOrderList.push($scope.order);
                } else {
                    var ordersDay = order.days;
                    var numbers = ordersDay.map( $scope.weekdayToNumber);

                    numbers.map(function processDayNumbers(deliveryDay){
                        if($scope.today.getDay() == deliveryDay){
                            $scope.newOrderList.push($scope.order);
                        } else{ }
                    });
                }
            } 
        });
        orderList.orders = $scope.newOrderList;
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
