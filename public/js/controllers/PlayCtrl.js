angular.module('PlayCtrl', []).controller('PlayController', ['$scope', 'LevelFactory', 'ProgressFactory', 'AuthenticationService',
	function ($scope, LevelFactory, ProgressFactory, AuthenticationService) {
		$scope.currentLevel = null;
		$scope.levelSelected = false;

		$scope.start = function (level) {
			level.state = 1;
			$scope.levelSelected = true;
			ProgressFactory.create($scope.user._id, level._id, level.L);
			window.startGame(level, $scope.user);
		}

		$scope.continue = function (level) {
			$scope.levelSelected = true;
			window.startGame(level, $scope.user);
		}

		$scope.restart = function (level) {
			level.state = 0;
			$scope.levelSelected = true;
			ProgressFactory.update($scope.user._id, level._id, level.L, 0);
			window.startGame(level, $scope.user);
		}

		$scope.makeProgress = function (board, lvlId) {
			ProgressFactory.update($scope.user._id, lvlId, board);
		}

		$scope.finishLevel = function (board, lvlId) {
			ProgressFactory.update($scope.user._id, lvlId, board, 2);
		}

		$scope.user = AuthenticationService.getUser();

		LevelFactory.getAll()
			.success(function (levels) {
				$scope.levels = levels.result;

				ProgressFactory.getByUserId($scope.user._id).success(function (res) {
					var progresses = res.result;
					for (var i = 0; i < $scope.levels.length; i++) {
						$scope.levels[i].state = 0;

						for (var j = 0; j < progresses.length; j++) {
							if (progresses[j].levelId == $scope.levels[i]._id) {
								$scope.levels[i].state = progresses[j].state;
								$scope.levels[i].board = progresses[j].board;
							}
						};
					};
					console.log($scope.levels);
				});
			});
	}
]);