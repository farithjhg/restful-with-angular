<!DOCTYPE html>
<html ng-app="phonecatApp">
<head>
  <script src="lib/angular/angular.js"></script>
  <script src="js/controllers.js"></script>
</head>
<body>
  <div ng-controller="PhoneListCtrl"> 
	<p>The ID is {{greeting.id}}</p>
	<p>The content is {{greeting.content}}</p>
  </div>
</body>
</html>