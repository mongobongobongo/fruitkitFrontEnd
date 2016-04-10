
fruitkitControllers.controller('todayController', ['$scope', '$location', '$http', 'GetJson', 'weekdayToNumber', 'createOrderItem', function($scope, $location, $http, GetJson, weekdayToNumber, createOrderItem) {
    $scope.message = 'Orders for today will be here!';
    //today
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

	//get current week number
	$scope.weekno = $scope.today.getWeek();
  	 
  	//create order item from current order
  	$scope.createOrderItem = function(order){
        return createOrderItem.createOrderItem(order);

  	};
  	 
  	//push orders into array as we receive the json 
  	GetJson.fetchAllOrders().success(function (response) {
         $scope.allData = response;
         $scope.newOrderList = [];
	      
         angular.forEach($scope.allData.orders, function(order){
         	console.log("weeks to deliver", order.weeks);
         	if(order.weeks !== 'every' ){
         		if(order.weeks == 'even' && $scope.weekno%2 == 0){
         			 
			        $scope.createAndPushOrderItem(order);
                    $scope.newOrderList.push(orderItem);
			         
         		}
         		else if(order.weeks == 'odd' && $scope.weekno%2 != 0){
			        $scope.createAndPushOrderItem(order);
                    $scope.newOrderList.push(orderItem);
         		}

         	}
         	else{
         		console.log("every week!");
		       
		      	angular.forEach(order.daysInWeek, function(day){
		      		  
		      		var deliveryDate = $scope.weekdayToNumber(day);
                    //var deliveryDate = weekdayToNumber(day);
		      		
		      		console.log("it works", $scope.today.getDay(), deliveryDate );
		      		if($scope.today.getDay() == deliveryDate){
		      			console.log("we have to deliver today!");
		      			$scope.createAndPushOrderItem(order);
                        $scope.newOrderList.push(orderItem);
		      		}
		      		else{
		      			console.log("not today!");
		      		}
		      	});
		        console.log(order.daysInWeek);
         	}
         });
         console.log("new order list generated", $scope.newOrderList);
         orderList.orders = $scope.newOrderList;
     });
  	 
}]);