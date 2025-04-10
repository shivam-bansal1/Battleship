import "./styles.css";
import { placeShipsRandomly, startGame } from "./js/gameController.js";
import { Player } from "./js/factories/playerFactory.js";
import { renderGameboards, showShipsOnBoard } from "./js/DOM.js";

function renderMainPage(playerOne, playerTwo) {
  renderGameboards();

  placeShipsRandomly(playerOne);
  placeShipsRandomly(playerTwo);

  showShipsOnBoard(playerOne, "first-board");
  showShipsOnBoard(playerTwo, "second-board");
}

export const playerOne = new Player("Shivam", "human");
export const playerTwo = new Player("AI");

renderMainPage(playerOne, playerTwo);

startGame();
