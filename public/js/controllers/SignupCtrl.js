angular.module('SignupCtrl', []).controller('SignupController', ['$scope', '$location', 'AuthenticationService',
	function ($scope, $location, AuthService) {

		$scope.errorMsg = '';

		$scope.user = {};

		$scope.signup = function () {

			AuthService.signup($scope.user, function () {
				$scope.errorMsg = '';
				$location.path('/login');
			}, function (err) {
				$scope.errorMsg = err;
			});
		};
	}
]);