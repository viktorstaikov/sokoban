angular.module('app', [
		'ngRoute',
		'LocalStorageModule',

		'AuthService',
		'LvlFactory',
		'PrgrssFactory',

		'SokobanBoardDirective',

		'appRoutes',
		'MainCtrl',
		'PlayCtrl',
		'LoginCtrl',
		'SignupCtrl',
	])
	.config(function (localStorageServiceProvider) {
		localStorageServiceProvider
			.setPrefix('sokobanApp')
			.setStorageType('sessionStorage')
			.setNotify(true, true)
	});