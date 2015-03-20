angular.module('app', [
		'ngRoute',
		'LocalStorageModule',

		'appRoutes',
		'MainCtrl',
		'PlayCtrl',
		'LoginCtrl',
		'SignupCtrl',
		'AuthService'
	])
	.config(function (localStorageServiceProvider) {
		localStorageServiceProvider
			.setPrefix('sokobanApp')
			.setStorageType('sessionStorage')
			.setNotify(true, true)
	});