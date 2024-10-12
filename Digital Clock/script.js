const time = document.getElementById('time');
/* Selects the <h1> element with the id "time" and stores it in the variable "time". This will be used to display the current time. */

const timeformat = document.getElementById('timeformat');
/* Selects the <span> element with the id "timeformat" and stores it in the variable "timeformat". This will be used to display the time format (AM/PM). */

document.addEventListener('DOMContentLoaded', () => {
    /* Adds an event listener that waits for the DOM content to fully load. Once the page is ready, the callback function is executed. */

    setInterval(showTime, 1000);
    /* Sets an interval to call the `showTime` function every 1000 milliseconds (1 second) to update the clock in real-time. */
});

const showTime = () => {
    /* Defines the `showTime` function, which will be responsible for getting the current time and displaying it on the webpage. */

    let date = new Date();
    /* Creates a new Date object to get the current date and time. */

    let hr = date.getHours();
    /* Gets the current hour from the Date object and stores it in the variable `hr`. */

    let mins = date.getMinutes();
    /* Gets the current minutes from the Date object and stores it in the variable `mins`. */

    let secs = date.getSeconds();
    /* Gets the current seconds from the Date object and stores it in the variable `secs`. */

    hr = hr < 10 ? `0${hr}` : hr;
    /* If the hour is less than 10, it adds a leading zero (e.g., 08 instead of 8). Otherwise, it keeps the hour as is. */

    mins = mins < 10 ? `0${mins}` : mins;
    /* If the minutes are less than 10, it adds a leading zero (e.g., 09 instead of 9). Otherwise, it keeps the minutes as is. */

    secs = secs < 10 ? `0${secs}` : secs;
    /* If the seconds are less than 10, it adds a leading zero (e.g., 05 instead of 5). Otherwise, it keeps the seconds as is. */

    time.innerHTML = `${hr} : ${mins} : ${secs}`;
    /* Updates the inner HTML of the "time" element to display the current time in the format "HH : MM : SS". */

    timeformat.innerHTML = hr > 12 ? "PM" : "AM";
    /* Updates the inner HTML of the "timeformat" element to display "PM" if the hour is greater than 12, otherwise "AM". */
}
