export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.hasSunked = false;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    this.hasSunked = true ? this.hits >= this.length : false;
    return this.hasSunked;
  }
}
