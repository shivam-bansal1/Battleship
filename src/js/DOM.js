function generateSquares(whichBoard) {
  const gameboardContainer = document.querySelector(`#${whichBoard}`);
  for (let row = 0; row < 10; row++) {
    for (let col = 1; col <= 10; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.id = `${String.fromCharCode(65 + row)}${col}`;
      gameboardContainer.appendChild(square);
    }
  }
}

export function renderGameboards() {
  generateSquares("first-board");
  generateSquares("second-board");
}

export function showShipsOnBoard(player, whichBoard) {
  const gameBoardContainer = document.querySelector(`#${whichBoard}`);

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = player.board.board[row][col];

      if (cell) {
        const cellID = `${String.fromCharCode(65 + row)}${col + 1}`;
        const domCell = gameBoardContainer.querySelector(
          `.square[data-id="${cellID}"]`,
        );
        domCell.classList.add("ship");
      }
    }
  }
}

function showMissedCells(player, playerBoard) {
  const missedShortsCoordinates = player.board.missedShots;

  missedShortsCoordinates.forEach(([row, col]) => {
    const cellID = `${String.fromCharCode(65 + row)}${col + 1}`;
    const domCell = playerBoard.querySelector(`.square[data-id="${cellID}"]`);
    domCell.classList.add("missed-square");
  });
}

function showDamagedCells(player, playerBoard) {
  const landedShortsCoordinates = player.board.landedShots;

  landedShortsCoordinates.forEach(([row, col]) => {
    const cellID = `${String.fromCharCode(65 + row)}${col + 1}`;
    const domCell = playerBoard.querySelector(`.square[data-id="${cellID}"]`);
    domCell.classList.add("damaged-square");
  });
}

function updateHealth(player, whichBoard) {
  const updatedScore = player.board.calculateHealth();
  console.log(updatedScore);
  let healthContainer;
  if (whichBoard === "first-board")
    healthContainer = document.querySelector("#first-player-health");
  else healthContainer = document.querySelector("#second-player-health");

  console.log(healthContainer);
  healthContainer.textContent = updatedScore + " ";
  const heartSymbol = document.createElement("i");
  heartSymbol.classList.add("heart-symbol", "fa-regular", "fa-heart");
  healthContainer.appendChild(heartSymbol);
}

export function updateGameboard(player, whichBoard) {
  const playerBoard = document.querySelector(`#${whichBoard}`);

  showMissedCells(player, playerBoard);
  showDamagedCells(player, playerBoard);
  updateHealth(player, whichBoard);
}
