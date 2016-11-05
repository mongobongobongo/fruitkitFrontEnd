var fruitkitServices = angular.module('fruitkitServices', []);

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

fruitkitServices.service('cloneObj', function(){
  this.clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
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

/*
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
*/
// service to connect to stg server

fruitkitServices.service('connectToStagingServer', ['$http', function($http){
  var stagingServer = 'http://37.139.24.103';
  var stagingPort = ':3000';

  //customers
  this.getCustomer = function(callback, id){
    $http
    .get(stagingServer + stagingPort + '/customers/' + id)
    .success(function(data){
      console.log(data);                        
      callback(data);
    });
  };

  this.getCustomers = function(callback){
    $http
    .get(stagingServer + stagingPort +'/customers')
    .success(function(data){
      console.log(data);                        
      callback(data);

    });
  };
  this.postCustomers = function(obj){
    var dataToPost = angular.toJson(obj);//JSON.stringify(obj); 
    $http
    .post(stagingServer + stagingPort +'/customers', dataToPost)
        .success(function(){
            console.log("data put successfully");
        });
        return obj;
  };
  
  this.deleteCustomers = function(id){

      $http
      .delete(stagingServer + stagingPort + '/customers/' + id)
            .success(function(){
                console.log("deleted successfully");
            });
  };

  this.putCustomers = function(payload, id){
    return $http
      .put(stagingServer + stagingPort + '/customers/' + id, JSON.stringify(payload));
  };

  this.getOrder = function(callback, id){
    $http
    .get(stagingServer + stagingPort+'/orders/' + id)
    .success(function(data){
      console.log(data);                        
      callback(data);
        });
  };

  this.putOrder = function(payload, id){
    $http
    .put(stagingServer + stagingPort+'/orders/' + id, JSON.stringify(payload))
    .success(function(data){
      console.log(data);                        
        });
  };

  this.getOrders = function(callback){
    $http
    .get(stagingServer + stagingPort+'/orders')
    .success(function(data){
      console.log(data);                        
      callback(data);

        });
  };

  this.postOrders = function(obj){
    var dataToPost = angular.toJson(obj);//JSON.stringify(obj); 
    $http
    .post(stagingServer + stagingPort+'/orders', dataToPost)
        .success(function(){
            console.log("data put successfully");
        });
        return obj;
  };

  this.deleteOrder = function(id){

      $http
      .delete(stagingServer + stagingPort+'/orders/' + id)
            .success(function(){
                console.log("deleted successfully");
            });
  };

  this.getPackages = function(callback){
    $http
    .get(stagingServer + stagingPort+'/packages')
    .success(function(data){
      console.log(data);                        
      callback(data);

        });
  };

  this.postPackages = function(obj){
    var dataToPost = angular.toJson(obj);//JSON.stringify(obj); 
    $http
    .post(stagingServer + stagingPort+'/packages', dataToPost)
        .success(function(){
            console.log("data put successfully");
        });
        return obj;
  };

  this.deletePackage = function(id){

      $http
      .delete(stagingServer + stagingPort+'/packages/' + id)
            .success(function(){
                console.log("deleted successfully");
            });
  };

  this.putPackage = function(payload, id){
    return  $http
    .put(stagingServer + stagingPort+'/packages/' + id, JSON.stringify(payload));
  };

  this.getEmployees = function(callback){
    $http
    .get(stagingServer + stagingPort+'/employees')
    .success(function(data){
      console.log(data);                        
      callback(data);

        });
  };

  this.postEmployees = function(obj){
    var dataToPost = angular.toJson(obj);//JSON.stringify(obj); 
    $http
    .post(stagingServer + stagingPort+'/employees', dataToPost)
        .success(function(){
            console.log("data put successfully");
        });
        return obj;
  };

  this.deleteEmployees = function(id){

      $http
      .delete(stagingServer + stagingPort+'/employees/' + id)
            .success(function(){
                console.log("deleted successfully");
            });
  };

  this.putEmployee = function(payload, id){
    return  $http
    .put(stagingServer + stagingPort+'/employees/' + id, JSON.stringify(payload));
  };
}]);
