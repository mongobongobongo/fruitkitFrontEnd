'use strict';
var fruitkit = angular.module('fruitkit', [ 'ngRoute', 'fruitkitControllers', 'fruitkitDirectiveSwitcher', 'fruitkitServices', 'fruitkitDirectives' ]);

fruitkit.config(['$routeProvider', '$locationProvider', 
	function($routeProvider) {
        $routeProvider
        //route for the customers page
            .when('/', {
                templateUrl : '../pages/main.html',
                //now we do not have to specify the ng-controller in the directive
                controller  : 'mainController'//,
                //controllerAs: 'customerList'
            })

            .when('/customers', {
                templateUrl : '../pages/customers.html',
                //now we do not have to specify the ng-controller in the directive
                controller  : 'customersController'//,
                //controllerAs: 'customerList'
            })

            //route for the orders page
            .when('/orders', {
                templateUrl : '../pages/orders.html',
                controller  : 'ordersController'//,
                //controllerAs: 'orderList'
            })
            .when('/employees', {
                templateUrl : '../pages/employees.html',
                controller  : 'employeesController'
                //controllerAs: 'employeesList'
            })

            // route for the today page
            .when('/today', {
                templateUrl : '../pages/today.html',
                controller  : 'todayController'
            })


            // route for the today page
            .when('/week', {
                templateUrl : '../pages/week.html',
                controller  : 'weekController'
            })

            .when('/orders/:orderId', {
                templateUrl: '../pages/singleOrder.html',
                controller: 'singleOrderController'
            })

             // route for the today page
            .when('/packages', {
                templateUrl : '../pages/packages.html',
                controller  : 'packageController',
                controllerAs: 'packageList'
            })
            .when('/packages/:packageId', {
                templateUrl : '../pages/singlePackage.html',
                controller  : 'singlePackageController'
            });

}]);

