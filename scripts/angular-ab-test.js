var abtest = angular.module('abtest');

abtest.directive('experiment', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			name: '@name',
			variant: '@variant'
		},
		template: '<div ng-controller="ExperimentController" ng-init="load(name)" ng-show="canShow(variant)"><div ng-transclude></div></div>'
	}
});

function ExperimentController($scope) {
	$scope.experiment = { name: undefined, value: undefined };

	$scope.load = function(name) {
		var experimentJson = localStorage['abtests'];
		if(!experimentJson) return;

		var parsed = JSON.parse(experimentJson);
		var filtered = parsed.filter(function(item) { return item.name === name; });
		
		if(filtered.length > 0) {
			$scope.experiment = filtered[0];
		}
	}

	$scope.canShow = function(variant) {
		return $scope.experiment.value === variant;
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