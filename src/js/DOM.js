export function renderGameboards() {
  // const firstBoard = document.querySelector("first-board");
  // const secondBoard = document.querySelector("second-board");

  // cons;
  generateSquares("first-board");
  generateSquares("second-board");
}

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
