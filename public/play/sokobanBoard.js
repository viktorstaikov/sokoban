angular.module('PlayCtrl').directive('sokobanBoard', function () {
  return {
    restrict: 'E',
    templateUrl: 'play/templates/sokoban-board-template.html',
    controller: 'PlayController',
    scope: {},
    link: function (scope, element, attrs) {
      var level,
        board = [''],
        movesHistory = [],
        sprite,
        possibleWin = false;

      var boardObjects = {
        freeCell: " ",
        wall: "#",
        player: "@",
        crate: "$",
        spot: ".",
        crateOnSpot: "*",
        playerOnSpot: "+"
      }

      var cellHeight, cellWidht;


      String.prototype.replaceAt = function (index, character) {
        return this.substr(0, index) + character + this.substr(index + character.length);
      }

      Array.prototype.getCopy = function () {
        return this.slice();
      }

      function drawCell(x, y) {
        var character = board[x][y];

        var keys = Object.keys(boardObjects);
        for (var i = 0; i < keys.length; i++) {
          if (character == boardObjects[keys[i]]) {

            ctx.drawImage(sprite, i * 32, 0, 32, 32, y * cellWidht, x * cellHeight, cellWidht, cellHeight);
            return;
          }
        }

        // if no matching boardObjects, then draw a free cell (some of the sample levels are like that)
        ctx.drawImage(sprite, 0, 0, 32, 32, y * cellWidht, x * cellHeight, cellWidht, cellHeight);
      }

      function drawBoard() {
        for (var i = 0; i < level.Height; i++) {
          if (!(board[i] && board[i].length > 0)) {
            board[i] = new Array(level.Width + 1).join(" ");
          }
          for (var j = 0; j < level.Width; j++) {
            drawCell(i, j);
          }
        };
      }

      function move(from, to) {

        var newFromObject, newToObject;

        switch (board[from.x][from.y]) {
        case boardObjects.player:
          newFromObject = 'freeCell';
          newToObject = 'player';
          break;
        case boardObjects.playerOnSpot:
          newFromObject = 'spot';
          newToObject = 'player';
          break;
        case boardObjects.crate:
          newFromObject = 'freeCell';
          newToObject = 'crate';
          break
        case boardObjects.crateOnSpot:
          newFromObject = 'spot';
          newToObject = 'crate';
          possibleWin = false;
          break;
        }

        if (board[to.x][to.y] == boardObjects.spot) {
          possibleWin = true;
          newToObject += 'OnSpot';
        }

        // board[from.x][from.y] = boardObjects[newFromObject];
        // board[to.x][to.y] = boardObjects[newToObject];

        // the ugliest thing I have ever wrote. the above simply does not work in js despite being logical.
        board[from.x] = board[from.x].replaceAt(from.y, boardObjects[newFromObject]);
        board[to.x] = board[to.x].replaceAt(to.y, boardObjects[newToObject]);
      }

      function possibleMovement(object, vector) {
        var targetCell = {
          x: object.x + vector.x,
          y: object.y + vector.y
        };

        if (board[targetCell.x][targetCell.y] == boardObjects.wall) {
          return false;
        }
        if (board[targetCell.x][targetCell.y] == boardObjects.freeCell ||
          board[targetCell.x][targetCell.y] == boardObjects.spot) {
          move(object, targetCell);
          return true;
        }
        if (possibleMovement(targetCell, vector)) {
          move(object, targetCell);
          return true;
        }
        return false;
      }

      function movePlayer(vector) {
        var player = {};
        for (var i = 0; i < board.length; i++) {
          for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] == boardObjects.player || board[i][j] == boardObjects.playerOnSpot) {
              player.x = i;
              player.y = j;

              if (possibleMovement(player, vector)) {
                var newBoard = board.getCopy();
                movesHistory.push(newBoard);
                scope.makeProgress(newBoard, level._id);
              }
              return;
            }
          };
        };
      }

      function getMovementVector(direction) {
        var v = {
          "up": {
            x: -1,
            y: 0
          },
          "down": {
            x: 1,
            y: 0
          },
          "left": {
            x: 0,
            y: -1
          },
          "right": {
            x: 0,
            y: 1
          }
        }
        return v[direction];
      }

      function onKeyPressed(e) {

        if (37 <= e.keyCode && e.keyCode <= 40) {
          var vector = getMovementVector(e.keyIdentifier.toLowerCase());

          movePlayer(vector);
          drawBoard();

          if (possibleWin && gameCompleted()) {
            possibleWin = false;
            level.state = 2;

            alert('Success');
            window.removeEventListener('keydown', onKeyPressed, false);

            scope.finishLevel(board, level._id);
          }

          e.preventDefault();
          return false;
        } else if (e.keyCode == 85) {
          if (movesHistory && movesHistory.length > 1) {
            movesHistory.pop();
            board = movesHistory[movesHistory.length - 1].getCopy();
            drawBoard();
          }
        };
      }

      function gameCompleted() {
        for (var i = 0; i < board.length; i++) {
          for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] == boardObjects.crate) {
              return false;
            }
          };
        };
        return true;
      }

      window.startGame = function startGame(lvl, usr) {
        var canvas = document.getElementById('gameCanvas');
        canvas.height = canvas.width;

        level = lvl;
        if (level.state && level.board && level.board.length) {
          board = level.board.getCopy();
        } else {
          board = level.L.getCopy();
        }
        movesHistory = [];
        possibleWin = false;

        if (canvas.getContext) {
          ctx = canvas.getContext('2d');

          cellHeight = canvas.height / level.Height;
          cellWidht = canvas.width / level.Width;

          sprite = new Image();
          sprite.src = 'assets/sprite.jpg';
          sprite.onload = drawBoard;

          window.addEventListener('keydown', onKeyPressed, false);
        } else {
          alert("Canvas not supported!");
        }
      }
    }
  };
});