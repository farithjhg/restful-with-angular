(function(angular) {
  'use strict';
    
var myApp = angular.module('myApp',['ngRoute', 'ngResource']);

myApp.controller('myController', function ($scope, $http){
	$http.get('http://localhost:8080/restful-with-angular/rest/regions').
    success(function(data) {
        $scope.regions = data;
    }).error(function(data, status) {
        console.log("Request failed " + status);
    });
	
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

myApp.factory('RegionsFactory', function ($resource) {
    return $resource('/restful-with-angular/rest/regions', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

myApp.factory('RegionFactory', function ($resource) {
    return $resource('/restful-with-angular/rest/regions/:id', {}, {
        show: { method: 'GET' },
        updateRow: { method: 'PUT', params: {id: '@id'} },
        deleteRow: { method: 'DELETE', params: {id: '@id'} }
    })
});

myApp.controller('hrController', ['$scope','$location','RegionFactory', 'RegionsFactory',
                                  function ($scope, $location, RegionFactory, RegionsFactory){
	// callback for ng-click 'editUser':
    $scope.editRegion = function (regionId) {
        $location.path('/region-detail/' + regionId);
    };	
	
	// callback for ng-click 'deleteUser':
    $scope.deleteRegion = function (regionId) {
    	RegionFactory.deleteRow({ id: regionId });
    	$scope.regions = RegionsFactory.query();
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

myApp.config(function($routeProvider) {
    $routeProvider
	    .when('/regions', {
	        controller: 'hrController',
	        templateUrl: 'view/regions.html'
	    })
	    .when('/newRegion', {
	        controller: 'RegionCreateController',
	        templateUrl: 'view/newRegion.html'
	    })
	    .when('/region-detail/:id', {
	        controller: 'RegionEditController',
	        templateUrl: 'view/region-detail.html'
	    })	    
        .when('/view1', {
            controller: 'myController',
            templateUrl: 'Partials/view1.html'
        })
        .when('/view2', {
            controller: 'myController',
            templateUrl: 'Partials/view2.html'
        })
        .otherwise({redirectTo: '/regions'});
});
    
})(window.angular);