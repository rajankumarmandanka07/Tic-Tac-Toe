export class GameBoard {
    constructor(rows, cols, containerId) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.initializeBoard();
        this.container = document.getElementById(containerId);
        this.setupBoard();
        this.population = 0;
        this.updatePopulationDisplay();
    }

    initializeBoard() {
        return Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    }

    setupBoard() {
        this.container.style.gridTemplateRows = `repeat(${this.rows}, 20px)`;
        this.container.style.gridTemplateColumns = `repeat(${this.cols}, 20px)`;
        this.container.innerHTML = '';

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.addEventListener('click', () => {
                    this.toggleCellState(r, c);
                    this.renderBoard();
                    this.updatePopulationDisplay();
                });
                this.container.appendChild(cell);
            }
        }
    }

    toggleCellState(row, col) {
        this.board[row][col] = this.board[row][col] === 0 ? 1 : 0;
    }

    calculatePopulation() {
        return this.board.flat().reduce((sum, cell) => sum + cell, 0);
    }

    updatePopulationDisplay() {
        this.population = this.calculatePopulation();
        document.getElementById('populationCount').textContent = this.population;
    }

    renderBoard() {
        const cells = this.container.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row, 10);
            const col = parseInt(cell.dataset.col, 10);
            cell.classList.toggle('alive', this.board[row][col] === 1);
        });
    }
}