angular.module('PlayCtrl', []).controller('PlayController', ['$scope', '$location', 'AuthenticationService',
	function ($scope, $location, AuthService) {

		if (!AuthService.authenticated()) {
			var path = $location.path();
			$location.path('/login');
			$location.search('redirect_url', path);
		}

	}
]);