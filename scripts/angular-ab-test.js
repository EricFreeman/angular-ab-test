var abtest = angular.module('abtest', ['ngRoute']);

abtest.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/example', {
				templateUrl: 'example.html'
			}).
			when('/documentation', {
				templateUrl: 'documentation.html'
			}).
			otherwise({
				redirectTo: '/example'
			});
	}
]);