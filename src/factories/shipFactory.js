export class Ship {
  constructor(length) {
    this.length = length;
    this.attackedPosition = Array(this.length).fill(false);
    this.damaged = 0;
    this.hasSunked = false;
  }

  hit(position) {
    if (
      position >= 0 &&
      position < this.length &&
      !this.attackedPosition[position]
    ) {
      this.attackedPosition[position] = true;
      this.damaged = this.attackedPosition.filter(
        (attacked) => attacked === true,
      ).length;
    }

    return this.damaged;
  }

  isSunk() {
    this.hasSunked = this.damaged >= this.length;
    return this.hasSunked;
  }
}
