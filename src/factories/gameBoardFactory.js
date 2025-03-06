import { Ship } from "./shipFactory";

export class GameBoard {
  constructor() {
    this.grid = Array.from({ length: 9 }, () => Array(9).fill(null));
  }

  liesOutsideGrid(length, startingRow, startingCol) {
    if (
      startingRow + length > 9 ||
      startingRow < 0 ||
      startingCol + length > 9 ||
      startingCol < 0
    )
      return true;
    return false;
  }

  placeShip(length, startingRow, startingCol, orientation) {
    let newShip = new Ship(length);

    if (this.liesOutsideGrid(length, startingRow, startingCol)) return false;

    if (orientation === "vertical") {
      for (let i = 0; i < length; i++) {
        if (this.grid[startingRow + i][startingCol] !== null) return false;
        else {
          this.grid[startingRow + i][startingCol] = newShip;
        }
      }
      return true;
    } else {
      for (let i = 0; i < length; i++) {
        if (this.grid[startingRow][startingCol + i] !== null) return false;
        else {
          this.grid[startingRow][startingCol + i] = newShip;
        }
      }
      return true;
    }
  }
}
