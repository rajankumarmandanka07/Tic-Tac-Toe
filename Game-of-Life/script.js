let rows = 30;
let cols = 30;

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
                updateBoard(gameBoard);
            });
            board.appendChild(cell);
        }
    }
}

const updateBoard = (gameBoard) => {
    document.querySelectorAll('.cell').forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        cell.classList.toggle('alive', gameBoard[row][col] === 1)
    });
}


const start = () => {
    
    let running = false;
    
    initializeBoard(rows, cols);
}

start();