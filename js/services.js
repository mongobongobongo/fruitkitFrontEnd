var fruitkitServices = angular.module('fruitkitServices', []);

fruitkitServices.factory('GetJson', ['$http', '$rootScope', function($http, $rootScope){
    return {
        fetchAllOrders: function() {
            return $http.get('json/allOrders.json')
                    .success(function(data){
                    	
                        return data;
                    });
	

}}}]);

//weekday to number 
fruitkitServices.service('weekdayToNumber', function(){
	this.weekdayToNumber = function(day){
		if(day == 'Monday'){ return 1;}
    	if(day == 'Tuesday'){ return 2;}
    	if(day == 'Wednesday'){ return 3;}
    	if(day == 'Thursday'){ return 4;}
    	if(day == 'Friday'){ return 5;}
    	if(day == 'Saturday'){ return 6;}
    	if(day == 'Sunday'){ return 0;}
	};
		
});

//get number of the week
/*fruitkitServices.service('getWeekNumber', function(){
	this.getWeekNumber = function() {
		return Date.prototype.getWeek = function() {
			var onejan = new Date(this.getFullYear(),0,1);
			return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
		};
	};
});*/

fruitkitServices.service('createOrderItem', function(){
	this.createOrderItem = function(order){
  		var orderItem = {};
		orderItem.orderId = order.orderId;
		orderItem.pack = order.orderPack.packname;
		orderItem.isActive = order.isActive;
		orderItem.weeks = order.weeks;
		orderItem.daysInWeek = order.daysInWeek;
		orderItem.firstDeliveryDate = order.firstDeliveryDate;
		orderItem.customer = order.orderCustomer.name;
		orderItem.address = order.orderCustomer.address;
		//$scope.newOrderList.push(orderItem);
  	};
});