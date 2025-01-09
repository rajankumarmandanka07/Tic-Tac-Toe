class GameBoard {
    constructor(rows, cols, containerId) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.initializeBoard();
        this.container = document.getElementById(containerId);
        this.setupBoard();
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
                });
                this.container.appendChild(cell);
            }
        }
    }

    toggleCellState(row, col) {
        this.board[row][col] = this.board[row][col] === 0 ? 1 : 0;
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

class GameNextGeneration {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
    }

    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const r = (row + i + this.gameBoard.rows) % this.gameBoard.rows;
                const c = (col + j + this.gameBoard.cols) % this.gameBoard.cols;
                count += this.gameBoard.board[r][c];
            }
        }
        return count;
    }

    generateNextBoard() {
        const newBoard = this.gameBoard.board.map(arr => [...arr]);

        for (let i = 0; i < this.gameBoard.rows; i++) {
            for (let j = 0; j < this.gameBoard.cols; j++) {

                const neighbors = this.countNeighbors(i, j);
                if (this.gameBoard.board[i][j] === 1) {
                    newBoard[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
                } else {
                    newBoard[i][j] = neighbors === 3 ? 1 : 0;
                }
            }
        }
        this.gameBoard.board = newBoard;
    }
}

class GameController {
    
}


const rows = 30;
const cols = 30;

const gameBoard = new GameBoard(rows, cols, 'grid');