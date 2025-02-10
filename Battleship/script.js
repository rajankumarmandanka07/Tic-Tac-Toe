import { Game } from "./modules/game.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(10);
  game.start();
});
