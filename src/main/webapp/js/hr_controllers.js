angular.module('hrApp.controllers', []).controller('RegionListController', function($scope, $state, popupService, $window, Region) {
  $scope.regions = RegionsFactory.query(); //fetch all regions. Issues a GET to /api/regions
 
  $scope.deleteRegion = function(region) { // Delete a region. Issues a DELETE to /api/regions/:id
    if (popupService.showPopup('Really delete this?')) {
      region.$delete(function() {
        $window.location.href = ''; //redirect to home
      });
    }
  };
}).controller('RegionViewController', function($scope, $stateParams, Region) {
  $scope.region = Region.get({ id: $stateParams.id }); //Get a single region.Issues a GET to /api/regions/:id
}).controller('RegionCreateController', function($scope, $state, $stateParams, Region) {
  $scope.region = new Region();  //create new region instance. Properties will be set via ng-model on UI
 
  $scope.addRegion = function() { //create a new region. Issues a POST to /api/regions
    $scope.region.$save(function() {
      $state.go('regions'); // on success go back to home i.e. regions state.
    });
  };
}).controller('RegionEditController', function($scope, $state, $stateParams, Region) {
  $scope.updateRegion = function() { //Update the edited region. Issues a PUT to /api/regions/:id
    $scope.region.$update(function() {
      $state.go('regions'); // on success go back to home i.e. regions state.
    });
  };
 
  $scope.loadRegion = function() { //Issues a GET request to /api/regions/:id to get a region to update
    $scope.region = Region.get({ id: $stateParams.id });
  };
 
  $scope.loadRegion(); // Load a region which can be edited on UI
});