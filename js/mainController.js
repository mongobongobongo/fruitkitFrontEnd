fruitkitControllers.controller(
  'mainController', 
  ['$scope', '$routeParams' ,'$location', '$http', 'GetJson', 'connectToKallesServer', 
  function($scope, $routeParams, $location, $http, GetJson, connectToKallesServer ) {

    //scope variables
    $scope.orders = [];
    $scope.packs = [];
    $scope.employees = [];

    //for maps
    $scope.orderAddress = "";
    $scope.mapCoordinates = "";
    $scope.latitude = 0;
    $scope.longitude = 0;
    $scope.lat = 0;
    $scope.lng = 0;
    $scope.map = {};
    


    //DELETE
    //$scope.driversList = [];
    //$scope.packList = [];

    //sorting by status
    $scope.statusToSort = "";
    $scope.listOfstatuses = ["", "not packed", "packed", "to be picked", "picked", "delivered" ];
    //sorting by days
    $scope.dayToSort = "";
    $scope.lostOfdays = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    //sorting by driver
    $scope.driverToSort = "";
    //sorting by pack
    $scope.packToSort = "";

    //controll extra info 
    $scope.showextra = false;
    $scope.datailOrder = "";

    connectToKallesServer.getPackages(function (data) {
      $scope.packs = data;
      console.log("real packages", $scope.packs );
    });

    connectToKallesServer.getOrders(function (data) {
      $scope.orders = data;
    });

    connectToKallesServer.getEmployees(function (data) {
      $scope.employees = data;
      $scope.employees.push({firstName: "no driver"});
    });

    connectToKallesServer.getCustomers(function (data) {
      $scope.customers = data;
    });

    //sorting
    $scope.sortByPack = function(packToSort){
        /*$scope.packList = [];
        angular.forEach($scope.orders, function(order){
            if(order.pack.name === packToSort.name){
                 $scope.packList.push(order);
            }
        });*/
    };

    $scope.sortByDriver = function(driverToSort){
       /* $scope.driversList = [];
        angular.forEach($scope.orders, function(order){
            if(order.orderDriver.firstName === driverToSort.firstName){
                $scope.driversList.push(order);
            }
        });*/
    };

    $scope.colorCodeNotPacked = function(order){
        if(order.orderStatus === "not packed"){
          return true;
        } else {
          return false;
        }
    };

    $scope.colorCodePacked = function(order){
        if(order.orderStatus === "packed"){
          return true;
        } else {
          return false;
        }
    };

    $scope.colorCodePicked = function(order){
        if(order.orderStatus === "picked"){
          return true;
        } else {
          return false;
        }
    };

    $scope.colorCodeDelivered = function(order){
        if(order.orderStatus === "delivered"){
          return true;
        } else {
          return false;
        }
    };

    $scope.resetSort = function(){
      $scope.statusToSort = "";
      $scope.driverToSort = "";
      $scope.packToSort = "";
      $scope.dayToSort = "";
    };

    $scope.changedOrderStatus = function(changedValue, id, $index){ 
      if(changedValue === "packed"){
        $scope.orderPacked = true;
      } else if(changedValue === "delivered"){
          $scope.orderDelivered = true;
      }
      connectToKallesServer.putOrder({
        orderStatus: changedValue
      },id);
    };

    $scope.changedDriver = function(changedValue, id, $index){
        connectToKallesServer.putOrder({
          orderDriver: {firstName: changedValue}
        },id);
    };

    $scope.getOrder = function(id, index){
      connectToKallesServer.getOrder(function(data){
        $scope.datailOrder = data;
        $scope.orderAddress =  $scope.datailOrder[0].address;
      },id);
      decodeAddressIntoCoordinates($scope.orderAddress);
    };

    $scope.showExtraInfo = function(id , $index){
      $scope.getOrder(id , $index);
      $scope.showextra = true;
    };

    $scope.hideDetails = function(){
      $scope.showextra = false;
    };


    function decodeAddressIntoCoordinates(addressObj){
      //example : http://maps.google.com/maps/api/geocode/json?address=Aleksanterinkatu+50,+00100,+Helsinki
      // Simple GET request example:
      $http({
        method: 'GET',
        url: 'http://maps.google.com/maps/api/geocode/json?address=' +'Aleksanterinkatu+50,+00100,+Helsinki'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
         
          console.log("this is maps", response.data.results[0].geometry.location);
          $scope.mapCoordinates = response.data.results[0].geometry.location;
          $scope.latitude = response.data.results[0].geometry.location.lat;
          $scope.longitude = response.data.results[0].geometry.location.lng;
          $scope.lat = parseFloat($scope.latitude).toFixed(3);
          $scope.lng = parseFloat($scope.longitude).toFixed(3);
          $scope.map = { 
            center: { latitude: $scope.latitude, longitude:  $scope.longitude }, 
            zoom: 8 
          };

          
          
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
       
          console.log("this is maps", $scope.latitude, $scope.longitude);
    }
    //decodeAddressIntoCoordinates();

    
    

       

	/*$scope.orderAddress = "";
	$scope.orderPack = $scope.selectedPack || "no pack";
	$scope.orderCustomer = "";
	$scope.orderDays = [];
	$scope.orderFirstsDeliveryDate = "";*/

	/*$scope.isActive = function(){
		$scope.orderIsActive = true;
	};*/

	/*$scope.selectWeek = function(week){
		if(week == "even"){
			$scope.orderWeeks = "even";
		}
		else if(week == "every"){
			$scope.orderWeeks = "every";
		}
		else{
			$scope.orderWeeks = "odd";
		}
	};*/

	/*$scope.addDay = function(day){
		$scope.orderDays.push(day);
	};*/
    
}]);