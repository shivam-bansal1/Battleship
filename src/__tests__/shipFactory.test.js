import { Ship } from "../factories/shipFactory";

describe("Ship Hit Test", () => {
  let ship;

  beforeAll(() => {
    ship = new Ship(3);
  });

  test("should register a hit", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("should register two hits", () => {
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test("Ship not sunked test", () => {
    expect(ship.isSunk()).toBe(false);
  });

  test("should register three hits", () => {
    ship.hit();
    expect(ship.hits).toBe(3);
  });

  test("Ship sunked test", () => {
    expect(ship.isSunk()).toBe(true);
  });
});
