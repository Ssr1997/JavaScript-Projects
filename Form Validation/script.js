// Get the necessary HTML elements by their IDs
const submitBtn = document.getElementById('submitBtn');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passError');
const cpassError = document.getElementById('cpassError');

// Add an event listener to the "submit" button for the click event
submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate all fields before submitting
    if (validateName() && validateEmail() && validatePassword() && validateConfirmPassword()) {
        alert("Form Submitted Successfully"); // Alert user of successful form submission
        clearForm(); // Clear the form after successful validation
    }
});

// Function to validate the Name field
function validateName() {
    let name = document.getElementById('name').value; // Get the value of the 'name' input field

    // Check if the name is empty
    if (name.length == 0) {
        nameError.innerHTML = "Name is required"; // Show error message
        nameError.previousElementSibling.classList.add('fa-xmark'); // Add 'X' icon for error
        return false; // Return false to indicate validation failure
    }

    // Check if the name follows the format (First and Last name with a space in between)
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = "Write full Name"; // Show error message if the format is incorrect
        nameError.previousElementSibling.classList.add('fa-xmark'); // Add 'X' icon for error
        return false; // Return false for invalid name format
    }

    // If validation is successful, clear the error message and add 'check' icon
    nameError.innerHTML = "";
    nameError.previousElementSibling.classList.add('fa-check'); // Add 'check' icon for success
    return true; // Return true to indicate successful validation
}

// Function to validate the Email field
function validateEmail() {
    let email = document.getElementById('email').value; // Get the value of the 'email' input field

    // Check if the email is empty
    if (email.length == 0) {
        emailError.innerHTML = "Email is required"; // Show error message
        emailError.previousElementSibling.classList.add('fa-xmark'); // Add 'X' icon for error
        return false; // Return false to indicate validation failure
    }

    // Check if the email follows a valid format using a regular expression
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        emailError.innerHTML = "Enter Valid Email"; // Show error if email format is incorrect
        emailError.previousElementSibling.classList.add('fa-xmark'); // Add 'X' icon for error
        return false; // Return false for invalid email format
    }

    // If validation is successful, clear the error message and add 'check' icon
    emailError.innerHTML = "";
    emailError.previousElementSibling.classList.add('fa-check'); // Add 'check' icon for success
    return true; // Return true to indicate successful validation
}

// Function to validate the Password field
function validatePassword() {
    let password = document.getElementById('password').value; // Get the value of the 'password' input field

    // Check if the password is empty
    if (password.length == 0) {
        passError.innerHTML = "Password is required"; // Show error message
        passError.previousElementSibling.classList.add('fa-xmark'); // Add 'X' icon for error
        return false; // Return false to indicate validation failure
    }

    // Check if the password matches the required pattern (at least one uppercase, lowercase, digit, and special character)
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/)) {
        passError.innerHTML = "Password should contain 1 Uppercase, 1 Lowercase, 1 Digit & 1 Alphabet";
        passError.previousElementSibling.classList.add('fa-xmark'); // Add 'X' icon for error
        return false; // Return false if password does not match the pattern
    }

    // If validation is successful, clear the error message and add 'check' icon
    passError.innerHTML = "";
    passError.previousElementSibling.classList.add('fa-check'); // Add 'check' icon for success
    return true; // Return true to indicate successful validation
}

// Function to validate the Confirm Password field
function validateConfirmPassword() {
    let password = document.getElementById('password').value; // Get the value of the 'password' input field
    let confirmpassword = document.getElementById('confirmpassword').value; // Get the value of the 'confirmpassword' input field

    // Check if the confirm password field is empty
    if (confirmpassword.length == 0) {
        cpassError.innerHTML = "Confirm Password is required"; // Show error message
        cpassError.previousElementSibling.classList.add('fa-xmark'); // Add 'X' icon for error
        return false; // Return false to indicate validation failure
    }

    // Check if the confirm password matches the original password
    if (password !== confirmpassword) {
        cpassError.innerHTML = "Passwords do not match."; // Show error if passwords do not match
        cpassError.previousElementSibling.classList.add('fa-xmark'); // Add 'X' icon for error
        return false; // Return false if passwords don't match
    }

    // If validation is successful, clear the error message and add 'check' icon
    cpassError.innerHTML = "";
    cpassError.previousElementSibling.classList.add('fa-check'); // Add 'check' icon for success
    return true; // Return true to indicate successful validation
}

// Function to clear the form and reset error messages
function clearForm() {
    document.getElementById('name').value = ""; // Clear the name input field
    document.getElementById('email').value = ""; // Clear the email input field
    document.getElementById('password').value = ""; // Clear the password input field
    document.getElementById('confirmpassword').value = ""; // Clear the confirm password field

    // Clear all error messages
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    passError.innerHTML = "";
    cpassError.innerHTML = "";

    // Remove all 'check' and 'xmark' icons from the form fields
    document.querySelectorAll('.fa-check, .fa-xmark').forEach(icon => {
        icon.classList.remove('fa-check', 'fa-xmark');
    });
}
