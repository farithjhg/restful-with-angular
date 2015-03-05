'use strict';

var myControllers = angular.module('myApp.controllers',[]);

myApp.controller('dummyController', function ($scope, $http){
	$scope.custumers = [
    {'name': 'John Doe', 'city': 'San Francisco'},
    {'name': 'Jane Doe', 'city': 'Phoenix'},
    {'name': 'John Smit', 'city': 'New York'}
  ];
  
  $scope.addCustomer = function(){
	  $scope.custumers.push(
			  {
				  name: $scope.newCustomer.name, 
				  city: $scope.newCustomer.city}
			  );
  };
  
});


myApp.controller('RegionListController', ['$scope','$location','RegionFactory', 'RegionsFactory','popupService','$window',
                                  function ($scope, $location, RegionFactory, RegionsFactory, popupService, $window){
	// callback for ng-click 'editUser':
    $scope.editRegion = function (regionId) {
        $location.path('/region-detail/' + regionId);
    };	
	
	// callback for ng-click 'deleteUser':
    $scope.deleteRegion = function (regionId) {
    	if (popupService.showPopup('Really delete this?')) {
        	RegionFactory.deleteRow({ id: regionId });
        	$window.location.href = ''; //redirect to home
	     }    	
    };
    
    // callback for ng-click 'createNewRegion':
    $scope.createNewRegion = function () {
        $location.path('/newRegion');
    };  
	
	$scope.regions = RegionsFactory.query();
}]);

myApp.controller('RegionCreateController', ['$scope','RegionsFactory', '$location', 
                  function ($scope, RegionsFactory, $location){
	// callback for ng-click 'saveNewRegion':
	$scope.saveNewRegion = function() {
		RegionsFactory.create($scope.region);
		$scope.regions = RegionsFactory.query();
        $location.path('#/regions');
	};
  
}]);

myApp.controller('RegionEditController', ['$scope', '$routeParams', 'RegionFactory', '$location',
                  function ($scope, $routeParams, RegionFactory, $location) {

      // callback for ng-click 'updateRegions':
      $scope.updateRegions = function () {
    	  RegionFactory.updateRow($scope.region);
          $location.path('#/regions');
      };

      // callback for ng-click 'cancel':
      $scope.cancel = function () {
          $location.path('#/regions');
      };

      $scope.region = RegionFactory.show({id: $routeParams.id});
 }]);
