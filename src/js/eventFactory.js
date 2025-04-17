export class eventLog {
  constructor() {
    this.attackVerbs = [
      "charges at",
      "strikes",
      "bombards",
      "storms",
      "invades",
      "attacks",
      "raids",
      "assaults",
      "fires at",
      "assaults",
    ];

    this.hitVerbs = ["hits", "smashes", "slams", "damages", "blows"];

    this.sinkVerbs = [
      "goes down",
      "falls",
      "knocks out",
      "sinks",
      "vanishes",
      "is destroyed",
      "is obliterated",
    ];

    this.missVerbs = [
      "slips",
      "misses",
      "fails",
      "hits the ocean",
      "goes over ships",
    ];

    this.missPhrases = [
      "Better luck next time",
      "Hang in there",
      "Unlucky",
      "Hard Luck",
      "Wrong guess",
    ];

    this.gameOverPhrases = [
      "wins",
      "conqueres",
      "is victorious",
      "prevails",
      "beats the opponenet",
      "takes the cup home",
    ];
  }

  getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  getMessage(attacker, row, col, whichEvent) {
    let firstMessage, secondMessage;
    const cellID = `${String.fromCharCode(65 + row)}${col + 1}`;

    switch (whichEvent) {
      case "hit":
        firstMessage = `${attacker} ${getRandom(this.attackVerbs)} ${cellID} and ${getRandom(this.hitVerbs)} a ship!`;
        secondMessage = attacker + "gets to strike again.";
        return firstMessage, secondMessage;

      case "miss":
        firstMessage = `${attacker} ${getRandom(this.attackVerbs)} ${cellID} and ${getRandom(this.missVerbs)}.`;
        secondMessage = `${getRandom(this.missPhrases)}, ${attacker}`;
        return firstMessage, secondMessage;

      case "sunk":
        firstMessage = `${attacker} ${getRandom(this.attackVerbs)} ${cellID} and a ship ${getRandom(this.sinkVerbs)}!`;
        secondMessage = attacker + "gets to strike again.";
        return firstMessage, secondMessage;

      case "win":
        firstMessage = `${attacker} ${getRandom(this.attackVerbs)} ${cellID} and a ship ${getRandom(this.sinkVerbs)}!`;
        secondMessage = attacker + getRandom(this.gameOverPhrases);
        return firstMessage, secondMessage;

      default:
        firstMessage = `${attacker} attacked ${cellID}`;
        return firstMessage, "";
    }
  }
}
