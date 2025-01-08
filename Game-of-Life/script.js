let rows = 30;
let cols = 30;
let running = false;

const initializeBoard = (rows, cols) => {
    const board = document.getElementById('grid');
    let gameBoard = Array.from({ length: rows }, () => Array(cols).fill(0));

    board.style.gridTemplateRows = `repeat(${rows}, 20px)`
    board.style.gridTemplateColumns = `repeat(${cols}, 20px)`
    board.innerHTML = ''

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => {
                gameBoard[r][c] = gameBoard[r][c] === 0 ? 1 : 0;
                gameBoard = updateBoard(gameBoard);
            });
            board.appendChild(cell);
        }
    }

    return gameBoard;
}

const updateBoard = (gameBoard) => {
    document.querySelectorAll('.cell').forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        cell.classList.toggle('alive', gameBoard[row][col] === 1)
    });
    return gameBoard;
}

const countNeighbors = (row, col, gameBoard) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const r = (row + i + rows) % rows;
            const c = (col + j + cols) % cols;
            count += gameBoard[r][c];
        }
    }
    return count;
}

const nextGeneration = (gameBoard) => {
    let newBoard = gameBoard.map(arr => [...arr]);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j, gameBoard);
            if (gameBoard[i][j] === 1) {
                newBoard[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
            } else {
                newBoard[i][j] = neighbors === 3 ? 1 : 0;
            }
        }
    }

    gameBoard = newBoard;
    gameBoard = updateBoard(gameBoard);
}

let gameBoard = initializeBoard(rows, cols);

const start = () => {
    gameBoard = nextGeneration(gameBoard);
    console.log(1);
    
}

// start();

const playGame = () => {
    if (!running) {
        running = true;
        interval = setInterval(start(), 200);
    }
    // console.log(interval);
}


document.getElementById('playBtn').addEventListener('click', playGame);
