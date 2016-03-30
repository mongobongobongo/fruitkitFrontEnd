
fruitkitControllers.controller('jsonParserController', function($scope, $http) {
	$http.get("json/allOrders.json")
	.then(function(response) {
	    $scope.ordersJson = response.data;
	});
});