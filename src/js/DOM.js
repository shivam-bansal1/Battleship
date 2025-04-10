export const intialDefender = "second-board";

function generateSquares(whichBoard) {
  const gameboardContainer = document.querySelector(`#${whichBoard}`);
  for (let row = 0; row < 10; row++) {
    for (let col = 1; col <= 10; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.id = `${String.fromCharCode(65 + row)}${col}`;
      gameboardContainer.appendChild(square);
    }
  }
}

export function renderGameboards() {
  generateSquares("first-board");
  generateSquares("second-board");
}

export function showShipsOnBoard(player, whichBoard) {
  const gameBoardContainer = document.querySelector(`#${whichBoard}`);

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = player.board.board[row][col];

      if (cell) {
        const cellID = `${String.fromCharCode(65 + row)}${col + 1}`;
        const domCell = gameBoardContainer.querySelector(
          `.square[data-id="${cellID}"]`,
        );
        domCell.classList.add("ship");
      }
    }
  }
}
