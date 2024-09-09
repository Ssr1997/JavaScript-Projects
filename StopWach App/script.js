// Select the HTML elements to interact with
let timerDisplay = document.querySelector('.timerDisplay'); // Select the element where the timer will be displayed
let stopBtn = document.getElementById('stopBtn'); // Select the Stop button
let startBtn = document.getElementById('startBtn'); // Select the Start button
let resetBtn = document.getElementById('resetBtn'); // Select the Reset button

// Initialize variables to track time
let msec = 0; // Initialize milliseconds to 0
let secs = 0; // Initialize seconds to 0
let mins = 0; // Initialize minutes to 0

// Variable to hold the interval ID, so we can start and stop the timer
let timerId = null;

// Event listener for the Start button
startBtn.addEventListener('click', function(){
    // If a timer is already running, clear it to avoid multiple timers
    if(timerId !== null){
        clearInterval(timerId);
    }
    // Start a new timer that runs the 'startTimer' function every 10 milliseconds (for better accuracy)
    timerId = setInterval(startTimer, 10);
});

// Event listener for the Stop button
stopBtn.addEventListener('click', function(){
    // Stop the timer by clearing the interval
    clearInterval(timerId);
});

// Event listener for the Reset button
resetBtn.addEventListener('click', function(){
    // Stop the timer by clearing the interval
    clearInterval(timerId);
    // Reset the timer display to the initial state (00:00:00)
    timerDisplay.innerHTML = `00 : 00 : 00`;
    // Reset milliseconds, seconds, and minutes to 0
    msec = secs = mins = 0;
});

// Function to start the timer and update the display
function startTimer(){
    // Increment the milliseconds by 1
    msec++;
    // If milliseconds reach 100 (1 second), reset milliseconds and increment seconds
    if(msec == 100){
        msec = 0;
        secs++;
        // If seconds reach 60 (1 minute), reset seconds and increment minutes
        if(secs == 60){
            secs = 0;
            mins++;
        }
    }

    // Format milliseconds, seconds, and minutes with leading zeros if less than 10
    let msecString = msec < 10 ? `0${msec}` : msec;
    let secsString = secs < 10 ? `0${secs}` : secs;
    let minsString = mins < 10 ? `0${mins}` : mins;
    
    // Update the timer display in the HTML
    timerDisplay.innerHTML = `${minsString} : ${secsString} : ${msecString}`;
}
