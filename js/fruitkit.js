'use strict';
var fruitkit = angular.module('fruitkit', 
[ 'ngRoute', 'ui.router', 'fruitkitControllers', 'fruitkitServices', 'fruitkitDirectiveSwitcher','fruitkitDirectives' 
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

fruitkit
.controller('LoginCtrl', function($scope, AuthService, $state) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('inside');
      //$state.go('mainPage');
    }, function(errMsg) {
      console.log("no good");
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
      console.log("great success");
    }, function(errMsg) {
      console.log("no good");
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
  });
});

fruitkit.controller('switchRootDirectives', 
  ['$scope', '$routeParams' , '$http', 'connectToStagingServer',
  function($scope, $routeParams, $http, connectToStagingServer){
    $scope.addOrder  = function(){
      $scope.addNewOrder = !$scope.addNewOrder;
    };

    $scope.addEmployee = function(){
      $scope.addNewEmployee = !$scope.addNewEmployee;
    };
     
    $scope.addCustomer = function(){
      $scope.addNewCustomer = !$scope.addNewCustomer;
    };

    $scope.addFruitpack = function(){
      $scope.addNewFruitpack = !$scope.addNewFruitpack;
    };

}]);
