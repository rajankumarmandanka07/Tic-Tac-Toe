const cells = document.querySelectorAll('[data-cell]');
const messageDiv = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach((cell, index) => {
    // Add eventListener for click.
    cell.addEventListener('click', () => {
        // Check that user try to clikc on same button or the user is already win.
        if(cell.textContent || checkWinner()) return;

        // Update text in the cell and also update the value in board array.
        cell.textContent = currentPlayer;
        board[index] = currentPlayer;

        if(checkWinner()) {
            messageDiv.textContent = `Player ${currentPlayer} Wins!`;
            return;
        }

        if(board.every(cell => cell)) {
            messageDiv.textContent = "It's a Draw!";
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageDiv.textContent = `Player ${currentPlayer}'s Turn`;
    });

});


const checkWinner = () => {
    //Check for the winner if find it then return true
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === currentPlayer)
    );
}

restartButton.addEventListener('click', () => {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    messageDiv.textContent = `Player ${currentPlayer}'s Turn`;
})
