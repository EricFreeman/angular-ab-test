var abtest = angular.module('abtest');

abtest.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/example', {
				templateUrl: 'example.html',
				controller: 'ExampleController'
			}).
			when('/documentation', {
				templateUrl: 'documentation.html'
			}).
			otherwise({
				redirectTo: '/example'
			});
	}
]);

function HeaderController($scope, $location) 
{ 
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}

function ExampleController($scope, $location) {
	$scope.load = function() {
		var experimentJson = localStorage['abtests'];
		if(!experimentJson) {
			window.addTest('sample-test', 'a');
		}
	}

	$scope.switchVariant = function(variant) {
		window.updateTest('sample-test', variant);
		// this is a fuck but meh; this is an example and why are you changing tests at real time anyways?
		$location.path('/');
	}
}