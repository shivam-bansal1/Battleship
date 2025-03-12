export function placeShipsRandomly(player) {
  const shipLengths = [5, 4, 3, 3, 2];
  const orientations = ["vertical", "horizontal"];

  shipLengths.forEach((length) => {
    let placed = false;

    while (!placed) {
      const row = Math.floor(Math.random() * 9);
      const column = Math.floor(Math.random() * 9);
      const orientation = orientations[Math.floor(Math.random() * 2)];

      placed = player.board.placeShip(length, row, column, orientation);
    }
  });
}
