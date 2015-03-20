angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'views/home.html',
				controller: 'MainController'
			})
			.when('/play', {
				templateUrl: 'views/play.html',
				controller: 'PlayController'
			})
			.when('/about', {
				templateUrl: 'views/about.html'
			})
			.when('/login', {
				templateUrl: 'views/login.html'
			})
			.when('/signup', {
				templateUrl: 'views/signup.html'
			})
			.otherwise({
				redirectTo: '/home'
			});

		//$locationProvider.html5Mode(true); // fix url to not contain '#'
	}
]);