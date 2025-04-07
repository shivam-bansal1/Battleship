import "./styles.css";
import { placeShipsRandomly } from "./js/gameController.js";
import { Player } from "./js/factories/playerFactory.js";
import { renderGameboards, showShipsOnBoard } from "./js/DOM.js";

function renderMainPage() {
  renderGameboards();

  const playerOne = new Player("Shivam", "human");
  const playerTwo = new Player("AI");

  placeShipsRandomly(playerOne);
  playerOne.board.board.forEach((row) =>
    console.log(row.map((cell) => (cell ? "S" : "-")).join(" ")),
  );

  placeShipsRandomly(playerTwo);

  showShipsOnBoard(playerOne, "first-board");
}

renderMainPage();
