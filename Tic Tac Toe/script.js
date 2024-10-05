// Select all the game cells (Tic-Tac-Toe cells) into an array-like structure
const gameCells = document.querySelectorAll('.cell'); 

// Select the elements displaying the players' information
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

// Select the restart button and alert box for game messages
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');

// Define the current player and the next player
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;  // Set the initial turn to player 'X'

// Display player 1 and player 2 details on the screen
player1.textContent = `Player 1 : ${currentPlayer}`;
player2.textContent = `Player 2 : ${nextPlayer}`;

// Function to start the game and add event listeners to each cell
const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);  // When a cell is clicked, the handleClick function is called
    });
}

// Handle the click event for a cell
const handleClick = (e) => {
    // Ensure the clicked cell is empty before marking it
    if(e.target.textContent === ''){
        e.target.textContent = playerTurn;  // Set the cell's content to the current player's mark ('X' or 'O')

        // Check if the current move results in a win
        if(checkWin()){
            showAlert(`${playerTurn} is a Winner!`);  // Display win message
            disableCells();  // Disable further clicks after the game ends
        }
        // Check if all cells are filled and it's a tie
        else if(checkTie()){
            showAlert(`It's a Tie!`);  // Display tie message
            disableCells();  // Disable further clicks after the game ends
        }
        // If no win or tie, change the player's turn and continue
        else{
            changePlayerTurn();  // Switch to the other player
            showAlert(`Turn for player: ${playerTurn}`);  // Show whose turn it is next
        }
    }
}

// Function to change the player's turn
const changePlayerTurn = () => {
    // Toggle between 'X' and 'O'
    playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
}

// Function to check if a player has won
const checkWin = () => {
    // Define all the possible winning combinations (rows, columns, diagonals)
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    // Loop through each winning condition to check if any is met
    for(let i = 0 ; i < winningConditions.length ; i++){
        const [pos1, pos2, pos3] = winningConditions[i];
        // If all three positions in a winning condition are equal and not empty, we have a winner
        if(gameCells[pos1].textContent !== '' && 
           gameCells[pos1].textContent === gameCells[pos2].textContent && 
           gameCells[pos2].textContent === gameCells[pos3].textContent){
            return true;  // Return true if there is a win
        }
    }
    return false;  // Return false if no winning condition is met
}

// Function to check if the game is tied (all cells filled and no winner)
const checkTie = () => {
    let emptyCellsCount = 0;

    // Count how many cells are still empty
    gameCells.forEach(cell => {
        if(cell.textContent === ''){
            emptyCellsCount++;
        }
    });

    // Return true if no empty cells and no winner
    return emptyCellsCount === 0 && !checkWin();
}

// Function to disable further clicks on the cells after the game ends
const disableCells = () => {
    gameCells.forEach(cell =>{
        cell.removeEventListener('click', handleClick);  // Remove the click event listener from each cell
        cell.classList.add('disabled');  // Add a CSS class to visually disable the cell
    });
}

// Function to reset the game to its initial state
const restartGame = () => {
    gameCells.forEach(cell =>{
        cell.textContent = '';  // Clear all the cells
        cell.classList.remove('disabled');  // Remove the disabled class
    });
    startGame();  // Restart the game by adding event listeners again
}

// Add an event listener to the restart button to reset the game
restartBtn.addEventListener('click', restartGame);

// Function to display game messages in the alert box
const showAlert = (msg) => {
    alertBox.textContent = msg;  // Set the message content
    alertBox.style.display = "block";  // Make the alert box visible
    setTimeout(() => {
        alertBox.style.display = "none";  // Hide the alert box after 3 seconds
    }, 3000);
}

// Initialize the game
startGame();
