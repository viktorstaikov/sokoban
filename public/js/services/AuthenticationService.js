angular.module('AuthService', []).service('AuthenticationService', ['$http', function ($http) {

	var user;
	var token;

	this.authenticated = function () {
		return token && user;
	}

	this.getUser = function () {
		return user;
	};

	this.login = function (email, password) {
		$http.post('/login', {
				email: email,
				password: password
			})
			.success(function (data, status, headers, config) {
				user = data.user;
				token = data.token;
			}).error(function (data, status, headers, config) {
				// redirect to login form with some message
			});
	}

	this.signup = function (email, password) {
		$http.post('/signup', {
				email: email,
				password: password
			})
			.success(function (data, status, headers, config) {
				// decide whether to login the user or redirect to login form
			}).error(function (data, status, headers, config) {
				// return to signup form with some message
			});
	}
}]);