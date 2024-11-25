const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const announce = document.querySelector(".announce");
const resetButton = document.getElementById("reset");

let currentPlayer = "x";

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin() {
  return winCombos.some((combo) => {
    return combo.every((index) => cells[index].textContent === currentPlayer);
  });
}

function checkDraw() {
  return [...cells].every((cell) => cell.textContent !== "");
}

function switchPlayer() {
  currentPlayer = currentPlayer === "x" ? "o" : "x";
}

function handleClick(event) {
  const cell = event.target;

  if (!cell.classList.contains("cell") || cell.textContent !== "") return;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    announce.textContent = currentPlayer + " a gagné!";
    board.removeEventListener("click", handleClick);
  } else if (checkDraw()) {
    announce.textContent = "Match nul.";
    board.removeEventListener("click", handleClick);
  } else {
    switchPlayer();
  }
}

// Fonction de réinitialisation
function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = ""; // Vide le contenu des cellules
  });
  announce.textContent = ""; // Réinitialise le message d'annonce
  currentPlayer = "x"; // Remet le joueur courant à "x"
  board.addEventListener("click", handleClick); // Réactive les clics sur le tableau
}

// Ajout des écouteurs d'événements
board.addEventListener("click", handleClick);
resetButton.addEventListener("click", resetGame);
