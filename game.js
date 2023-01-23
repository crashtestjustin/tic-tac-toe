//game board
var gameBoard = (function (move) {
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

//game functionality
var gameController = (function () {
  const startGameButton = document.querySelector(".start");
  const p1Name = document.getElementById("p1-name");
  const p2Name = document.getElementById("p2-name");
  const p1RoleX = document.getElementById("p1-role-x").value;
  const p2RoleX = document.getElementById("p2-role-x").value;
  const p1RoleY = document.getElementById("p1-role-y").value;
  const p2RoleY = document.getElementById("p2-role-y").value;
  var playerX;
  var playerO;
  startGameButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (p1RoleX.checked) {
      playerX = personFactory(p1Name.value, p1RoleX);
      playerO = personFactory(p2Name.value, p2RoleY);
      console.log(playerX, playerO);
      playerX.welcomeMessage();
      playerO.welcomeMessage();
    } else {
      playerO = personFactory(p1Name.value, p1RoleY);
      playerX = personFactory(p2Name.value, p2RoleX);
      console.log(playerX, playerO);
      playerX.welcomeMessage();
      playerO.welcomeMessage();
    }
  });
})();

//game controls setup
var gameSetup = (function () {
  const pvc = document.getElementById("pvc");
  const pvp = document.getElementById("pvp");
  const p2Name = document.getElementById("p2-name");
  const p2Label = document.querySelector(".p2-name-label");
  const p2RoleTitle = document.querySelector(".p2-choose-role");
  const p2RoleX = document.getElementById("p2-role-x");
  const p2RoleY = document.getElementById("p2-role-y");
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
