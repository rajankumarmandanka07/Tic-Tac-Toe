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

class GamePlay {
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
    this.battlefield.battlefieldElement.addEventListener("click", event => this.playerMove(event));
  }

  playerMove(event) {
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

  handleNextTurn() {
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
      this.instructionElement.textContent = "Player 2: Attack Player 1's ships.";
      this.nextTurnButton.disabled = true;

      this.battlefield.ships.forEach(ship => ship.classList.remove("place"));
    }
  }

  endGame() {
    this.instructionElement.textContent = "Game Over!";

    this.resultsElement.style.display = "block";

    this.resultsElement.innerHTML = `
      <h2>Results:</h2>
      <p>Total Hits: ${this.totalHits}</p>
      <p>Total Misses: ${this.totalMisses}</p>
    `;
    this.nextTurnButton.disabled = true;

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.className = "btn btn-success btn-lg mt-3";
    restartButton.addEventListener("click", () => this.restartGame());
    this.resultsElement.appendChild(restartButton);

    this.battlefield.battlefieldElement.removeEventListener("click", event => this.playerMove(event));

    // Disable all ships
    const ships = this.battlefield.battlefieldElement.querySelectorAll('.ship');
    ships.forEach(ship => {
      ship.disabled = true;
      ship.style.pointerEvents = 'none';
    });
  }

  restartGame() {
    this.battlefield.reset();
    this.resetGameState();
    this.instructionElement.textContent = "Player 1: Place your ships.";
    this.resultsElement.style.display = "none";
    this.resultsElement.innerHTML = "";
  }

  resetGameState() {
    this.currentPlayer = 1;
    this.player1Ships.clear();
    this.player2Hits.clear();
    this.totalHits = 0;
    this.totalMisses = 0;
    this.nextTurnButton.disabled = true;
  }
}

class Game {
  constructor(battlefieldSize) {
    this.battlefield = new Battlefield(battlefieldSize, "battlefield");
    this.logic = new GamePlay(this.battlefield, "instruction", "results", "next-turn");
  }

  start() {
    this.battlefield.create();
  }
}

// Initialize the game
const game = new Game(10);
game.start();