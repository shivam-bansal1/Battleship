import { Ship } from "../factories/shipFactory";

describe("Ship Hit Test", () => {
  let ship;

  beforeAll(() => {
    ship = new Ship(3);
  });

  test("should register a hit", () => {
    ship.hit(2);
    expect(ship.damaged).toBe(1);
  });

  test("should register two hits", () => {
    ship.hit(0);
    expect(ship.damaged).toBe(2);
  });

  test("Rehit same cell", () => {
    ship.hit(2);
    expect(ship.damaged).toBe(2);
  });

  test("Ship not sunked test", () => {
    expect(ship.isSunk()).toBe(false);
  });

  test("should register three hits", () => {
    ship.hit(1);
    expect(ship.damaged).toBe(3);
  });

  test("Ship sunked test", () => {
    expect(ship.isSunk()).toBe(true);
  });
});
