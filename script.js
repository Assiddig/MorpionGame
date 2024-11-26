// ==== Sélection des éléments DOM ====
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const scoreXText = document.getElementById('scoreX');
const scoreOText = document.getElementById('scoreO');
const symbolChoice = document.getElementById('symbol-choice');
const xSymbolButton = document.getElementById('x-symbol');
const oSymbolButton = document.getElementById('o-symbol');
const winningLine = document.getElementById('winning-line');

// ==== Variables globales ====
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

// ==== Fonctions principales ====

function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusText.textContent = `Le joueur ${currentPlayer} a gagné !`;

      updateScore();
      highlightWinningCells(combo);
      drawWinningLine(combo);

      return;
    }
  }
  if (!board.includes('')) {
    gameActive = false;
    statusText.textContent = "Match nul !";
  }
}

function chooseSymbol() {
  xSymbolButton.addEventListener('click', () => {
    currentPlayer = 'X';
    startGame();
  });

  oSymbolButton.addEventListener('click', () => {
    currentPlayer = 'O';
    startGame();
  });
}

function startGame() {
  symbolChoice.style.display = 'none';
  statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;
}

chooseSymbol();

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;
  }
}

function drawWinningLine(combo) {
  const firstCell = cells[combo[0]];
  const lastCell = cells[combo[2]];

  const firstCellRect = firstCell.getBoundingClientRect();
  const lastCellRect = lastCell.getBoundingClientRect();
  const gameRect = document.getElementById('game').getBoundingClientRect();

  const startX = firstCellRect.left + firstCellRect.width / 2 - gameRect.left;
  const startY = firstCellRect.top + firstCellRect.height / 2 - gameRect.top;
  const endX = lastCellRect.left + lastCellRect.width / 2 - gameRect.left;
  const endY = lastCellRect.top + lastCellRect.height / 2 - gameRect.top;

  const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

  winningLine.style.width = `${length}px`;
  winningLine.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg)`;
  winningLine.style.display = 'block';
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning-cell');
  });
  hideWinningLine();
}

function updateScore() {
  if (currentPlayer === 'X') {
    scoreX++;
    scoreXText.textContent = scoreX;
  } else {
    scoreO++;
    scoreOText.textContent = scoreO;
  }
}

function highlightWinningCells(combo) {
  combo.forEach(index => {
    cells[index].classList.add('winning-cell');
  });
}

function hideWinningLine() {
  winningLine.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);