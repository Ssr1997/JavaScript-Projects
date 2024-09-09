// Get the elements representing the hour, minute, and second hands by their IDs
let hr = document.getElementById(`hour`);
let min = document.getElementById(`min`);
let sec = document.getElementById(`sec`);

// Function to calculate the current time and apply the corresponding rotations to the clock hands
function displayTime(){
    // Create a new Date object to get the current time
    let date = new Date();

    // Extract the current hours, minutes, and seconds from the Date object
    let hh = date.getHours();   // Get the current hour (0-23)
    let mm = date.getMinutes(); // Get the current minute (0-59)
    let ss = date.getSeconds(); // Get the current second (0-59)

    // Calculate the rotation for the hour hand
    // The hour hand moves 30 degrees per hour (360 degrees / 12 hours = 30 degrees per hour)
    // Additionally, it moves 0.5 degrees for every minute passed (30 degrees / 60 minutes = 0.5 degrees per minute)
    let hRotation = 30*hh + mm/2;

    // Calculate the rotation for the minute hand
    // The minute hand moves 6 degrees per minute (360 degrees / 60 minutes = 6 degrees per minute)
    let mRotation = 6*mm;

    // Calculate the rotation for the second hand
    // The second hand moves 6 degrees per second (360 degrees / 60 seconds = 6 degrees per second)
    let sRotation = 6*ss;

    // Apply the calculated rotations to the hour, minute, and second hands
    // This rotates the respective clock hands using CSS transform property and the calculated degree values
    hr.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;
}

// Call the displayTime function every second (1000 milliseconds)
// This ensures that the clock updates every second
setInterval(displayTime, 1000);
