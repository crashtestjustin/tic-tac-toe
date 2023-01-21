//game board
var gameBoard = (function (move) {
  const board = document.querySelector(".board");
  board.addEventListener("click", (e) => {
    const squares = e.target.closest(".board-square");
    if (squares.innerHTML !== "") {
      return;
    } else {
      squares.innerHTML = move;
    }
  });
})();

//player creation
const playerFactory = (name, role) => {
  const welcomePlayerX = () =>
    console.log(
      `Welcome to the game ${name}. You chose to be player ${role}. You get to go first.`
    );
  const welcomePlayerY = () =>
    console.log(
      `Welcome to the game ${name}. You chose to be player ${role}. You will go second.`
    );
  return { name, role, welcomePlayerX, welcomePlayerY };
};

// console.log(joe);
// joe.welcomePlayerX();

//game functionality
var gameController = (function () {
  var players = [];
  var joe = playerFactory("Joe", "X");
  var jane = playerFactory("Joe", "Y");
  players.push(joe);
  players.push(jane);
  console.log(players);
  joe.welcomePlayerX();
  return {
    runPLayerMove: function () {
      gameBoard(role);
    },
  };
})();

// function displayMoves(move) {
//   gameBoard.push(move.toUpperCase());
//   const squares = document.querySelectorAll(".board-square");
//   for (i = 0; i < gameBoard.length; i++) {
//     squares[i].innerHTML = gameBoard[i];
//   }
//   console.log(gameBoard);
// }
