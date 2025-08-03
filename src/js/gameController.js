import {
  updateGameboard,
  displayEventLog,
  showSunkShips,
  renderGameOverDialog,
} from "./DOM";
import {
  getPlayerOne,
  getPlayerTwo,
  intialDefenderBoard,
  intialAttackerBoard,
} from "../index";

import { eventLog } from "./factories/eventFactory";
const logger = new eventLog();

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

function shipHitCheck(row, col, board) {
  const hitCoordinates = board.landedShots;
  return hitCoordinates.some(([r, c]) => {
    return row === r && col === c;
  });
}

function fetchEventMessage(attacker, row, col, event) {
  const { firstMessage, secondMessage } = logger.getMessage(
    attacker,
    row,
    col,
    event,
  );
  displayEventLog(firstMessage, secondMessage, event, logger.getMoveNumber());
  logger.incrementMoveNumber();
}

function stopGame() {
  let renderedBoard = document.querySelector(`#${intialDefenderBoard}`);
  let updatedBoard = renderedBoard.cloneNode(true);
  renderedBoard.parentNode.replaceChild(updatedBoard, renderedBoard);
}

function playerMove(attacker, defender, whichBoard = intialDefenderBoard) {
  const defenderBoard = document.querySelector(`#${whichBoard}`);

  // Remove previous listener by replacing node (clean slate)
  const newBoard = defenderBoard.cloneNode(true);
  defenderBoard.parentNode.replaceChild(newBoard, defenderBoard);

  // Attach listener again
  newBoard.addEventListener("click", function onBoardClick(event) {
    const cell = event.target;
    if (!cell.classList.contains("square")) return;

    const cellNumber = cell.getAttribute("data-id");
    if (!cellNumber) return;

    const row = cellNumber.charCodeAt(0) - 65;
    const column = parseInt(cellNumber.slice(1)) - 1;

    handlePlayerAttack(row, column, attacker, defender, whichBoard);
    updateGameboard(defender, whichBoard);
  });
}

export function handlePlayerAttack(row, col, attacker, defender, whichBoard) {
  const successfulAttack = defender.board.receiveAttack(row, col);
  if (!successfulAttack) return;

  const shipHit = shipHitCheck(row, col, defender.board);
  const [shipDestroyed, whichShip] = defender.board.shipSunk(row, col);

  let allShipsHit = defender.board.allShipsSunked();
  if (allShipsHit) {
    fetchEventMessage(attacker.playerName, row, col, "win");
    showSunkShips(defender, whichBoard, whichShip);
    stopGame();
    renderGameOverDialog(
      attacker.playerName,
      defender.board.missedShots.length + defender.board.landedShots.length,
      attacker.board.missedShots.length + attacker.board.landedShots.length,
    );
  } else if (shipDestroyed) {
    fetchEventMessage(attacker.playerName, row, col, "sunk");
    showSunkShips(defender, whichBoard, whichShip);
    playerMove(attacker, defender);
  } else if (shipHit) {
    fetchEventMessage(attacker.playerName, row, col, "hit");
    playerMove(attacker, defender);
  } else {
    fetchEventMessage(attacker.playerName, row, col, "miss");
    switchPlayerTurn(attacker);
  }
}

function switchPlayerTurn(previousAttacker) {
  let newAttacker, newDefender;

  if (previousAttacker === getPlayerOne()) {
    newAttacker = getPlayerTwo();
    newDefender = getPlayerOne();
  } else {
    newAttacker = getPlayerOne();
    newDefender = getPlayerTwo();
  }

  if (newAttacker.playerType === "computer") {
    setTimeout(() => {
      computerMove(newAttacker, newDefender);
    }, 500);
  } else {
    playerMove(newAttacker, newDefender);
  }
}

function computerMove(attacker, defender, whichBoard = intialAttackerBoard) {
  const [row, col] = handleComputerAttack(defender);
  updateGameboard(defender, whichBoard);

  const shipHit = shipHitCheck(row, col, defender.board);
  const [shipDestroyed, whichShip] = defender.board.shipSunk(row, col);

  if (defender.board.allShipsSunked()) {
    showSunkShips(defender, whichBoard, whichShip);
    fetchEventMessage(attacker.playerName, row, col, "win");
    stopGame();
    renderGameOverDialog(
      attacker.playerName,
      defender.board.missedShots.length + defender.board.landedShots.length,
      attacker.board.missedShots.length + attacker.board.landedShots.length,
    );
  } else if (shipDestroyed) {
    fetchEventMessage(attacker.playerName, row, col, "sunk");
    handleComputerAttack(defender);
    updateGameboard(defender, whichBoard);
    showSunkShips(defender, whichBoard, whichShip);
  } else if (shipHit) {
    fetchEventMessage(attacker.playerName, row, col, "hit");
    handleComputerAttack(defender);
    updateGameboard(defender, whichBoard);
  } else {
    fetchEventMessage(attacker.playerName, row, col, "miss");
    switchPlayerTurn(attacker);
  }

  return;
}

function handleComputerAttack(defender) {
  let row, col;
  do {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  } while (!defender.board.receiveAttack(row, col));

  return [row, col];
}

export function startGame() {
  playerMove(getPlayerOne(), getPlayerTwo());
}
