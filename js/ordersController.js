fruitkitControllers.controller('ordersController', ['$scope', '$routeParams' ,'$location', '$http', 'GetJson', function($scope, $routeParams, $location, $http, GetJson ) {
    $scope.message = 'Every order will be displayed here';
    var orderList = this;
    
    GetJson.fetchAllOrders().success(function (response) {
    		$scope.newOrderList = [];
         	$scope.allData = response;
         	console.log("json from factory", response);
         	console.log("json from factory", $scope.allData.orders);

         	//console.log("orders from controller", $scope.ordersJson.orders);

		    angular.forEach($scope.allData.orders, function(order) {
		        //console.log(order.orderCustomer);
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
		        console.log(order);

		    });

     		console.log("new order list generated", $scope.newOrderList);

		    
		    orderList.orders = $scope.newOrderList;

    		console.log("final orders list", orderList.orders[1].orderId);
    
		    orderList.addOrder = function(){
				var orderId = this.orders.length +1;
				orderList.orders.push({id: orderId, customer: orderList.defaultCustomer, pack: orderList.defaultPack, address: orderList.defaultAddress, isActive: orderList.defaultisActive, weeks: orderList.defaultWeeks, days: orderList.defaultDays, firstDeliveryDate: orderList.defaultfirstDeliveryDate });
				orderList.defaultPack = '';
				orderList.defaultAddress = 'no address';
				orderList.defaultisActive = false;
				orderList.defaultWeeks = 'every';
				orderList.defaultDays = []; 
				orderList.defaultfirstDeliveryDate = 'no date';
				orderList.defaultCustomer = 'no customer';

				/*$scope.orderList.push({
			        orderId: orderId,
			        orderCustomer: {
			          id: 2,
			          name: orderList.defaultCustomer,
			          address: orderList.defaultAddress,
			          city: "Helsinki",
			          isCompany: false},
			        orderPack: {
			          packname: orderList.defaultPack,
			          packageWeight: "5kg",
			          packageFruits: ["bananas", "apples", "peaches", "oranges"] 
			        },
			        
			        isActive: orderList.defaultisActive,
			        weeks: orderList.defaultWeeks,
			        daysInWeek: orderList.defaultDays,
			        firstDeliveryDate: orderList.defaultfirstDeliveryDate
			      });*/
		    };

		    orderList.removeOrder = function(index) {
		       orderList.orders.splice(index, 1);
		    };


     });


     


}]);