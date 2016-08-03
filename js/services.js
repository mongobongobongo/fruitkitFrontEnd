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

/*fruitkitServices.service('createOrderItem', function(){
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
});*/

fruitkitServices.service('connectToKallesServer', ['$http', function($http){
	this.getCustomers = function(callback){
		$http
		.get('http://brometheus.org:3000/customers')
		.success(function(data){
			console.log(data);                        
			callback(data);

        });
	};
	this.postCustomers = function(obj){
		var dataToPost = angular.toJson(obj);//JSON.stringify(obj); 
		$http
		.post('http://brometheus.org:3000/customers', dataToPost)
        .success(function(){
            console.log("data put successfully");
        });
        return obj;
	};
	
	this.deleteCustomers = function(id){

			$http
			.delete('http://brometheus.org:3000/customers/' + id)
            .success(function(){
                console.log("deleted successfully");
            });
	};

	this.getOrder = function(callback, id){
		$http
		.get('http://brometheus.org:3000/orders/' + id)
		.success(function(data){
			console.log(data);                        
			callback(data);

        });
	};

	this.putOrder = function(payload, id){
		$http
		.put('http://brometheus.org:3000/orders/' + id, JSON.stringify(payload))
		.success(function(data){
			console.log(data);                        
        });
	};

	this.getOrders = function(callback){
		$http
		.get('http://brometheus.org:3000/orders')
		.success(function(data){
			console.log(data);                        
			callback(data);

        });
	};

	this.postOrders = function(obj){
		var dataToPost = angular.toJson(obj);//JSON.stringify(obj); 
		$http
		.post('http://brometheus.org:3000/orders', dataToPost)
        .success(function(){
            console.log("data put successfully");
        });
        return obj;
	};

	this.deleteOrder = function(id){

			$http
			.delete('http://brometheus.org:3000/orders/' + id)
            .success(function(){
                console.log("deleted successfully");
            });
	};

	this.getPackages = function(callback){
		$http
		.get('http://brometheus.org:3000/packages')
		.success(function(data){
			console.log(data);                        
			callback(data);

        });
	};

	this.postPackages = function(obj){
		var dataToPost = angular.toJson(obj);//JSON.stringify(obj); 
		$http
		.post('http://brometheus.org:3000/packages', dataToPost)
        .success(function(){
            console.log("data put successfully");
        });
        return obj;
	};

	this.deletePackage = function(id){

			$http
			.delete('http://brometheus.org:3000/packages/' + id)
            .success(function(){
                console.log("deleted successfully");
            });
	};

	this.getEmployees = function(callback){
		$http
		.get('http://brometheus.org:3000/employees')
		.success(function(data){
			console.log(data);                        
			callback(data);

        });
	};

	this.postEmployees = function(obj){
		var dataToPost = angular.toJson(obj);//JSON.stringify(obj); 
		$http
		.post('http://brometheus.org:3000/employees', dataToPost)
        .success(function(){
            console.log("data put successfully");
        });
        return obj;
	};

	this.deleteEmployees = function(id){

			$http
			.delete('http://brometheus.org:3000/employees/' + id)
            .success(function(){
                console.log("deleted successfully");
            });
	};
}]);