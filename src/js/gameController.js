export function placeShipsRandomly(player) {
  const shipLengths = [5, 4, 3, 3, 2];
  const orientations = ["vertical", "horizontal"];

  shipLengths.forEach((length) => {
    let placed = false;

    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const orientation = orientations[Math.floor(Math.random() * 2)];

      placed = player.board.placeShip(length, row, column, orientation);
    }
  });
}

export function handleAttack(row, col, attacker, defender) {
  const successfulAttack = defender.board.receiveAttack(row, col);

  if (!successfulAttack) return false;

  if (attacker.board.allShipsSunked)
    console.log(`${defender.playerName} wins the game !!!`);
  else switchPlayerTurn();

  return true;
}

function switchPlayerTurn(playerOne, playerTwo) {
  let currentPlayer = playerOne;

  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  if (currentPlayer.playerType === "computer") {
    setTimeout(computerMove(), 1000);
  }
}

function computerMove(currentPlayer, playerOne, playerTwo) {
  let row, col;
  do {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  } while (!currentPlayer.board.receiveAttack(row, col));

  if (currentPlayer.allShipsSunked()) {
    console.log(`${currentPlayer.playerName} lose the game !!!`);
  } else {
    switchPlayerTurn(playerOne, playerTwo);
  }
}
