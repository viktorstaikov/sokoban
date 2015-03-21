angular.module('LvlFactory', []).factory('LevelFactory', ['AuthenticationService', '$http',
	function (AuthenticationService, $http) {
		var token = AuthenticationService.getToken();

		return {
			getAll: function () {
				var req = {
					url: '/api/level',
					method: 'GET',
					headers: {
						'Authorization': 'JWT ' + token.token
					}
				}
				return $http(req);
			},
			getById: function (id) {
				var req = {
					url: '/api/level/' + id,
					method: 'GET',
					headers: {
						'Authorization': 'JWT ' + token.token
					}
				}
				return $http(req);
			}
		};
	}
]);