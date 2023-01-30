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
  var turn = 0;
  var validGame = false;

  const domElements = (() => {
    const startGameB = document.querySelector(".start");
    const p1Name = document.getElementById("p1-name");
    const p2Name = document.getElementById("p2-name");
    const boardSq = document.querySelectorAll(".board-square");
    const PlayerRole = document.querySelectorAll(".role-selection");
    const alertMessage = document.querySelector(".alert-messages");
    const p2RoleX = document.getElementById("p2-role-x");
    const p2RoleY = document.getElementById("p2-role-o");
    const p1RoleX = document.getElementById("p1-role-x");
    const p1RoleY = document.getElementById("p1-role-o");
    return {
      startGameB,
      p1Name,
      p2Name,
      boardSq,
      PlayerRole,
      alertMessage,
      p1RoleX,
      p1RoleY,
      p2RoleX,
      p2RoleY,
    };
  })();

  domElements.startGameB.addEventListener("click", (e) => {
    e.preventDefault();
    formValidation();
    if (!validGame) {
      return;
    } else {
      determineRoles();
      player1 = personFactory(domElements.p1Name.value, p1Role);
      player2 = personFactory(domElements.p2Name.value, p2Role);
      confirmActive();
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
    domElements.boardSq.forEach((sq) => {
      sq.addEventListener("click", (e) => {
        const squares = e.target.closest(".board-square");
        if (squares.innerHTML !== "") {
          return;
        } else {
          xTurn ? (squares.innerHTML = "X") : (squares.innerHTML = "O");
          turn++;
        }
        gameBoard.setArrayIndex(squares.dataset.square, activePlayer.role);
        checkForWinner(squares.dataset.square);
        if (winner) {
          return;
        } else if (turn === 9) {
          winnerAnnouncement();
        } else {
          xTurn = !xTurn;
          updateActivePlayer();
          announceActivePlayer(activePlayer.name);
        }
        console.log(gameBoard.board);
      });
    });
  })();

  function updateActivePlayer() {
    activePlayer.name === player1.name
      ? (activePlayer = player2)
      : (activePlayer = player1);
  }

  function announceActivePlayer(name) {
    const alertMessage = document.querySelector(".alert-messages");
    alertMessage.innerHTML = `${name}'s turn`;
  }

  function checkForWinner(moveIndex) {
    var matchedArrays = gameBoard.winningArrays.filter(function (innerArray) {
      return innerArray.every(function (arrayIndex) {
        return gameBoard.getMove(moveIndex) === gameBoard.getMove(arrayIndex);
      });
    });
    if (matchedArrays.length >= 1) {
      winner = true;
      winnerAnnouncement();
    } else {
      return;
    }
  }

  function winnerAnnouncement() {
    const alertMessage = document.querySelector(".alert-messages");
    if (winner) {
      alertMessage.innerHTML = `${activePlayer.name} WINS!`;
    } else {
      alertMessage.innerHTML = `DRAW GAME. Neither ${player1.name} or ${player2.name} wins.`;
    }
  }

  const gameReset = (function gameReset() {
    const resetButton = document.querySelector(".reset");
    resetButton.addEventListener("click", (e) => {
      for (i = 0; i < gameBoard.board.length; i++) {
        gameBoard.board[i] = "";
        domElements.boardSq.forEach((sq) => {
          sq.innerHTML = null;
          turn = 0;
          xTurn = true;
        });
      }
      let roleSelectors = document.querySelectorAll(".role-selection");
      for (i = 0; i < roleSelectors.length; i++) {
        roleSelectors[i].checked = false;
      }
    });
  })();

  function confirmActive() {
    if (player1.role === "X") {
      announceActivePlayer(player1.name);
      activePlayer = personFactory(player1.name, "X");
    } else {
      announceActivePlayer(player2.name);
      activePlayer = personFactory(player2.name, "X");
    }
  }

  function formValidation() {
    const nameInput = document.querySelectorAll("input[type=text]");
    //need to add form validation here
    for (i = 0; i < nameInput.length; i++) {
      if (nameInput[i].validity.valueMissing) {
        nameInput[i].classList.add("invalid-name-input");
        domElements.alertMessage.innerHTML = "";
        domElements.alertMessage.classList = "alert-messages-error";
      } else {
        nameInput[i].classList.remove("invalid-name-input");
        domElements.alertMessage.classList = "alert-messages";
      }
    }
    if (
      (domElements.p1RoleX.checked && domElements.p2RoleX.checked) ||
      (domElements.p1RoleY.checked && domElements.p2RoleY.checked)
    ) {
      domElements.alertMessage.innerHTML = "";
      domElements.alertMessage.classList = "alert-messages-radio";
    }
    validGame = true;
  }
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
