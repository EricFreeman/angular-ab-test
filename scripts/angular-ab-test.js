var abtest = angular.module('abtest');

abtest.directive('experiment', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			name: '@name',
			variant: '@variant'
		},
		templateUrl: '../templates/experiment.html'
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