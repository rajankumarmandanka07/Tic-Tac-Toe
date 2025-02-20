export class GameNextGeneration {
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

    nextGeneration() {
        const newBoard = this.gameBoard.board.map(arr => [...arr]);

        for (let i = 0; i < this.gameBoard.rows; i++) {
            for (let j = 0; j < this.gameBoard.cols; j++) {
                const neighbors = this.countNeighbors(i, j);
                newBoard[i][j] = this.applyRules(this.gameBoard.board[i][j], neighbors);
            }
        }
        this.gameBoard.board = newBoard;
    }

    applyRules(currentState, neighbors) {
        if (currentState === 1) {
            return neighbors === 2 || neighbors === 3 ? 1 : 0;
        } else {
            return neighbors === 3 ? 1 : 0;
        }
    }
}
