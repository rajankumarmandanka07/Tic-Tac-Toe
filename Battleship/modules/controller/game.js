import { Battlefield } from "./battleField.js";
import { UIHandler } from "../management/uiHandler.js";
import { GameLogic } from "../management/gameLogic.js";

class Game {
  constructor(battlefieldSize) {
    this.battlefield = new Battlefield(battlefieldSize, "battlefield");
    this.uiHandler = new UIHandler("instruction", "results");
    this.logic = new GameLogic(this.battlefield, this.uiHandler, "next-turn");
  }

  start() {
    this.battlefield.create();
  }
}

export { Game };