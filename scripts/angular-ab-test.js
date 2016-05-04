var abtest = angular.module('abtest', ['ngRoute']);

abtest.directive('experiment', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			name: '@name',
			variant: '@variant',
			isdefault: "@isdefault"
		},
		template: '<div ng-controller="ExperimentController" ng-init="load(name, isdefault)" ng-show="canShow(variant)"><div ng-transclude></div></div>'
	}
});

function ExperimentController($scope) {
	$scope.experiment = { name: undefined, value: undefined };
	$scope.noTestLoaded = false;

	$scope.load = function(name, isDefault) {
		$scope.isDefault = isDefault;

		var experimentJson = localStorage['abtests'];
		if(!experimentJson)	{
			$scope.noTestLoaded = true;
			return;
		}

		var parsed = JSON.parse(experimentJson);
		var filtered = parsed.filter(function(item) { return item.name === name; });
		
		if(filtered.length > 0) {
			$scope.experiment = filtered[0];
		}
		else {
			$scope.noTestLoaded = true;
		}
	}

	$scope.canShow = function(variant) {
		return $scope.experiment.value === variant || $scope.showDefault();
	}

	$scope.showDefault = function() {
		return $scope.noTestLoaded && $scope.isDefault;
	}
}

window.addTest = function(testName, variant) {
	var test = {"name":testName,"value":variant};

	var experimentJson = localStorage['abtests'];

	if(!experimentJson) {
		localStorage['abtests'] = JSON.stringify([test]);
	}
	else {
		var experiments = JSON.parse(experimentJson);
		experiment.push(test);
		localStorage['abtests'] = JSON.stringify(experiments);
	}
}

window.updateTest = function(testName, variant) {
	var newTest = {"name":testName,"value":variant};

	var experimentJson = localStorage['abtests'];

	if(!experimentJson) return;

	var experiments = JSON.parse(experimentJson);

	var filtered = experiments.filter(function(item) { return item.name === testName; });
	
	if(filtered.length > 0) {
		//remove old
		var index = experiments.indexOf(filtered[0])
		experiments.splice(index, 1);

		//add new
		filtered[0].value = variant
		experiments.push(filtered[0]);
	}

	localStorage['abtests'] = JSON.stringify(experiments);
}

window.hasTest = function(testName) {
	var experimentJson = localStorage['abtests'];

	if(!experimentJson) return false;

	var experiments = JSON.parse(experimentJson);
	var filtered = experiments.filter(function(item) { return item.name === testName; });
	
	if(filtered.length > 0) {
		return true;
	}

	return false;
}