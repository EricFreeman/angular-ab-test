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

function experimentController($scope) {
	$scope.experiment = { name: undefined, value: undefined };

	$scope.load = function(name) {
		var experimentJson = localStorage['abtests'];
		if(!experimentJson) return;

		var parsed = JSON.parse(experimentJson);
		var filtered = parsed.filter(function(item) { return item.name === name; });
		$scope.experiment = filtered.length > 0 ? filtered[0] : undefined;
	}

	$scope.canShow = function(variant) {
		return $scope.experiment.value === variant;
	}
}