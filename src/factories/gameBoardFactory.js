import { Ship } from "./shipFactory";

export class GameBoard {
  constructor() {
    this.grid = Array.from({ length: 9 }, () => Array(9).fill(null));
    this.missedShots = [];
    this.landedShots = [];
    this.allShips = [];
  }

  liesOutsideGrid(length, startingRow, startingCol, orientation) {
    if (startingRow < 0 || startingCol < 0) return true;
    if (orientation === "vertical" && startingRow + length > this.grid.length)
      return true;
    if (
      orientation === "horizontal" &&
      startingCol + length > this.grid[0].length
    )
      return true;

    return false;
  }

  placeShip(length, startingRow, startingCol, orientation) {
    let newShip = new Ship(length);

    if (this.liesOutsideGrid(length, startingRow, startingCol, orientation))
      return false;

    if (orientation === "vertical") {
      for (let i = 0; i < length; i++) {
        if (this.grid[startingRow + i][startingCol] !== null) return false;
        else {
          this.grid[startingRow + i][startingCol] = newShip;
          this.allShips.push(newShip);
        }
      }
      return true;
    } else {
      for (let i = 0; i < length; i++) {
        if (this.grid[startingRow][startingCol + i] !== null) return false;
        else {
          this.grid[startingRow][startingCol + i] = newShip;
          this.allShips.push(newShip);
        }
      }
      return true;
    }
  }

  alreadyMissedOnce(row, column) {
    return this.missedShots.some(
      (coord) => coord[0] === row && coord[1] === column,
    );
  }

  findShipAttackedCell(ship, row, column) {
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[r].length; c++) {
        if (this.grid[r][c] === ship) {
          // Check for vertical or horizontal orientation
          if (r + 1 < this.grid.length && this.grid[r + 1][c] === ship) {
            return row - r;
          } else if (
            c + 1 < this.grid[r].length &&
            this.grid[r][c + 1] === ship
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

  recieveAttack(row, column) {
    if (row > 9 || row < 0 || column > 9 || column < 0) return false;
    if (this.alreadyMissedOnce(row, column)) return false;
    if (this.alreadyLandedOnce(row, column)) return false;

    let shipAttacked = this.grid[row][column];

    if (shipAttacked === null) {
      this.grid[row][column] = "Missed";
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
}
