angular.module('PrgrssFactory', []).factory('ProgressFactory', ['AuthenticationService', '$http',
	function (AuthenticationService, $http) {
		var token = AuthenticationService.getToken();
		var endpoint = '/api/progress';

		return {
			getByUserId: function (id) {
				var req = {
					url: endpoint + '?userId=' + id,
					method: 'GET',
					headers: {
						'Authorization': 'JWT ' + token.token
					}
				};
				return $http(req);
			},
			update: function (userId, gameId, board) {
				var req = {
					url: endpoint,
					method: 'PUT',
					headers: {
						'Authorization': 'JWT' + token.token
					},
					data: {
						userId: userId,
						gameId: gameId,
						board: board
					}
				};
				return $http(req);
			},
			create: function (userId, gameId, board) {
				var req = {
					url: endpoint,
					method: 'POST',
					headers: {
						'Authorization': 'JWT' + token.token
					},
					data: {
						userId: userId,
						gameId: gameId,
						board: board
					}
				};
				return $http(req);
			}
		};
	}
]);