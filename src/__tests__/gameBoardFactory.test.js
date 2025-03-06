import { GameBoard } from "../factories/gameBoardFactory";

describe("GameBoard Tests", () => {
  let board;
  beforeAll(() => {
    board = new GameBoard();
  });

  test("Place ship vertically", () => {
    expect(board.placeShip(4, 2, 2, "vertical")).toBe(true);
  });
  test("Doesn't overlap ships", () => {
    expect(board.placeShip(4, 2, 2, "horizontal")).toBe(false);
  });
  test("Place ship horizontally", () => {
    expect(board.placeShip(3, 5, 8, "horizontal")).toBe(false);
  });
  test("Doesn't place outside gameboard 1", () => {
    expect(board.placeShip(2, 9, 9, "horizontal")).toBe(false);
  });
  test("Doesn't place outside gameboard 2", () => {
    expect(board.placeShip(2, -3, 5, "horizontal")).toBe(false);
  });
});
