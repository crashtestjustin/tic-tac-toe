const gameBoard = {
  // moves = [x, o];
};

const gameController = {};

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
