//game board
var gameBoard = (function () {
  const board = [];

  const gameReset = (function gameReset() {
    const resetButton = document.querySelector(".reset");
    resetButton.addEventListener("click", (e) => {
      //   board = [];
    });
  })();
})();

//game functionality
var gameController = (function () {
  var p1Role;
  var p2Role;
  var xTurn = true;
  const startGameB = document.querySelector(".start");
  startGameB.addEventListener("click", (e) => {
    e.preventDefault();
    determineRoles();
  });

  const determineRoles = () => {
    const PlayerRole = document.querySelectorAll(".role-selection");
    for (i = 0; i < PlayerRole.length; i++) {
      if (PlayerRole[i].checked) {
        if (
          PlayerRole[i].id === "p1-role-x" ||
          PlayerRole[i].id === "p1-role-o"
        ) {
          p1Role = PlayerRole[i].value;
        } else {
          p2Role = PlayerRole[i].value;
        }
      }
    }
  };

  const markBoard = () => {
    const boardSq = document.querySelectorAll(".board-square");
    boardSq.forEach((sq) => {
      sq.addEventListener("click", (e) => {
        const squares = e.target.closest(".board-square");
        if (squares.innerHTML !== "") {
          return;
        } else {
          squares.innerHTML = "X";
        }
      });
    });
  };
})();

//player creation
function personFactory(name, role) {
  return {
    name: name,
    role: role,
    welcomeMessage() {
      if (role === "X") {
        console.log(
          `Welcome ${name}. You chose to be player ${role}, you will go first.`
        );
      } else {
        console.log(
          `Welcome ${name}. You chose to be player ${role}, you will go second.`
        );
      }
    },
  };
}

//initial game controls setup
var gameSetup = (function () {
  const pvc = document.getElementById("pvc");
  const pvp = document.getElementById("pvp");
  const p2Name = document.getElementById("p2-name");
  const p2Label = document.querySelector(".p2-name-label");
  const p2RoleTitle = document.querySelector(".p2-choose-role");
  const p2RoleX = document.getElementById("p2-role-x");
  const p2RoleY = document.getElementById("p2-role-o");
  const p2RoleLabel = document.querySelectorAll(".p2-role-label");
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
