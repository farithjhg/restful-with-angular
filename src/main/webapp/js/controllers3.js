var coursesApp = angular.module('coursesApp', []);

coursesApp.controller('coursesCtrl', function ($scope, $http) {
	  $http.get("http://cdn.rawgit.com/motyar/bcf1d2b36e8777fd77d6/raw/bfa8bc0d2d7990fdb910927815a40b572c0c1078/out.xml").
        success(function(response, $attrs) {
        	var x2js = new X2JS();
        	var json = x2js.xml_str2json(response);
            var courses= json.books.course;
            $scope.courses = courses;
        }).error(function(data, status) {
            console.log("Request failed " + status);
        });
});