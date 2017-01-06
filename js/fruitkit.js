'use strict';
var fruitkit = angular.module('fruitkit', 
[ 'ngRoute', 'ui.router', 'ngResource', 'fruitkitControllers', 'fruitkitServices', 'fruitkitDirectiveSwitcher','fruitkitDirectives' 
]);


/*fruitkit.config(['$routeProvider', '$locationProvider',
	function($routeProvider) {
        $routeProvider
        //route for the customers page
            .when('/', {
                templateUrl : '../pages/main.html',
                controller  : 'mainController'
            })

            .when('/customers', {
                templateUrl : '../pages/customers.html',
                controller  : 'customersController'
            })

            //route for the orders page
            .when('/orders', {
                templateUrl : '../pages/orders.html',
                controller  : 'ordersController'
            })
            .when('/employees', {
                templateUrl : '../pages/employees.html',
                controller  : 'employeesController'
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

*/


fruitkit
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})
.constant('API_ENDPOINT', {
  url: 'http://37.139.24.103:3000/api'
});

fruitkit
.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
  .state('outside', {
    url: '/outside',
    abstract: true,
    templateUrl: '../templates/outside.html'
  })
  .state('outside.login', {
    url: '/login',
    templateUrl: '../templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('outside.register', {
    url: '/register',
    templateUrl: '../templates/register.html',
    controller: 'RegisterCtrl'
  })
  .state('inside', {
    url: '/inside',
    templateUrl: '../templates/inside.html',
    controller: 'InsideCtrl'
  })
  .state('inside.mainPage', {
    url: '/main',
    templateUrl: '../pages/main.html',
    controller: 'mainController'
  })
  .state('inside.orderList', {
    url: '/orders',
    templateUrl: '../pages/orders.html',
    controller: 'ordersController'
  })
  .state('inside.customerList', {
    url: '/customers',
    templateUrl: '../pages/customers.html',
    controller: 'customersController'
  })
  .state('inside.packsList', {
    url: '/packs',
    templateUrl: '../pages/packages.html',
    controller: 'packageController'
  })
  .state('inside.employeesList', {
    url: '/employees',
    templateUrl: '../pages/employees.html',
    controller: 'employeesController'
  });
 
  $urlRouterProvider.otherwise('/outside/login');
})
.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'outside.login' && next.name !== 'outside.register') {
        event.preventDefault();
        $state.go('outside.login');
      }
    }
  });
});
