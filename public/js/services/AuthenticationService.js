angular.module('AuthService', []).service('AuthenticationService', ['$http', function ($http) {

	var user;
	var token;

	this.authenticated = function () {
		return token && user;
	}

	this.getUser = function () {
		return user;
	};

	this.login = function (email, password, success, error) {
		$http.post('/login', {
				email: email,
				password: password
			})
			.success(function (data, status, headers, config) {
				user = data.user;
				token = data.token;
				success();
			}).error(function (data, status, headers, config) {
				error(data);
			});
	}

	this.signup = function (email, password, success, error) {
		$http.post('/signup', {
				email: email,
				password: password
			})
			.success(function (data, status, headers, config) {
				success();
			}).error(function (data, status, headers, config) {
				error(data);
			});
	}
}]);