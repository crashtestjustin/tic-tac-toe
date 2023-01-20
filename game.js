//game board
var gameBoard = (function () {
  var moves = ["x", "o", "x", "o", "o"];

  return moves;
})();

//player creation
const playerFactory = (name, role) => {
  const welcomePlayerX = () =>
    console.log(
      `Welcome to the game ${name}. You chose to be player ${capitalizeRole()}. You get to go first.`
    );
  const welcomePlayerY = () =>
    console.log(
      `Welcome to the game ${name}. You chose to be player ${capitalizeRole()}. You will go second.`
    );
  return { name, role, welcomePlayerX, welcomePlayerY };
};

//game functionality
const gameController = {};

function displayMoves(move) {
  gameBoard.push(move);
  const squares = document.querySelectorAll(".board-square");
  for (i = 0; i < gameBoard.length; i++) {
    squares[i].innerHTML = gameBoard[i].toUpperCase();
  }
}

displayMoves();
