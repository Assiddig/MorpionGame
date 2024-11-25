const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const scoreXText = document.getElementById('scoreX');
const scoreOText = document.getElementById('scoreO');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
let moveCount = 0;
let lastMoveIndex = null;

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
      statusText.textContent = `Le joueur ${currentPlayer === 'X' ? 'O' : 'X'} a gagné !`;
      // Mise à jour du score
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

  if(moveCount >=4 && lastMoveIndex !== null) {

    board[lastMoveIndex] = '';
    cells[lastMoveIndex].textContent = '';
    cells[lastMoveIndex].classList.remove('taken');

    moveCount--;
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  lastMoveIndex = index

  moveCount++;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;
  }
}

function showImage() {
  imageContainer.style.display = 'block';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', showImage);

statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;