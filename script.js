<<<<<<< HEAD
// ==== Sélection des éléments DOM ====
=======
>>>>>>> b93968cb3adab69f069d888178a04e05ec8dbda1
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const scoreXText = document.getElementById('scoreX');
const scoreOText = document.getElementById('scoreO');
<<<<<<< HEAD
const symbolChoice = document.getElementById('symbol-choice');
const xSymbolButton = document.getElementById('x-symbol');
const oSymbolButton = document.getElementById('o-symbol');

// ==== Variables globales ====
=======

>>>>>>> b93968cb3adab69f069d888178a04e05ec8dbda1
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
<<<<<<< HEAD
=======
let moveCount = 0;
let lastMoveIndex = null;
>>>>>>> b93968cb3adab69f069d888178a04e05ec8dbda1

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

<<<<<<< HEAD
// ==== Fonctions principales ====

/**
 * Vérifie si un joueur a gagné ou si la partie est nulle
 */
=======
>>>>>>> b93968cb3adab69f069d888178a04e05ec8dbda1
function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
<<<<<<< HEAD
      statusText.textContent = `Le joueur ${currentPlayer} a gagné !`;

      // Mise à jour du score
      updateScore();
      highlightWinningCells(combo);
=======
      statusText.textContent = `Le joueur ${currentPlayer === 'X' ? 'O' : 'X'} a gagné !`;
      // Mise à jour du score
      if (currentPlayer === 'X') {
        scoreX++;
        scoreXText.textContent = scoreX;
      } else {
        scoreO++;
        scoreOText.textContent = scoreO;
      }
>>>>>>> b93968cb3adab69f069d888178a04e05ec8dbda1
      return;
    }
  }
  if (!board.includes('')) {
    gameActive = false;
    statusText.textContent = "Match nul !";
  }
}

<<<<<<< HEAD
// ==== Choix du symbole initial ====
function chooseSymbol() {
  // Quand le joueur choisit "X"
  xSymbolButton.addEventListener('click', () => {
    currentPlayer = 'X';
    startGame();
  });

  // Quand le joueur choisit "O"
  oSymbolButton.addEventListener('click', () => {
    currentPlayer = 'O';
    startGame();
  });
}

/**
 * Fonction pour démarrer le jeu après le choix du symbole
 */
function startGame() {
  symbolChoice.style.display = 'none'; // Cache les boutons de choix
  statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;
}

// ==== Initialisation ====
chooseSymbol();

/**
 * Gère le clic sur une cellule
 */
=======
>>>>>>> b93968cb3adab69f069d888178a04e05ec8dbda1
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (board[index] !== '' || !gameActive) return;

<<<<<<< HEAD
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
=======
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
>>>>>>> b93968cb3adab69f069d888178a04e05ec8dbda1

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;
  }
}

<<<<<<< HEAD
/**
 * Réinitialise le jeu
 */
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'winning-cell');
  });
}

/**
 * Met à jour le score du joueur gagnant
 */
function updateScore() {
  if (currentPlayer === 'X') {
    scoreX++;
    scoreXText.textContent = scoreX;
  } else {
    scoreO++;
    scoreOText.textContent = scoreO;
  }
}

/**
 * Met en surbrillance les cellules de la combinaison gagnante
 */
function highlightWinningCells(combo) {
  combo.forEach(index => {
    cells[index].classList.add('winning-cell');
  });
}

// ==== Ajout des événements ====
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// ==== Initialisation ====
statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;
=======
function showImage() {
  imageContainer.style.display = 'block';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', showImage);

statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;
>>>>>>> b93968cb3adab69f069d888178a04e05ec8dbda1
