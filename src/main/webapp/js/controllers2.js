var temperatureApp = angular.module('temperatureApp', []);

temperatureApp.controller('ctofservice', function ($scope, $http) {
	  $http.get('http://localhost:8080/restful-with-angular/rest/ctofservice').
        success(function(response) {
        	var x2js = new X2JS();
        	var json = x2js.xml_str2json(response);
            var celsius= json.ctofservice.celsius;
            var output = json.ctofservice.ctofoutput;

            $scope.celsius = celsius;
            $scope.output = output;
        });
});