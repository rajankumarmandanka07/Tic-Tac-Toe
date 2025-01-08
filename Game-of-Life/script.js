let rows = 30
let cols = 30
const grid = document.getElementById('grid');
let gameGrid = Array.from({ length: rows }, () => Array(cols).fill(0))
let running = false;
let interval;

grid.style.gridTemplateRows = `repeat(${rows}, 20px)`
grid.style.gridTemplateColumns = `repeat(${cols}, 20px)`
grid.innerHTML = ''

for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.addEventListener('click', () => toggleCell(r, c));
        grid.appendChild(cell);
    }
}

const toggleCell = (row, col) => {
    gameGrid[row][col] = gameGrid[row][col] === 0 ? 1 : 0
    updateGrid()
}

const updateGrid = () => {
    document.querySelectorAll('.cell').forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        cell.classList.toggle('alive', gameGrid[row][col] === 1)
    })
}

const countNeighbors = (row, col) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const r = (row + i + rows) % rows;
            const c = (col + j + cols) % cols;
            count += gameGrid[r][c];
        }
    }
    return count;
}

const nextGeneration = () => {
    const newGrid = gameGrid.map(arr => [...arr]);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const count = countNeighbors(i, j);
            if (gameGrid[i][j] === 1) {
                newGrid[i][j] = count === 2 || count === 3 ? 1 : 0;
            } else {
                newGrid[i][j] = count === 3 ? 1 : 0;
            }
        }
    }

    gameGrid = newGrid
    updateGrid()
}

const startGame = () => {
    if (!running) {
        running = true;
        interval = setInterval(nextGeneration, 200);
    }
}

const pauseGame = () => {
    running = false;
    clearInterval(interval);
}

const resetGame = () => {
    pauseGame();
    gameGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
    updateGrid();
}

function randomizeGrid() {
    gameGrid = gameGrid.map(row => row.map(() => Math.random() > 0.7 ? 1 : 0));
    updateGrid();
}

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', pauseGame);
document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('randomBtn').addEventListener('click', randomizeGrid);