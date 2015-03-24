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
			update: function (userId, gameId, board, status) {
				if (!status) {
					status = 1;
				}
				var req = {
					url: endpoint,
					method: 'PUT',
					headers: {
						'Authorization': 'JWT ' + token.token
					},
					data: {
						userId: userId,
						levelId: gameId,
						board: board,
						state: status
					}
				};
				return $http(req);
			},
			create: function (userId, gameId, board) {
				var req = {
					url: endpoint,
					method: 'POST',
					headers: {
						'Authorization': 'JWT ' + token.token
					},
					data: {
						userId: userId,
						levelId: gameId,
						board: board,
						state: 0
					}
				};
				return $http(req);
			}
		};
	}
]);