
fruitkitControllers.controller('todayController', ['$scope', '$location', '$http', 'GetJson', 'weekdayToNumber', 'connectToKallesServer', function($scope, $location, $http, GetJson, weekdayToNumber, connectToKallesServer) {
    $scope.message = 'Orders for today will be here!';
    $scope.today = new Date();
    var orderList = this;
    $scope.driversList = [];

    //get the number of the day from string
    $scope.weekdayToNumber = function(day){
        return weekdayToNumber.weekdayToNumber(day);
    };
    
    //gets the week number of the current day
    Date.prototype.getWeek = function() {
		var onejan = new Date(this.getFullYear(),0,1);
		return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
	};


    $scope.changedOrderStatus = function(changedValue, id, $index){ 
        connectToKallesServer.putOrder({
             orderStatus: changedValue
        },id);
    };

    $scope.changedDriver = function(changedValue, id, $index){ 
        connectToKallesServer.putOrder({
             orderDriver: changedValue
        },id);
    };

	//get current week number
	$scope.weekno = $scope.today.getWeek();

    connectToKallesServer.getOrders(function (data) {
        $scope.orders = data;
        console.log("real orders", $scope.orders );
        $scope.defineOrdersForToday(data);
    });

    connectToKallesServer.getEmployees(function (data) {
        $scope.employees = data;
    });

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
                                    //console.log("we have to deliver today!");
                            $scope.newOrderList.push($scope.order);
                        } else{
                                    //console.log("not today!");
                        }
                    });
                }
            }
           
        });

         orderList.orders = $scope.newOrderList;
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