import { IGameLogic } from "../controller/interfaces.js";

class GameLogic extends IGameLogic {
    constructor(battlefield, uiHandler, nextTurnButtonId) {
        super();
        this.battlefield = battlefield;
        this.uiHandler = uiHandler;
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
            this.uiHandler.updateInstruction("Player 2: Attack Player 1's ships.");
            this.nextTurnButton.disabled = true;
            this.battlefield.ships.forEach(ship => ship.classList.remove("place"));
        }
    }

    endGame() {
        this.uiHandler.updateInstruction("Game Over!");
        this.uiHandler.showResults(this.totalHits, this.totalMisses);
        this.uiHandler.disableBoard();
        this.nextTurnButton.disabled = true;

        document.getElementById("restart-btn").addEventListener("click", () => this.restartGame());
    }

    restartGame() {
        this.battlefield.reset();
        this.resetGameState();
        this.uiHandler.updateInstruction("Player 1: Place your ships.");
        this.uiHandler.resultsElement.style.display = "none";
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

export { GameLogic };