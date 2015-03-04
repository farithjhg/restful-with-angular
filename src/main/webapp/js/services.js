'use strict';
/* Services */

var services = angular.module('hrServices', ['ngResource']);

services.factory('HrFactory', function ($resource) {
    return $resource('/restful-with-angular/rest/regions', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('HrFactory', function ($resource) {
    return $resource('/restful-with-angular/rest/regions:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        deleteRow: { method: 'DELETE', params: {id: '@id'} }
    })
});
