angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'views/home.html',
				controller: 'MainController'
			})
			.when('/play', {
				templateUrl: 'views/play.html',
				controller: 'PlayController',
				resolve: {
					//This function is injected with the AuthService where you'll put your authentication logic
					'auth': function (AuthenticationService) {
						return AuthenticationService.authenticated();
					}
				}
			})
			.when('/about', {
				templateUrl: 'views/about.html'
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginController'
			})
			.when('/signup', {
				templateUrl: 'views/signup.html'
			})
			.otherwise({
				redirectTo: '/home'
			});

		//$locationProvider.html5Mode(true); // fix url to not contain '#'
	}
]).run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function (current, previous, rejection, message) {

		if (message === 'Not Authenticated') {
			$location.path('/login');
			$location.search('redirect_url', previous.$$route.originalPath);
		}
	})
})