import { intializeGame } from "../index";

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

export function renderGameOverDialog(winner, winnerMoves, loserMoves) {
  const dialogBox = document.querySelector("#game-over-dialog");

  const winnerElement = dialogBox.querySelector(".winner.value");
  winnerElement.textContent = winner;
  const winnerMovesElement = dialogBox.querySelector(".winner-moves.value");
  winnerMovesElement.textContent = winnerMoves;
  const loseMovesElement = dialogBox.querySelector(".loser-moves.value");
  loseMovesElement.textContent = loserMoves;

  dialogBox.showModal();
  document.querySelector("body").style.opacity = 0.09;

  const newGameButton = document.querySelector("#new-game-button");
  newGameButton.addEventListener("click", () => {
    dialogBox.close();
    document.querySelector("body").style.opacity = 1;

    document.querySelector("#first-board").innerHTML = "";
    document.querySelector("#second-board").innerHTML = "";
    document.querySelector(".event-log").innerHTML = "";
    document.querySelector("#first-player-health").innerHTML = "";
    document.querySelector("#second-player-health").innerHTML = "";

    intializeGame();
  });
}

export function renderGameStartDialog(player, whichBoard) {
  const dialogBox = document.querySelector("#game-start-dialog");
  const startDialogBoard = dialogBox.querySelector("#start-dialog-board");
  startDialogBoard.innerHTML = "";
  generateSquares("start-dialog-board");

  // Show player's ships in dialog
  showShipsOnBoard(player, "start-dialog-board");

  dialogBox.showModal();
  document.querySelector("body").style.opacity = 0.05;

  renderDraggableShips();
  allowShipsDrop(player, startDialogBoard);

  const startButton = dialogBox.querySelector("#start-button");
  startButton.addEventListener("click", () => {
    const mainBoard = document.querySelector(`#${whichBoard}`);

    // Transfer DOM nodes from dialog board to main board
    mainBoard.innerHTML = "";
    Array.from(startDialogBoard.children).forEach((child) => {
      mainBoard.appendChild(child.cloneNode(true));
    });

    dialogBox.close();
    document.querySelector("body").style.opacity = 1;
  });
}

function renderDraggableShips() {
  const orientationCheckBox = document.querySelector("#orientation-check");
  const shipPanel = document.querySelector(".ships-panel");

  function renderShips(orientation) {
    shipPanel.innerHTML = "";
    shipPanel.className = "";
    shipPanel.classList.add("ships-panel", orientation);

    const shipLength = [5, 4, 3, 3, 2];
    shipLength.forEach((length) => {
      const ship = document.createElement("div");
      ship.classList.add("draggable-ship", orientation);
      ship.style.setProperty("--length", length);
      ship.setAttribute("draggable", true);
      ship.dataset.length = length;

      for (let i = 0; i < length; i++) {
        const square = document.createElement("div");
        square.classList.add("draggable-square");
        square.dataset.offset = i;
        ship.appendChild(square);
      }

      ship.addEventListener("dragstart", (event) => {
        ship.classList.add("dragging");
        event.dataTransfer.setData("text/plain", ship.dataset.length);
      });

      ship.addEventListener("dragend", () => {
        ship.classList.remove("dragging");
      });

      ship.querySelectorAll(".draggable-square").forEach((square) => {
        square.addEventListener("mousedown", (e) => {
          ship.dataset.offset = e.target.dataset.offset;
        });
      });
      shipPanel.appendChild(ship);
    });
  }

  // Initial render
  renderShips(orientationCheckBox.checked ? "horizontal" : "vertical");

  // Re-render on toggle
  orientationCheckBox.addEventListener("change", (e) => {
    const newOrientation = e.target.checked ? "horizontal" : "vertical";
    renderShips(newOrientation);
  });
}

function allowShipsDrop(player, startDialogBoard) {
  // Add dragover and drop listeners to each square
  const squares = startDialogBoard.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("dragover", (e) => e.preventDefault());

    square.addEventListener("drop", (e) => {
      e.preventDefault();

      const draggedShip = document.querySelector(".dragging");
      if (!draggedShip) return;

      const length = parseInt(draggedShip.dataset.length);
      const orientation = draggedShip.classList.contains("horizontal")
        ? "horizontal"
        : "vertical";

      const targetId = square.dataset.id;
      const row = targetId.charCodeAt(0) - 65;
      const col = parseInt(targetId.slice(1)) - 1;

      const offset = parseInt(draggedShip.dataset.offset || 0);
      let adjustedRow = row,
        adjustedCol = col;

      if (orientation == "vertical") adjustedRow = parseInt(row) - offset;
      else adjustedCol = col - offset;

      // Attempt to place the ship on the logical board
      const success = player.board.placeShip(
        length,
        adjustedRow,
        adjustedCol,
        orientation,
      );

      if (success) {
        showShipsOnBoard(player, "start-dialog-board");
        draggedShip.remove();
      } else {
        alert("Invalid placement!");
      }
    });
  });
}
