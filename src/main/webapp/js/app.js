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

myApp.factory('HrFactory', function ($resource) {
    return $resource('/restful-with-angular/rest/regions', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

myApp.factory('HrFactory', function ($resource) {
    return $resource('/restful-with-angular/rest/regions/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        deleteRow: { method: 'DELETE', params: {id: '@id'} }
    })
});

myApp.controller('hrController', ['$scope','$location','HrFactory', 
                                  function ($scope, $location, HrFactory){
	
	$scope.regions = HrFactory.query();

	// callback for ng-click 'deleteUser':
    $scope.deleteRegion = function (regionId) {
    	HrFactory.deleteRow({ id: regionId });
    	$scope.regions = HrFactory.query();
    	$location.path('/regions');
    };
	
}]);

myApp.controller('RegionCreateController', ['$scope','$location','HrFactory', 
                                  function ($scope, $location, HrFactory){
	
	$scope.saveNewRegion = function(){
		HrFactory.create($scope.region);
		$scope.regions = HrFactory.query();
        $location.path('/regions');
	};
  
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