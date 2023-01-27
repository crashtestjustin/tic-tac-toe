//game board
var gameBoard = (function () {
  const board = new Array(9);

  const setArrayIndex = (index, role) => {
    if (index > board.length) return;
    board[index] = role;
  };

  const getMove = (index) => {
    return board[index];
  };

  const winningArrays = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const gameReset = (function gameReset() {
    const resetButton = document.querySelector(".reset");
    resetButton.addEventListener("click", (e) => {
      //   board = [];
    });
  })();
  return { board, setArrayIndex, getMove, winningArrays };
})();

//game functionality
var gameController = (function () {
  var p1Role;
  var p2Role;
  var player1;
  var player2;
  var activePlayer;
  var xTurn = true;
  var winner = false;
  const startGameB = document.querySelector(".start");
  const p1Name = document.getElementById("p1-name");
  const p2Name = document.getElementById("p2-name");
  startGameB.addEventListener("click", (e) => {
    e.preventDefault();
    determineRoles();
    player1 = personFactory(p1Name.value, p1Role);
    player2 = personFactory(p2Name.value, p2Role);
    if (player1.role === "X") {
      setActivePlayer(player1.name);
      activePlayer = personFactory(player1.name, "X");
    } else {
      setActivePlayer(player2.name);
      activePlayer = personFactory(player2.name, "X");
    }
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

  const markBoard = (() => {
    const boardSq = document.querySelectorAll(".board-square");
    boardSq.forEach((sq) => {
      sq.addEventListener("click", (e) => {
        const squares = e.target.closest(".board-square");
        if (squares.innerHTML !== "") {
          return;
        } else {
          xTurn ? (squares.innerHTML = "X") : (squares.innerHTML = "O");
        }
        gameBoard.setArrayIndex(squares.dataset.square, activePlayer.role);
        checkForWinner(squares.dataset.square);
        if (winner) {
          return;
        } else {
          xTurn = !xTurn;
          updateActivePlayer();
          setActivePlayer(activePlayer.name);
        }
      });
    });
  })();

  function updateActivePlayer() {
    activePlayer.name === player1.name
      ? (activePlayer = player2)
      : (activePlayer = player1);
  }

  function setActivePlayer(name) {
    const alertMessage = document.querySelector(".alert-messages");
    alertMessage.innerHTML = `${name}'s turn`;
  }

  function checkForWinner(moveIndex) {
    let matchedArrays = gameBoard.winningArrays.filter(function (innerArray) {
      return innerArray.every(function (arrayIndex) {
        return gameBoard.getMove(moveIndex) === gameBoard.getMove(arrayIndex);
      });
    });
    if (matchedArrays.length >= 1) {
      winnerAnnouncement();
      winner = true;
    } else {
      return;
    }
  }

  function winnerAnnouncement() {
    const alertMessage = document.querySelector(".alert-messages");
    alertMessage.innerHTML = `${activePlayer.name} WINS!`;
  }
  //compare gameBoard.board with winning combos
  //look for matched sequences within the board of a single role to one of the combos of winning moves
  //if none return
  //if match - run announce game winner (To Be Created)

  //
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
