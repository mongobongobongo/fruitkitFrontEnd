fruitkitDirectives.directive('addOrder', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/addOrder.html',
    controller: function($rootScope, $scope, $http, connectToStagingServer ){
      //global variables
      //$scope.orders = [];
      //$scope.packs = [];
      //$scope.customers = [];
      //$scope.employees = [];

      //scope variables  
      $scope.showForm = true;

      //info
      $scope.orderCustomer = "";
      $scope.orderPack = "";

      $scope.orderAddress = "";
      $scope.orderAddressMap = "";
      $scope.orderDays = [];
      $scope.orderFirstsDeliveryDate = "";
      $scope.orderStatus = "";
      $scope.orderDriver = { };
      $scope.orderDriver.firstName = "";
      $scope.orderIsActive = false;
      $scope.orderDetails = "";
      $scope.orderContactPerson = "";
      $scope.orderContactPersonTelephone = " ";
              
      //info from new servers
      /*connectToStagingServer.getPackages(function (data) {
        $rootScope.packs = data;
      });

      connectToStagingServer.getCustomers(function (data) {
        $rootScope.customers = data;
      });

      connectToStagingServer.getEmployees(function(data){
        $rootScope.employees = data;
      });*/

      function resetAddForm(){
        $scope.orderCustomer = "";
        $scope.orderAddress = "";
        $scope.orderPack = "";
        $scope.orderPacks = [];
        $scope.orderDays = [];
        $scope.orderFirstsDeliveryDate = "";
        $scope.orderStatus = "";
        $scope.orderDriver = "";
        $scope.orderIsActive = false;
        $scope.orderWeeks = "";
        $scope.everyCheck = false;
        $scope.evenCheck = false;
        $scope.oddCheck = false;
        $scope.activeCheck = false;
        $scope.nonactiveCheck = false;
        $scope.dayChecked = false;
      }

      $scope.isActive = function(){
        $scope.orderIsActive = true;
        $scope.activeCheck = true;
        $scope.nonactiveCheck = false;
      };

      $scope.isNotActive = function(){
        $scope.orderIsActive = false;
        $scope.activeCheck = false;
        $scope.nonactiveCheck = true;
      };

      $scope.selectWeek = function(week){
        if(week == "even"){
          $scope.orderWeeks = "even";
          $scope.everyCheck = false;
          $scope.evenCheck = true;
          $scope.oddCheck = false;
        } else if(week == "every"){
          $scope.orderWeeks = "every";
          $scope.everyCheck = true;
          $scope.evenCheck = false;
          $scope.oddCheck = false;
        } else if(week== "off"){
          $scope.orderWeeks = "odd";
          $scope.everyCheck = false;
          $scope.evenCheck = false;
          $scope.oddCheck = true;
        } else{}
      };

      //record "uncheck event" to track which days were 

      $scope.addDay = function(day){
        $scope.dayChecked = false;
        var day = day;
        function findDay(element) { 
          return element === day;
        }
        if(!$scope.orderDays.find(findDay)){
          $scope.orderDays.push(day);
        }
      };
   
      $scope.addOrder = function(){
        $scope.order = {};
        $scope.order.address = $scope.orderAddress  || "no address";
        $scope.order.pack = $scope.orderPack || "no packs";
        $scope.order.isActive = $scope.orderIsActive;
        $scope.order.weeks = $scope.orderWeeks ||  "no weeks";
        $scope.order.days = $scope.orderDays ||  "no days";
        $scope.order.firstDelivery = $scope.orderFirstsDeliveryDate  ||  "no first delivery";
        $scope.order.customer = $scope.orderCustomer  ||  "no customer";
        $scope.order.orderDriver = {};
        $scope.order.orderDriver.firstName = $scope.orderDriver.firstName || "no driver";
        $scope.order.orderStatus = $scope.orderStatus || "not packed";
        $scope.order.statusList = ["not packed", "packed", "to be picked", "picked", "delivered" ];
        $scope.order.details = $scope.orderDetails || " ";
        $scope.order.contactPerson = $scope.orderContactPerson || "";
        $scope.order.telephone = $scope.orderContactPersonTelephone || " ";
        $scope.orders.push($scope.order);

        connectToStagingServer.postOrders($scope.order);
        console.log($scope.order);
        $scope.showForm = false;
        resetAddForm();
      };

    }
  };
});
