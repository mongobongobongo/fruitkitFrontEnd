
fruitkitControllers.controller('todayController', ['$scope', '$location', '$http', 'GetJson', function($scope, $location, $http, GetJson) {
    $scope.message = 'Orders for today will be here!';
    //today
    $scope.today = new Date();
    //$scope.days = ['Monday', 'Wednesday'];
    var orderList = this;
    //get the number of the day from string
    $scope.weekdayToNumber = function(day){
    	if(day == 'Monday'){ return 1;}
    	if(day == 'Tuesday'){ return 2;}
    	if(day == 'Wednesday'){ return 3;}
    	if(day == 'Thursday'){ return 4;}
    	if(day == 'Friday'){ return 5;}
    	if(day == 'Saturday'){ return 6;}
    	if(day == 'Sunday'){ return 0;}
    };
    
    //gets the week number of the current day
    Date.prototype.getWeek = function() {
		var onejan = new Date(this.getFullYear(),0,1);
		return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
	};

	//get current week number
	$scope.weekno = $scope.today.getWeek();
    //console.log( $scope.today.getDate(), $scope.today.getDay(),  $scope.weekno);
  	 
  	//create order item from current order
  	$scope.createAndPushOrderItem = function(order){
  		var orderItem = {};
		orderItem.orderId = order.orderId;
		orderItem.pack = order.orderPack.packname;
		orderItem.isActive = order.isActive;
		orderItem.weeks = order.weeks;
		orderItem.daysInWeek = order.daysInWeek;
		orderItem.firstDeliveryDate = order.firstDeliveryDate;
		orderItem.customer = order.orderCustomer.name;
		orderItem.address = order.orderCustomer.address;
		$scope.newOrderList.push(orderItem);
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
			         
         		}
         		else if(order.weeks == 'odd' && $scope.weekno%2 != 0){
			        $scope.createAndPushOrderItem(order);
         		}

         	}
         	else{
         		console.log("every week!");
		       
		      	angular.forEach(order.daysInWeek, function(day){
		      		  
		      		var deliveryDate = $scope.weekdayToNumber(day);
		      		
		      		//console.log("it works", $scope.today.getDay(), deliveryDate );
		      		if($scope.today.getDay() == deliveryDate){
		      			console.log("we have to deliver today!");
		      			$scope.createAndPushOrderItem(order);
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