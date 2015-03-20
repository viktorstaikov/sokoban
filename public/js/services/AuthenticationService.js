angular.module('AuthService', []).service('AuthenticationService', ['$http', function ($http) {

	this.getUser = function () {
		return {
			email: "viktor.staiko@gmail.com"
		};
	};

	this.login = function (email, password) {
		$http.post('/login', {
				email: email,
				password: password
			})
			.success(function (data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
			}).error(function (data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	}

}]);