angular.module('LvlFactory', []).factory('LevelFactory', ['AuthenticationService', '$http',
	function (AuthenticationService, $http) {
		var token = AuthenticationService.getToken();

		return {
			getById: function (id) {
				var req = {
					url: '/api/level/' + id,
					method: 'GET',
					headers: {
						'Authorization': 'JWT ' + token
					}
				}
				return $http(req);
			}
		};
	}
]);