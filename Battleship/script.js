class Battlefield {
  constructor(size, containerId) {
    this.size = size;
    this.totalShips = size * size;
    this.battlefieldElement = document.getElementById(containerId);
    this.ships = [];
  }

  create() {
    for (let i = 0; i < this.totalShips; i++) {
      const ship = document.createElement("div");
      ship.classList.add("ship");
      ship.dataset.index = i;
      this.battlefieldElement.appendChild(ship);
      this.ships.push(ship);
    }
  }

  reset() {
    this.battlefieldElement.innerHTML = "";
    this.ships = [];
    this.create();
  }
}

class GameLogic {
  constructor(battlefield, instructionId, resultsId, nextTurnButtonId) {
    this.battlefield = battlefield;
    this.instructionElement = document.getElementById(instructionId);
    this.resultsElement = document.getElementById(resultsId);
    this.nextTurnButton = document.getElementById(nextTurnButtonId);

    this.currentPlayer = 1;
    this.player1Ships = new Set();
    this.player2Hits = new Set();
    this.totalHits = 0;
    this.totalMisses = 0;

    this.nextTurnButton.addEventListener("click", () => this.handleNextTurn());
    this.battlefield.battlefieldElement.addEventListener("click", event => this.handleShipClick(event));
  }

  handleShipClick(event) {
    const ship = event.target;
    if (!ship.classList.contains("ship") || ship.classList.contains("hit") || ship.classList.contains("miss")) return;

    const shipIndex = ship.dataset.index;

    if (this.currentPlayer === 1) {
      this.placeShip(ship, shipIndex);
    } else if (this.currentPlayer === 2) {
      this.attackShip(ship, shipIndex);
    }
  }

  placeShip(ship, shipIndex) {
    if (!ship.classList.contains("place")) {
      ship.classList.add("place");
      this.player1Ships.add(shipIndex);
    } else {
      ship.classList.remove("place");
      this.player1Ships.delete(shipIndex);
    }
    this.nextTurnButton.disabled = this.player1Ships.size === 0;
  }

  attackShip(ship, shipIndex) {
    if (this.player1Ships.has(shipIndex)) {
      ship.classList.add("hit");
      this.player2Hits.add(shipIndex);
      this.totalHits++;
      this.player1Ships.delete(shipIndex);
    } else {
      ship.classList.add("miss");
      this.totalMisses++;
    }

    if (this.player1Ships.size === 0) {
      this.endGame();
    }
  }

  
}

class Game {
  constructor(battlefieldSize) {
    this.battlefield = new Battlefield(battlefieldSize, "battlefield");
    this.logic = new GameLogic(this.battlefield, "instruction", "results", "next-turn");
  }

  start() {
    this.battlefield.create();
  }
}

// Initialize the game
const game = new Game(10);
game.start();