fruitkitControllers.controller('packageController', ['$scope', '$routeParams' ,'$location', '$http', 'GetJson', function($scope, $routeParams, $location, $http, GetJson ) {
    $scope.message = 'Every package will be displayed here';
    var packageList = this;
    
    GetJson.fetchAllOrders().success(function (response) {
    	$scope.newPackageList = [];
        $scope.allData = response;
         	
        console.log("json from factory", response);
        console.log("json from factory", $scope.allData.packs);

		angular.forEach($scope.allData.packs, function(pack) {
		        //console.log(order.orderCustomer);
		    var packItem = {};
		    packItem.packId = pack.id;
		    packItem.name =  pack.name;
		    packItem.weight = pack.weight;
		    packItem.fruits= pack.fruits;
		    console.log('the item', packItem);
		    $scope.newPackageList.push(packItem);
		    

		});

     	console.log("new package list generated", $scope.newPackageList);
		packageList.packs = $scope.newPackageList;

    
		/*packageList.addPackage = function(){
			var orderId = this.orders.length +1;
			orderList.orders.push({id: orderId, customer: orderList.defaultCustomer, pack: orderList.defaultPack, address: orderList.defaultAddress, isActive: orderList.defaultisActive, weeks: orderList.defaultWeeks, days: orderList.defaultDays, firstDeliveryDate: orderList.defaultfirstDeliveryDate });
			orderList.defaultPack = '';
			orderList.defaultAddress = 'no address';
			orderList.defaultisActive = false;
			orderList.defaultWeeks = 'every';
			orderList.defaultDays = []; 
			orderList.defaultfirstDeliveryDate = 'no date';
			orderList.defaultCustomer = 'no customer';

				/*$scope.orderList.push({
			        orderId: orderId,
			        orderCustomer: {
			          id: 2,
			          name: orderList.defaultCustomer,
			          address: orderList.defaultAddress,
			          city: "Helsinki",
			          isCompany: false},
			        orderPack: {
			          packname: orderList.defaultPack,
			          packageWeight: "5kg",
			          packageFruits: ["bananas", "apples", "peaches", "oranges"] 
			        },
			        
			        isActive: orderList.defaultisActive,
			        weeks: orderList.defaultWeeks,
			        daysInWeek: orderList.defaultDays,
			        firstDeliveryDate: orderList.defaultfirstDeliveryDate
			      });
		};*/

	    /*orderList.removeOrder = function(index) {
	       orderList.orders.splice(index, 1);
	    };*/
     });

}]);