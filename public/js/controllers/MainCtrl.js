angular.module('MainCtrl', []).controller('MainController', ['$scope', 'AuthenticationService', function ($scope, AuthService) {

	$scope.text = "Hello, " + AuthService.getUser().email;

}]);