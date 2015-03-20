angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'MainController'
			})
			.when('/about', {
				templateUrl: 'views/about.html'
			});

		$locationProvider.html5Mode(true); // fix url to not contain '#'
	}
]);