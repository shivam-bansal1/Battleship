import { experiments } from "webpack";
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
    expect(board.receiveAttack(10, -4)).toBe(false);
  });

  test("Attack empty cell", () => {
    expect(board.receiveAttack(1, 1)).toBe(true);
  });

  test("Attack missed shot cell", () => {
    expect(board.receiveAttack(1, 1)).toBe(false);
  });

  test("Attack ship", () => {
    expect(board.receiveAttack(2, 2)).toBe(true);
  });

  test("Attack ship different cell", () => {
    expect(board.receiveAttack(3, 2)).toBe(true);
  });

  test("Attack ship same cell", () => {
    expect(board.receiveAttack(2, 2)).toBe(false);
  });

  test("Attack another ship", () => {
    expect(board.receiveAttack(5, 8)).toBe(true);
  });

  // All ships sunk
  test("All ships not sunked", () => {
    expect(board.allShipsSunked()).toBe(false);
  });

  test("All ships sunked", () => {
    board.receiveAttack(4, 2);
    board.receiveAttack(5, 2);
    board.receiveAttack(5, 6);
    board.receiveAttack(5, 7);
    expect(board.allShipsSunked()).toBe(true);
  });
});
