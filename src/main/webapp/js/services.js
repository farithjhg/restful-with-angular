'use strict';

/* Services */

var services = angular.module('hrApp.services', []);

services.factory('RegionsFactory', function ($resource) {
    return $resource('/rest/regions/getAllRegions', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('RegionFactory', function ($resource) {
    return $resource('/rest/regions/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});
