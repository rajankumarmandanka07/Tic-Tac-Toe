export class GameController {
    constructor(gameBoard, nextGenLogic) {
        this.gameBoard = gameBoard;
        this.nextGenLogic = nextGenLogic;
        this.interval = null;
        this.playing = false;
        this.generation = 0;
        this.updateGenerationDisplay();
    }

    play() {
        if (!this.playing) {
            this.playing = true;
            this.interval = setInterval(() => {
                this.nextGenLogic.nextGeneration();
                this.gameBoard.renderBoard();
                this.gameBoard.updatePopulationDisplay();
                this.incrementGeneration();
            }, 200);
        }
    }

    pause() {
        this.playing = false;
        clearInterval(this.interval);
    }

    reset() {
        this.pause();
        this.generation = 0;
        this.updateGenerationDisplay();
        this.gameBoard.board = this.gameBoard.initializeBoard();
        this.gameBoard.renderBoard();
        this.gameBoard.updatePopulationDisplay();
    }

    randomInput() {
        this.gameBoard.board = this.gameBoard.board.map(row =>
            row.map(() => Math.random() > 0.7 ? 1 : 0)
        );
        this.generation = 0;
        this.updateGenerationDisplay();
        this.gameBoard.renderBoard();
        this.gameBoard.updatePopulationDisplay();
    }

    incrementGeneration() {
        this.generation++;
        this.updateGenerationDisplay();
    }

    updateGenerationDisplay() {
        document.getElementById('generationCount').textContent = this.generation;
    }
}