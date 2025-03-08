import { GameBoard } from "../factories/gameBoardFactory";

describe("GameBoard Tests", () => {
  let board;
  beforeAll(() => {
    board = new GameBoard();
  });

  // Ship Placement Tests
  test("Place ship vertically", () => {
    expect(board.placeShip(4, 2, 2, "vertical")).toBe(true);
  });
  test("Doesn't overlap ships", () => {
    expect(board.placeShip(4, 2, 2, "horizontal")).toBe(false);
  });
  test("Place ship horizontally", () => {
    expect(board.placeShip(3, 5, 6, "horizontal")).toBe(true);
  });
  test("Doesn't place outside gameboard 1", () => {
    expect(board.placeShip(2, 9, 9, "horizontal")).toBe(false);
  });
  test("Doesn't place outside gameboard 2", () => {
    expect(board.placeShip(2, -3, 5, "horizontal")).toBe(false);
  });

  // Ship Attack Tests
  test("Doesn't attck ship outside gameboard", () => {
    expect(board.recieveAttack(10, -4)).toBe(false);
  });

  test("Attack empty cell", () => {
    expect(board.recieveAttack(1, 1)).toBe(true);
  });

  test("Attack missed shot cell", () => {
    expect(board.recieveAttack(1, 1)).toBe(false);
  });

  test("Attack ship", () => {
    expect(board.recieveAttack(2, 2)).toBe(true);
  });

  test("Attack ship different cell", () => {
    expect(board.recieveAttack(3, 2)).toBe(true);
  });

  test("Attack ship same cell", () => {
    expect(board.recieveAttack(2, 2)).toBe(false);
  });

  test("Attack another ship", () => {
    expect(board.recieveAttack(5, 8)).toBe(true);
  });
});
