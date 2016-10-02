'use strict';
var fruitkit = angular.module('fruitkit', [ 'ngRoute','ui.router', 'fruitkitControllers', 'fruitkitDirectiveSwitcher', 'fruitkitServices', 'fruitkitDirectives' ]);

fruitkit
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})
.constant('API_ENDPOINT', {
  url: 'http://127.0.0.1:3001/api'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
});

fruitkit.config(['$routeProvider',
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



fruitkit
.service('AuthService', function($q, $http, API_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var isAuthenticated = false;
  var authToken;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }
 
  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
 
  var register = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };
 
  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result) {
        if (result.data.success) {
          storeUserCredentials(result.data.token);
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };
 
  var logout = function() {
    destroyUserCredentials();
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    register: register,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
  };
})
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});

fruitkit
.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
  .state('outside', {
    url: '/outside',
    abstract: true,
    templateUrl: 'templates/outside.html'
  })
  .state('outside.login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('outside.register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
  .state('inside', {
    url: '/inside',
    templateUrl: 'templates/inside.html',
    controller: 'InsideCtrl'
  });
 
  $urlRouterProvider.otherwise('/outside/login');
}])
 
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

fruitkit
.controller('LoginCtrl', function($scope, AuthService, $state) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('inside');
    }, function(errMsg) {
        alert(errMsg);
    });
  };
})
 
.controller('RegisterCtrl', function($scope, AuthService, $state) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('outside.login');
        alert("alert me!");
    }, function(errMsg) {
        alert(errMsg);
    });
  };
})
 
.controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };
 
  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
      $scope.memberinfo = result.data.msg;
    });
  };
 
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outside.login');
  };
})
 
.controller('AppCtrl', function($scope, $state, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('outside.login');
        alert("cool!");
  });
});

