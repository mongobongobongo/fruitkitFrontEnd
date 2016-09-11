'use strict';
/* Controllers */
var fruitkitControllers = angular.module('fruitkitControllers', []);

/* Directive switcher */
var fruitkitDirectiveSwitcher = angular.module('fruitkitDirectiveSwitcher', []);

fruitkitDirectiveSwitcher.controller('switchRootDirectives', 
	['$scope', '$routeParams' ,'$location', '$http', 'GetJson', 'connectToKallesServer', 
	function($scope, $routeParams, $location, $http, GetJson, connectToKallesServer){
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
