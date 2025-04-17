import { updateGameboard, displayEventLog } from "./DOM";
import {
  playerOne,
  playerTwo,
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

function playerMove(attacker, defender, whichBoard = intialDefenderBoard) {
  const defenderBoard = document.querySelector(`#${whichBoard}`);

  if (!defenderBoard.dataset.listenerAttached) {
    defenderBoard.addEventListener("click", onBoardClick);
    defenderBoard.dataset.listenerAttached = "true";
  }

  function onBoardClick(event) {
    const cell = event.target;
    if (!cell.classList.contains("square")) return;

    const cellNumber = cell.getAttribute("data-id");
    if (!cellNumber) return;

    const row = cellNumber.charCodeAt(0) - 65;
    const column = parseInt(cellNumber.slice(1)) - 1;

    handlePlayerAttack(row, column, attacker, defender);
    updateGameboard(defender, whichBoard);
  }
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

export function handlePlayerAttack(row, col, attacker, defender) {
  console.log(`Player tries to hit Row:${row}, Col:${col}`);
  const successfulAttack = defender.board.receiveAttack(row, col);
  if (!successfulAttack) return;

  let allShipsHit = defender.board.allShipsSunked();
  if (allShipsHit) {
    fetchEventMessage(attacker.playerName, row, col, "win");
    console.log(`${attacker.playerName} wins the game !!!`);
    return;
  }
  const shipHit = shipHitCheck(row, col, defender.board);
  if (shipHit) {
    fetchEventMessage(attacker.playerName, row, col, "hit");
    playerMove(attacker, defender);
  } else {
    fetchEventMessage(attacker.playerName, row, col, "miss");
    switchPlayerTurn(attacker);
  }
}

function switchPlayerTurn(previousAttacker) {
  let newAttacker, newDefender;

  if (previousAttacker === playerOne) {
    newAttacker = playerTwo;
    newDefender = playerOne;
  } else {
    newAttacker = playerOne;
    newDefender = playerTwo;
  }

  if (newAttacker.playerType === "computer") {
    setTimeout(computerMove(newAttacker, newDefender), 1000);
  } else {
    playerMove(newAttacker, newDefender);
  }
}

function computerMove(attacker, defender, whichBoard = intialAttackerBoard) {
  const [row, col] = handleComputerAttack(defender);
  updateGameboard(defender, whichBoard);

  if (defender.board.allShipsSunked()) {
    fetchEventMessage(attacker.playerName, row, col, "win");
    console.log(`${defender.playerName} lost the game !!!`);
    return;
  }

  const shipHit = shipHitCheck(row, col, defender.board);
  if (shipHit) {
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
    console.log(`Computer attacking Row:${row}, Column;${col}`);
  } while (!defender.board.receiveAttack(row, col));

  return [row, col];
}

export function startGame() {
  playerMove(playerOne, playerTwo);
}
