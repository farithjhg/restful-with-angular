angular.module('hrApp', ['ui.router', 'ngResource', 'hrApp.controllers', 'hrApp.services']);
 
angular.module('hrApp').config(function($stateProvider) {
  $stateProvider.state('regions', { // state for showing all movies
    url: '/rest/regions/getAllRegions',
    templateUrl: 'view/regions.html',
    controller: 'RegionListController'
  }).state('viewMovie', { //state for showing single movie
    url: '/rest/regions/:id/view',
    templateUrl: 'view/movie-view.html',
    controller: 'MovieViewController'
  }).state('newMovie', { //state for adding a new movie
    url: '/regions/new',
    templateUrl: 'view/movie-add.html',
    controller: 'MovieCreateController'
  }).state('editMovie', { //state for updating a movie
    url: '/movies/:id/edit',
    templateUrl: 'view/movie-edit.html',
    controller: 'MovieEditController'
  });
}).run(function($state) {
  $state.go('movies'); //make a transition to movies state when app starts
});