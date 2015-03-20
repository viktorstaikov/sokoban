angular.module('AuthService', ['LocalStorageModule']).service('AuthenticationService', ['$http', 'localStorageService',
	function ($http, localStorageService) {
		var $cookies = localStorageService.cookie;

		function setUser(user) {
			$cookies.set('user', JSON.stringify(user));
		}

		function setToken(token) {
			$cookies.set('token', JSON.stringify(token));
		}

		this.getUser = function () {
			return $cookies.get('user');
		}

		this.getToken = function () {
			return $cookies.get('token');
		}

		this.authenticated = function () {
			var user = this.getUser();
			if (!user) return false;

			var token = this.getToken();
			if (!token) return false;
			if (token.expire && token.expire < Date.now()) return false;

			return true;
		}

		this.login = function (email, password, success, error) {
			$http.post('/login', {
					email: email,
					password: password
				})
				.success(function (data, status, headers, config) {
					setUser(data.user);
					setToken(data.token);

					success();
				}).error(function (data, status, headers, config) {
					error(data);
				});
		}

		this.signup = function (user, success, error) {
			$http.post('/signup', user)
				.success(function (data, status, headers, config) {
					success();
				}).error(function (data, status, headers, config) {
					error(data);
				});
		}

		this.logout = function () {
			setUser(null);
			setToken(null);
			console.log("logout");
		}
	}
]);