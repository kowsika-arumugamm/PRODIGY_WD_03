document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('game-board');
    const statusMessage = document.getElementById('status-message');
    const resetButton = document.getElementById('reset-button');
    
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    let xTurn = true;
  
    const WINNING_COMBINATIONS = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
  
    const cells = [];
  
    initializeBoard();
  
    function initializeBoard() {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-cell-index', i);
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
        cells.push(cell);
      }
    }
  
    function handleClick(event) {
      const cell = event.target;
      const index = cell.getAttribute('data-cell-index');
  
      if (cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
        return;
      }
  
      placeMark(cell, index);
      if (checkWin(X_CLASS)) {
        endGame(false);
      } else if (checkWin(O_CLASS)) {
        endGame(true);
      } else if (isDraw()) {
        endGame(null);
      } else {
        swapTurns();
      }
    }
  
    function placeMark(cell, index) {
      const currentClass = xTurn ? X_CLASS : O_CLASS;
      cell.classList.add(currentClass);
    }
  
    function swapTurns() {
      xTurn = !xTurn;
      updateStatusMessage();
    }
  
    function updateStatusMessage() {
      const currentClass = xTurn ? X_CLASS : O_CLASS;
      statusMessage.innerText = `${currentClass.toUpperCase()}'s turn`;
    }
  
    function checkWin(currentClass) {
      return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return cells[index].classList.contains(currentClass);
        });
      });
    }
  
    function isDraw() {
      return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
      });
    }
  
    function endGame(winner) {
      if (winner === null) {
        statusMessage.innerText = "It's a draw!";
      } else {
        const winningMessage = winner ? "O wins!" : "X wins!";
        statusMessage.innerText = winningMessage;
      }
  
      cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
      });
  
      resetButton.style.display = 'block';
      resetButton.addEventListener('click', resetGame);
    }
  
    function resetGame() {
      cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.addEventListener('click', handleClick);
      });
  
      statusMessage.innerText = '';
      resetButton.style.display = 'none';
      xTurn = true;
    }
  });
  