fruitkit.factory('GetJson', ['$http', '$rootScope', function($http, $rootScope){
    return {
        fetchAllOrders: function() {
            return $http.get('json/allOrders.json')
                    .success(function(data){
                    	
                        return data;
                    });
	

}}}]);
 

 
