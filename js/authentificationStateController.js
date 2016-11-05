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
.controller('InsideCtrl', function($rootScope, $scope, AuthService, API_ENDPOINT, $http, $state, connectToStagingServer) {
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

  //info from new server
  connectToStagingServer.getOrders(function (data) {
    $scope.orders = data;
  });

  connectToStagingServer.getPackages(function (data) {
    $scope.packs = data;
  });

  connectToStagingServer.getCustomers(function (data) {
    $scope.customers = data;
  });

  connectToStagingServer.getEmployees(function (data) {
    $scope.employees = data;
  });

})
.controller('AppCtrl', function($rootScope, $scope, $state, AuthService, AUTH_EVENTS, connectToStagingServer) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('outside.login');
  });
  /*
  $rootScope.orders = [];
  $rootScope.packs = [];
  $rootScope.customers = [];
  $rootScope.employees = [];

  connectToStagingServer.getOrders(function (data) {
    $rootScope.orders = data;
  });
  connectToStagingServer.getPackages(function (data) {
    $rootScope.packs = data;
  });

  connectToStagingServer.getCustomers(function (data) {
    $rootScope.customers = data;
  });

  connectToStagingServer.getEmployees(function (data){
    $rootScope.employees = data;
  });

*/
});
