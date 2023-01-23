//game board
var gameBoard = (function (move) {
  const board = document.querySelector(".board");
  board.addEventListener("click", (e) => {
    const squares = e.target.closest(".board-square");
    if (squares.innerHTML !== "") {
      return;
    } else {
      squares.innerHTML = "X";
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

//game functionality
var gameController = (function () {})();

//game controls setup
var gameSetup = (function () {
  const pvc = document.getElementById("pvc");
  const pvp = document.getElementById("pvp");
  const p1Name = document.getElementById("p1-name");
  const p2Name = document.getElementById("p2-name");
  const p2Label = document.querySelector(".p2-name-label");
  const p2RoleTitle = document.querySelector(".p2-choose-role");
  const p1RoleX = document.getElementById("p1-role-x");
  const p2RoleX = document.getElementById("p2-role-x");
  const p1RoleY = document.getElementById("p1-role-y");
  const p2RoleY = document.getElementById("p2-role-y");
  const p2RoleLabel = document.querySelectorAll(".p2-role-label");
  const inputs = document.querySelectorAll("input");
  pvc.addEventListener("click", (e) => {
    p2Name.disabled = true;
    p2RoleX.disabled = true;
    p2RoleY.disabled = true;
    p2Label.classList.add("disabled-label");
    p2RoleTitle.classList.add("disabled-label");
    p2RoleLabel.forEach((label) => {
      label.classList.add("disabled-label");
    });
  });

  pvp.addEventListener("click", (e) => {
    p2Name.disabled = false;
    p2RoleX.disabled = false;
    p2RoleY.disabled = false;
    p2Label.classList.remove("disabled-label");
    p2RoleTitle.classList.remove("disabled-label");
    p2RoleLabel.forEach((label) => {
      label.classList.remove("disabled-label");
    });
  });
})();

//previous code - don't come back to this unless absolutely necessary
// const startGameButton = document.querySelector(".start");
// const p1Name = document.getElementById("p1-name");
// const p2Name = document.getElementById("p2-name");
// const p1RoleX = document.getElementById("p1-role-x");
// const p2RoleX = document.getElementById("p2-role-x");
// const p1RoleY = document.getElementById("p1-role-y");
// const p2RoleY = document.getElementById("p2-role-y");
// startGameButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("test");
//   var playerOne = playerFactory(p1Name.value, p1RoleX.value);
//   var playerTwo = playerFactory(p2Name.value, p2RoleY.value);
//   playerOne.welcomePlayerX();
//   playerTwo.welcomePlayerY();
// });
//   var joe = playerFactory("Joe", "X");
//   var jane = playerFactory("Jane", "Y");
//   players.push(joe);
//   players.push(jane);
//   console.log(players);
//   joe.welcomePlayerX();
//   jane.welcomePlayerY();

//   return {
//     runPLayerMove: function () {
//       gameBoard(role);
//     },
//   };
