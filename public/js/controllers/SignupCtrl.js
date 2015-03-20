angular.module('SignupCtrl', []).controller('SignupController', ['$scope', '$location', 'AuthenticationService',
	function ($scope, $location, AuthService) {

		$scope.errorMsg = '';

		$scope.email = '';
		$scope.password = '';

		$scope.signup = function () {
			AuthService.signup($scope.email, $scope.password, function () {
				$scope.errorMsg = '';
				$location.path('/login');
			}, function (err) {
				$scope.errorMsg = err;
			});
		};
	}
]);