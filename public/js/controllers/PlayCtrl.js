angular.module('PlayCtrl', []).controller('PlayController', ['$scope', 'LevelFactory', 'ProgressFactory', 'AuthenticationService',
	function ($scope, LevelFactory, ProgressFactory, AuthenticationService) {

		$scope.start = function () {
			console.log('1');
		}

		var user = AuthenticationService.getUser();

		LevelFactory.getAll()
			.success(function (levels) {
				$scope.levels = levels.result;

				ProgressFactory.getByUserId(user._id).success(function (res) {
					var progresses = res.result;
					for (var i = 0; i < $scope.levels.length; i++) {
						$scope.levels[i].status = 0;

						for (var j = 0; j < progresses.length; j++) {
							if (progresses[j].levelId == $scope.levels[i]._id) {
								$scope.levels[i].status = progresses[j].status;
								$scope.levels[i].board = progresses[j].board;
							}
						};
					};
				});
			});
	}
]);