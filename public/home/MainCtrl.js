angular.module('MainCtrl', []).controller('MainController', ['$scope', '$route', 'AuthenticationService',
	function ($scope, $route, AuthService) {
		$scope.authenticated = AuthService.authenticated();

		$scope.user = AuthService.getUser();

		$scope.logout = function () {
			AuthService.logout();
			$route.reload();
		}
	}
]);