var abtest = angular.module('abtest', ['ngRoute']);

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

function ExampleController($scope) {
	$scope.load = function() {
		var experimentJson = localStorage['abtests'];
		if(!experimentJson) {
			window.addTest('sample-test', 'a');
		}
	}
}