// Getting the input box element where the result is displayed
let input = document.getElementById('inputBox');

// Selecting all button elements on the page
let buttons = document.querySelectorAll('button');

// Initializing an empty string to hold the input or calculation
let string = "";

// Converting the NodeList of buttons into an array for easy manipulation
let arr = Array.from(buttons);

// Looping through each button and adding a 'click' event listener
Array.from(buttons).forEach(button => {
    button.addEventListener('click', (e) => {
        // If the clicked button is '=', perform the calculation
        if (e.target.innerHTML === '=') {
            try {
                // 'eval()' evaluates the mathematical expression in the string
                string = eval(string);
                input.value = string;  // Displaying the result in the input box
            } catch (error) {
                // If there's an error during evaluation (e.g., invalid expression), display "Error"
                input.value = "Error";
            }
        }
        // If the clicked button is 'AC', clear the input and reset the string
        else if (e.target.innerHTML == 'AC') {
            string = "";  // Resetting the string to an empty value
            input.value = string;  // Clearing the input box
        }
        // If the clicked button is 'DEL', remove the last character from the string
        else if (e.target.innerHTML == 'DEL') {
            string = string.substring(0, string.length - 1);  // Removing the last character
            input.value = string;  // Updating the input box with the new string
        }
        // For any other button (numbers/operators), append the clicked button's value to the string
        else {
            string += e.target.innerHTML;  // Adding the button value (like a number or operator) to the string
            input.value = string;  // Displaying the updated string in the input box
        }
    });
});
