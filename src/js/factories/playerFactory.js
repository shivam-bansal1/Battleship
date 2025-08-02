import { GameBoard } from "./gameBoardFactory.js";

export class Player {
  constructor(playerName, playerType = "computer") {
    this.playerName = playerName;
    this.playerType = playerType;
    this.board = new GameBoard();
  }

  updateName(name) {
    this.playerName = name;
  }
}
