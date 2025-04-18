function generateSquares(whichBoard) {
  const gameboardContainer = document.querySelector(`#${whichBoard}`);
  for (let row = 0; row <= 10; row++) {
    for (let col = 0; col <= 10; col++) {
      const square = document.createElement("div");
      if (row === 0 && col === 0) {
        square.classList.add("cell-header");
        square.textContent = "";
      } else if (row !== 0 && col === 0) {
        square.classList.add("cell-header");
        square.textContent = `${String.fromCharCode(64 + row)}`;
        square.dataset.id = `${String.fromCharCode(64 + row)}`;
      } else if (row === 0 && col !== 0) {
        square.classList.add("cell-header");
        square.textContent = col;
        square.dataset.id = col;
      } else {
        square.classList.add("square");
        square.dataset.id = `${String.fromCharCode(64 + row)}${col}`;
      }
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

export function showSunkShips(player, whichBoard, whichShip) {
  const playerBoard = document.querySelector(`#${whichBoard}`);
  const landedShortsCoordinates = player.board.landedShots;

  landedShortsCoordinates.forEach(([row, col]) => {
    if (player.board.board[row][col] === whichShip) {
      const cellID = `${String.fromCharCode(65 + row)}${col + 1}`;
      const domCell = playerBoard.querySelector(`.square[data-id="${cellID}"]`);
      domCell.classList.add("sunk-square");
    }
  });
}

function updateHealth(player, whichBoard) {
  const updatedScore = player.board.calculateHealth();
  let healthContainer;
  if (whichBoard === "first-board")
    healthContainer = document.querySelector("#first-player-health");
  else healthContainer = document.querySelector("#second-player-health");

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

export function displayEventLog(firstMsg, secondMsg, whichEvent, turnNumber) {
  const eventsContainer = document.querySelector(".event-log");

  const eventElement = document.createElement("div");
  eventElement.className = "event";

  const turnElement = document.createElement("p");
  turnElement.className = "turn";
  turnElement.textContent = turnNumber;

  const messageElement = document.createElement("p");
  messageElement.classList.add("event-description", `${whichEvent}-event`);
  messageElement.innerHTML = `${firstMsg} <br> ${secondMsg}`;

  eventElement.appendChild(turnElement);
  eventElement.appendChild(messageElement);

  eventsContainer.prepend(eventElement);
}
