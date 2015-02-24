<!DOCTYPE html>
<html ng-app="temperatureApp">
<head>
  <script src="lib/angular/angular.js"></script>
  <script src="js/controllers2.js"></script>
  <script src="js/xml2json.js"></script>
</head>
<body>
  <div ng-controller="ctofservice"> 
	<p>Celsius {{celsius}}</p>
	<p>{{output}}</p>
  </div>
</body>
</html>