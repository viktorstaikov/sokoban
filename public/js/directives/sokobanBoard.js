angular.module('SokobanBoardDirective', []).directive('sokobanBoard', function () {
  return {
    restrict: 'AE',
    templateUrl: 'js/directives/templates/sokoban-board-template.html',
    scope: {},
    link: function (scope, element, attrs) {
      var board = {
          "_id": "550bfe32c7683c0b6ec637f8",
          "Height": 10,
          "Width": 9,
          "Name": "Fill the hall",
          "__v": 0,
          "L": [
            "  #####",
            "  #   #",
            "  #   #",
            "### * ###",
            "#  *.*  #",
            "#  *.*  #",
            "#  *.*  #",
            "###$$$###",
            "  # @ #",
            "  #####"
          ],
          "$$hashKey": "object:6",
          "status": 0
        },
        user = {
          "_id": "550b03017e0dd8a3457742ca",
          "password": "$2a$08$QZ35iOcTETG5UU/VLfCpc.hB0S5IPQJMbNMmoMixfkcBocU2EVMX2",
          "email": "1",
          "__v": 0,
          "name": "User1426952298276"
        };

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

      function drawCell(x, y) {
        var character = board.L[x][y];
        var color = "#FFFFFF";
        switch (character) {
        case boardObjects.wall:
          color = "#7A7976";
          break;
        case boardObjects.crateOnSpot:
          color = "#00FF00";
          break;
        case boardObjects.spot:
          color = "#0000FF";
          break;
        case boardObjects.crate:
          color = "#FFFF00";
          break;
        case boardObjects.player:
          color = "#FF0000";
          break;
        case boardObjects.playerOnSpot:
          color = "#FF00FF";
          break;
        }

        ctx.fillStyle = color;

        ctx.fillRect(y * cellWidht, x * cellHeight, cellWidht, cellHeight);

        ctx.stroke();
      }

      function drawBoard() {
        for (var i = 0; i < board.Height; i++) {
          if (!(board.L[i] && board.L[i].length > 0)) {
            board.L[i] = new Array(board.Widht + 1).join(" ");
          }
          for (var j = 0; j < board.Width; j++) {
            drawCell(i, j);
          }
        };
      }

      function move(from, to) {
        var newFromObject, newToObject;

        switch (board.L[from.x][from.y]) {
        case boardObjects.player:
          newFromObject = 'freeCell';
          newToObject = 'player';
          break;
        case boardObjects.playerOnSpot:
          newFromObject = boardObjects.spot;
          newToObject = 'player';
          break;
        case boardObjects.crate:
          newFromObject = boardObjects.freeCell;
          newToObject = 'create';
          break
        case boardObjects.crateOnSpot:
          newFromObject = boardObjects.spot;
          newToObject = 'player';
          break;
        }

        if (board.L[to.x][to.y] == boardObjects.spot) {
          newToObject += 'OnSpot';
        }

        board.L[from.x][from.y] = boardObjects[newFromObject];
        board.L[to.x][to.y] = boardObjects[newToObject];
      }

      function possibleMovement(object, vector) {
        var targetCell = {
          x: object.x + vector.x,
          y: object.y + vector.y
        };

        if (board.L[targetCell.x][targetCell.y] == boardObjects.wall) {
          return false;
        }
        if (board.L[targetCell.x][targetCell.y] == boardObjects.freeCell ||
          board.L[targetCell.x][targetCell.y] == boardObjects.spot) {
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
        for (var i = 0; i < board.L.length; i++) {
          for (var j = 0; j < board.L[i].length; j++) {
            if (board.L[i][j] == boardObjects.player) {
              player.x = i;
              player.y = j;

              possibleMovement(player, vector);
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
        if (e.keyCode < 37 || 40 < e.keyCode) {
          return;
        }
        var vector = getMovementVector(e.keyIdentifier.toLowerCase());

        movePlayer(vector);
        drawBoard();
      }

      function draw() {
        var canvas = element[0].childNodes[1];

        if (canvas.getContext) {
          ctx = canvas.getContext('2d');

          cellHeight = canvas.height / board.Height;
          cellWidht = canvas.width / board.Width;

          // Draw the background
          drawBoard();

          // defaultPositions();

          // // Draw pieces
          // pieces = new Image();
          // pieces.src = 'pieces.png';
          // pieces.onload = drawPieces;

          window.addEventListener('keydown', onKeyPressed, false);
        } else {
          alert("Canvas not supported!");
        }
      }

      draw();
    }
  };
});