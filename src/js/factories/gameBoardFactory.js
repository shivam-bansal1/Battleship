import { Ship } from "./shipFactory.js";

export class GameBoard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.missedShots = [];
    this.landedShots = [];
    this.allShips = [];
  }

  liesOutsideGrid(length, startingRow, startingCol, orientation) {
    if (startingRow < 0 || startingCol < 0) return true;
    if (orientation === "vertical" && startingRow + length > this.board.length)
      return true;
    if (
      orientation === "horizontal" &&
      startingCol + length > this.board[0].length
    )
      return true;

    return false;
  }

  validAdjacentCells(row, col) {
    const boardSize = this.board.length;
    const testCases = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];

    return testCases.some(([x, y]) => {
      const newRow = row + x;
      const newCol = col + y;
      return (
        newRow >= 0 &&
        newRow < boardSize &&
        newCol >= 0 &&
        newCol < boardSize &&
        this.board[newRow][newCol] !== null
      );
    });
  }

  skipAdjacentShips(length, startingRow, startingCol, orientation) {
    for (let i = 0; i < length; i++) {
      const row = orientation === "vertical" ? startingRow + i : startingRow;
      const column =
        orientation === "horizontal" ? startingCol + i : startingCol;
      if (this.validAdjacentCells(row, column)) return true;
    }
    return false;
  }

  placeShip(length, startingRow, startingCol, orientation) {
    let newShip = new Ship(length);

    if (this.liesOutsideGrid(length, startingRow, startingCol, orientation))
      return false;

    if (this.skipAdjacentShips(length, startingRow, startingCol, orientation))
      return false;

    if (orientation === "vertical") {
      for (let i = 0; i < length; i++) {
        if (this.board[startingRow + i][startingCol] !== null) return false;
        else {
          this.board[startingRow + i][startingCol] = newShip;
        }
      }
      this.allShips.push(newShip);
      return true;
    } else {
      for (let i = 0; i < length; i++) {
        if (this.board[startingRow][startingCol + i] !== null) return false;
        else {
          this.board[startingRow][startingCol + i] = newShip;
        }
      }
      this.allShips.push(newShip);
      return true;
    }
  }

  alreadyMissedOnce(row, column) {
    return this.missedShots.some(
      (coord) => coord[0] === row && coord[1] === column,
    );
  }

  findShipAttackedCell(ship, row, column) {
    for (let r = 0; r < this.board.length; r++) {
      for (let c = 0; c < this.board[r].length; c++) {
        if (this.board[r][c] === ship) {
          // Check for vertical or horizontal orientation
          if (r + 1 < this.board.length && this.board[r + 1][c] === ship) {
            return row - r;
          } else if (
            c + 1 < this.board[r].length &&
            this.board[r][c + 1] === ship
          ) {
            return column - c;
          }
        }
      }
    }
    return -1; // Ship not present
  }

  alreadyLandedOnce(row, column) {
    return this.landedShots.some(([r, c]) => r === row && c === column);
  }

  receiveAttack(row, column) {
    const boardSize = this.board.length;
    if (row > boardSize || row < 0 || column > boardSize || column < 0)
      return false;
    if (this.alreadyMissedOnce(row, column)) return false;
    if (this.alreadyLandedOnce(row, column)) return false;

    let shipAttacked = this.board[row][column];

    if (shipAttacked === null) {
      this.board[row][column] = "Missed";
      this.missedShots.push([row, column]);
      return true;
    } else if (
      shipAttacked !== "Missed" &&
      typeof shipAttacked.hit === "function"
    ) {
      let hitPosition = this.findShipAttackedCell(shipAttacked, row, column);
      if (hitPosition != -1 && shipAttacked.attackedPosition[hitPosition])
        return false; // Already damaged cell
      else {
        shipAttacked.hit(hitPosition);
        this.landedShots.push([row, column]);
        return true;
      }
    }
    return false;
  }

  allShipsSunked() {
    return this.allShips.every((ship) => ship.isSunk());
  }

  calculateHealth() {
    const shipsLengthTotal = this.allShips.reduce((total, currentShip) => {
      return total + currentShip.length;
    }, 0);

    const totalHits = this.landedShots.length;
    const health = Math.floor(
      ((shipsLengthTotal - totalHits) / shipsLengthTotal) * 100,
    );

    return health;
  }
}
