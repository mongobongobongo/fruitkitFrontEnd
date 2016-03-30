'use strict';
var fruitkit = angular.module('fruitkit', [ 'ngRoute', 'fruitkitControllers' ]);

fruitkit.config(['$routeProvider', '$locationProvider', 
	function($routeProvider) {
        $routeProvider
        // route for the customers page
            .when('/customers', {
                templateUrl : '../pages/customers.html',
                //now we do not have to specify the ng-controller in the directive
                controller  : 'customersController',
                controllerAs: 'customerList'
            })

            // route for the orders page
            .when('/orders', {
                templateUrl : '../pages/orders.html',
                controller  : 'ordersController',
                controllerAs: 'orderList'
            })

            // route for the today page
            .when('/today', {
                templateUrl : '../pages/today.html',
                controller  : 'todayController',
                controllerAs: 'orderList'
            })

            .when('/orders/:orderId', {
                templateUrl: '../pages/singleOrder.html',
                controller: 'singleOrderController'
            })

}]);