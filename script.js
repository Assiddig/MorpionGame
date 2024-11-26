const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const scoreXText = document.getElementById('scoreX');
const scoreOText = document.getElementById('scoreO');
const gameContainer = document.getElementById('games');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

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


function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusText.textContent = `Le joueur ${currentPlayer} a gagné !`;

      cells[a].classList.add('winner');
      cells[b].classList.add('winner');
      cells[c].classList.add('winner');

      if (currentPlayer === 'X') {
        scoreX++;
        scoreXText.textContent = scoreX;
      } else {
        scoreO++;
        scoreOText.textContent = scoreO;
      }
      return;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    statusText.textContent = "Match nul !";
  }
}

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'winner');
  });

  const lines = document.querySelectorAll('.line');
  lines.forEach(line => line.remove());
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;
