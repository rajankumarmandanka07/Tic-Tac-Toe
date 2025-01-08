let rows = 30
let cols = 30
let running = false;
const board = document.getElementById('grid');

const initializeBoard = () => {
    board.style.gridTemplateRows = `repeat(${rows}, 20px)`
    board.style.gridTemplateColumns = `repeat(${cols}, 20px)`
    board.innerHTML = ''

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => toggleCell(r, c));
            board.appendChild(cell);
        }
    }
}

initializeBoard();