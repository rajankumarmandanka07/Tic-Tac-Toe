import { Game } from "./modules/controller/game.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(10);
  game.start();
});
