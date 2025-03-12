import "./styles.css";
import { placeShipsRandomly } from "./js/gameController.js";
import { Player } from "./js/factories/playerFactory.js";

const playerOne = new Player("Shivam", "human");
const playerTwo = new Player("AI");

placeShipsRandomly(playerOne);
placeShipsRandomly(playerTwo);

function printBoard(board) {
  board.grid.forEach((row, rowIndex) => {
    console.log(
      `Row ${rowIndex}:`,
      row.map((cell) => (cell ? "S" : ".")), // S for Ship, . for empty
    );
  });
}

console.log("Player One's Board:");
printBoard(playerOne.board);
console.log(playerOne.board.allShips);

console.log("Player Two's Board:");
printBoard(playerTwo.board);
