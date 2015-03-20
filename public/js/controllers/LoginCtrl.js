angular.module('LoginCtrl', []).controller('LoginController', ['$scope', '$location', 'AuthenticationService',
	function ($scope, $location, AuthService) {

		$scope.errorMsg = "";

		$scope.email = "";
		$scope.password = "";

		$scope.login = function () {


			AuthService.login($scope.email, $scope.password, function () {
				$scope.errorMsg = '';

				var queryParams = $location.search();
				var url = decodeURIComponent(queryParams['redirect_url']);

				$location.search('redirect_url', null);
				$location.path(url);
			}, function (err) {
				$scope.errorMsg = err;
			});
		};
	}
]);