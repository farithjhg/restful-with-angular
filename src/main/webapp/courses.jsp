<!DOCTYPE html>
<html ng-app="coursesApp">
<head>
  <script src="lib/angular/angular.js"></script>
  <script src="js/controllers3.js"></script>
  <script src="js/xml2json.js"></script>
</head>
<body>
  <div ng-controller="coursesCtrl"> 
	<table border="1">
		<thead>
			<tr>
				<td>Code</td>
				<td>Name</td>
				<td>Page</td>
			</tr>
		</thead>
		<tr	ng-repeat="course in courses">
			<td>{{course._number}}</td>
			<td>{{course.name}}</td>
			<td>{{course.page}}</td>
		</tr>
	</table>
  </div>
</body>
</html>