'use strict';
/* Controllers */
var fruitkitControllers =
angular.module('fruitkitControllers', []);


// create the controller and inject Angular's $scope
fruitkitControllers.controller('customersController', ['$scope', '$location', '$http', '$rootScope', 'GetJson', function($scope, $location, $http, $rootScope, GetJson)  {
/*scope.ordersJson = {};
    $http.get('json/allOrders.json').success(function(data) {
          $scope.ordersJson = data;
          console.log("success");
    });*/
    var customerList = this;
    $scope.allData =[]; 

    GetJson.fetchAllOrders().success(function (response) {
         $scope.allData = response;
         console.log("json from factory", response);
         console.log("json from factory", $scope.allData );
     //returns the array of orders
    // create a message to display in our view

 
          $scope.message = 'Customers are going to be in this list';
          $scope.editIsActive = false;
          $scope.customerId = null;
          $scope.orderList = $scope.allData.orders; //$scope.ordersJson.orders;
          $scope.newCustomerList = [];

          //console.log("orders json", $scope.orderList);

          angular.forEach($scope.allData.orders, function(order) {
                  console.log(order.orderCustomer);
                  order.orderCustomer.isActive = order.isActive;
                  order.orderCustomer.weeks = order.weeks;
                  order.orderCustomer.daysInWeek = order.daysInWeek;
                  order.orderCustomer.pack = order.orderPack.packname;
                  order.orderCustomer.firstDeliveryDate = order.firstDeliveryDate;

                  $scope.newCustomerList.push(order.orderCustomer);

          });

          console.log("customer list", $scope.newCustomerList );
   

   
          customerList.customers = $scope.newCustomerList;
       
          customerList.addCustomer = function() {
            var customerId = this.customers.length +1;
            customerList.customers.push({id: customerId, name: customerList.defaultName, address: customerList.defaultAddress, isActive: customerList.defaultisActive, weeks:  customerList.defaultWeeks, days:  customerList.defaultDays, firstDeliveryDate: customerList.defaultfirstDeliveryDate });
            customerList.defaultName = '';
            customerList.defaultAddress = 'no address';
            customerList.defaultisActive = false;
            customerList.defaultWeeks = 'every';
            customerList.defaultDays = []; 
            customerList.defaultfirstDeliveryDate = 'no date';

           $scope.orderList.push({
              orderId: $scope.orderList.length + 1,
              orderCustomer: {
                id: customerId,
                name: customerList.defaultName,
                address: customerList.defaultAddress,
                city: "Helsinki",
                isCompany: false},
              orderPack: {
                packname: "business pack",
                packageWeight: "5kg",
                packageFruits: ["bananas", "apples", "peaches", "oranges"] 
              },
              
              isActive: customerList.defaultisActive,
              weeks: customerList.defaultWeeks,
              daysInWeek: customerList.defaultDays,
              firstDeliveryDate: customerList.defaultfirstDeliveryDate
            });

          };


          customerList.activateEdit = function() {
             $scope.editIsActive = true;
             $scope.customerId = null;
             console.log("activate edit mode is " + $scope.editIsActive );
             console.log($scope.customerId);
          };

          customerList.removeCustomer = function(index) {
             customerList.customers.splice(index, 1);
          };

          customerList.save = function() {
          //TODO: implement json saving function

          /*$http.post("allOrders.json", JSON.stringify($scope.orderList)).then(function(data) {
            $scope.msg = 'Data saved';
          });*/
          //$scope.msg = 'Data sent: '+ JSON.stringify($scope.languages);

          /*$http({
              url: '/json',
              method: "POST",
              data: JSON.stringify($scope.orderList),
              headers: {'Content-Type': undefined}
          }).success(function (data, status, headers, config) {
              //$scope.users = data.users; // assign  $scope.persons here as promise is resolved here 
              console.log("bananaaaaaaaaaa!");
          }).error(function (data, status, headers, config) {
              //$scope.status = status + ' ' + headers;
              console.log("hui");
          });*/

      };

        customerList.setEveryWeek = function(){
            customerList.defaultWeeks = 'every';
            console.log(customerList.defaultWeeks);
          };
          customerList.setEvenWeek = function(){
            customerList.defaultWeeks = 'even';
            console.log(customerList.defaultWeeks);
          };
          customerList.setOddWeek = function(){
            customerList.defaultWeeks = 'odd';
            console.log(customerList.defaultWeeks);
          }
 
          customerList.remaining = function() {
            var count = 0;
            angular.forEach(customerList.customers, function(customer) {
              count += customer.isActive ? 0 : 1;
            });
            return count;
          };
     });


   
}]);
