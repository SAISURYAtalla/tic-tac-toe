// SubTask1

const board = document.getElementById("board");
const cells = document.getElementsByClassName("cell");
const msg = document.getElementById("msg");
const players = ["X", "O"];
let current = players[0];
let gameActive = true;

// Set the initial background color for X's turn
document.body.classList.add("x-turn");

// Add event listeners to each cell
for (let cell of cells) {
  cell.addEventListener("click", handleCellClick);
}

function handleCellClick(event) {
  const cell = event.target;

  // Ensure the game is active and the cell is not already filled
  if (cell.innerText !== "" || !gameActive) {
    return;
  }

  // Mark the cell with the current player's symbol
  cell.innerText = current;

  // Check for win or tie
  if (checkWin(current)) {
    msg.innerText = `${current} wins!`;
    gameActive = false;
    document.body.className = "win";
    return;
  } else if (checkTie()) {
    msg.innerText = "It's a tie!";
    gameActive = false;
    document.body.className = "tie";
    return;
  }

  // Switch to the next player
  current = current === players[0] ? players[1] : players[0];
  msg.innerText = `${current}'s turn!`;

  // Update the background color based on the current player's turn
  document.body.className = current === players[0] ? "x-turn" : "o-turn";
}

// SubTask2

function checkWin(current) {
  const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6], // Diagonal from top-right
  ];

  // Check each win pattern to see if it is fulfilled
  for (const pattern of winPatterns) {
    if (pattern.every(index => cells[index].innerText === current)) {
      return true;
    }
  }

  return false;
}

function checkTie() {
  // If every cell is filled, it's a tie
  for (const cell of cells) {
    if (cell.innerText === "") {
      return false;
    }
  }
  return true;
}

// SubTask3
function restart() {
  // Clear the board
  for (const cell of cells) {
    cell.innerText = "";
  }

  // Reset the game state
  current = players[0];
  gameActive = true;
  msg.innerText = `${current}'s turn!`;

  // Reset the background color to the initial state
  document.body.className = "x-turn";
}
