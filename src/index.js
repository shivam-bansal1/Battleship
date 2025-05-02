import "./styles.css";
import { placeShipsRandomly, startGame } from "./js/gameController.js";
import { Player } from "./js/factories/playerFactory.js";
import {
  renderGameboards,
  showShipsOnBoard,
  renderGameStartDialog,
} from "./js/DOM.js";

function renderMainPage(playerOne, playerTwo) {
  renderGameboards();
  placeShipsRandomly(playerTwo);
  showShipsOnBoard(playerOne, "first-board");
}

let playerOne, playerTwo;
export function getPlayerOne() {
  return playerOne;
}
export function getPlayerTwo() {
  return playerTwo;
}

export let intialDefenderBoard = "second-board";
export let intialAttackerBoard = "first-board";

export function intializeGame() {
  playerOne = new Player("Shivam", "human");
  playerTwo = new Player("Computer");

  renderGameStartDialog(playerOne, "first-board");
  renderMainPage(playerOne, playerTwo);
  startGame();
}

intializeGame();
