
fruitkitControllers.controller('weekController', 
  ['$scope', '$location', '$http', 'weekdayToNumber', 'connectToKallesServer', 'connectToStagingServer',
  function($scope, $location, $http, weekdayToNumber, connectToKallesServer, connectToStagingServer) {
    $scope.message = 'Orders for today will be here!';
    $scope.today = new Date();
    var orderList = this;

    //get the number of the day from string
    $scope.weekdayToNumber = function(day){
        return weekdayToNumber.weekdayToNumber(day);
    };
    
    //gets the week number of the current day
    Date.prototype.getWeek = function() {
		var onejan = new Date(this.getFullYear(),0,1);
		return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
	};

     $scope.putOrder = function(id, index){
      connectToKallesServer.putOrder(id);
     };

    $scope.changedValue = function(changedValue, id, $index){ 
        $scope.order.status = changedValue;
         console.log("deleted", id);
        connectToKallesServer.deleteOrder(id);
        $scope.orders.splice(index, 1);         
    }

	//get current week number
	$scope.weekno = $scope.today.getWeek();

    connectToKallesServer.getOrders(function (data) {
      $scope.orders = data;
      console.log("real orders", $scope.orders );
       $scope.processResponse(data);
    });

    connectToKallesServer.getCustomers(function (data) {
        $scope.customers = data;
    });

    $scope.processResponse = function(response){
        $scope.todayOrderList = [];
        $scope.tomorrowOrderList = [];
        $scope.dayafterTomorrowOrderList = [];
        $scope.order = {};
        
          
        angular.forEach($scope.orders, function(order){
            console.log("weeks to deliver", order.weeks);
            $scope.order=  order;
           
            if($scope.order.weeks !== 'every' ){
                if($scope.order.weeks == 'even' && $scope.weekno%2 == 0){
                    $scope.newOrderList.push($scope.order);
                }
                else if($scope.order.weeks == 'odd' && $scope.weekno%2 != 0){
                     
                    $scope.newOrderList.push($scope.order);
                }

            }
            else{
                console.log("every week!");
               
                    var ordersDay = order.days;
                    var numbers = ordersDay.map( $scope.weekdayToNumber);

                    numbers.map(
                        function processDayNumbers(deliveryDay){
                            if($scope.today.getDay() == deliveryDay){
                                console.log("we have to deliver today!");
                                $scope.todayOrderList.push($scope.order);
                            }
                            if($scope.today.getDay()+1 == deliveryDay){
                                 console.log("we have to deliver tomorrow!");
                                $scope.tomorrowOrderList.push($scope.order);
                            }
                            else{
                                console.log("not today!");
                            }

                        }

                    );

        }
     });

         orderList.orders = $scope.newOrderList;
    };

   	 
}]);
