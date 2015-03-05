'use strict';
/* Services */

var services = angular.module('hrServices', ['ngResource']);

services.service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});

services.factory('RegionsFactory', function ($resource) {
    return $resource('/restful-with-angular/rest/regions', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('RegionFactory', function ($resource) {
    return $resource('/restful-with-angular/rest/regions/:id', {}, {
        show: { method: 'GET' },
        updateRow: { method: 'PUT'},
        deleteRow: { method: 'DELETE', params: {id: '@id'} }
    })
});