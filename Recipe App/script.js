// Selecting elements from the DOM that will be used in the code
const searchBox = document.querySelector('.searchBox');  // Input field where the user types the recipe
const searchBtn = document.querySelector('.searchBtn');  // Button for submitting the search
const recipeContainer = document.querySelector('.recipe-container');  // Container to display the recipes
const recipeDetailsContent = document.querySelector('.recipe-details-content');  // Area to display the recipe details
const recipeCloseBtn = document.querySelector('.recipe-close-btn');  // Button to close the recipe details popup

// Function to fetch recipes from the API based on the search query
const fetchRecipes = async (query) => {
    // Display a "Fetching Recipes..." message while the data is being retrieved
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";

    try {
        // Making an API call to fetch recipes that match the search query
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();  // Converting the response to JSON format
        console.log(response);  // Logging the response to the console for debugging

        // If the API returns meals, the forEach loop will iterate through each meal
        response.meals.forEach(meal => {
            console.log(meal);  // Logging each meal to the console
        });

        recipeContainer.innerHTML = "";  // Clear the "Fetching Recipes..." message

        // Loop through the meals returned from the API and create HTML content for each meal
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');  // Creating a div to hold each recipe
            recipeDiv.classList.add('recipe');  // Adding a class to the div for styling

            // Adding the meal's thumbnail image, name, area (e.g., Italian, Mexican), and category (e.g., breakfast, dessert)
            recipeDiv.innerHTML = `
                <img src = "${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p><span>${meal.strCategory}</span> Category </p>
            `;

            // Creating a button to view more details about the recipe
            const button = document.createElement('button');
            button.textContent = "View Recipe";  // Text for the button

            recipeDiv.appendChild(button);  // Adding the button to the recipe div

            // Adding an event listener to the button to open the recipe details popup when clicked
            button.addEventListener('click', () => {
                openRecipePopup(meal);  // Calling the function to display the detailed recipe
            });

            recipeContainer.appendChild(recipeDiv);  // Adding the recipe div to the recipe container
        });
    } 
    catch (error) {
        // Displaying an error message if there was a problem fetching the recipes
        recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
    }
}

// Function to extract and display the ingredients of a meal
const fetchingIngredients = (meal) => {
    console.log(meal);  // Logging the meal object for debugging

    let ingredientsList = "";  // Variable to hold the list of ingredients as HTML
    // Looping through the potential 20 ingredient fields in the API response
    for (i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];  // Getting each ingredient (e.g., 'Chicken')
        if (ingredient) {  // If the ingredient exists (not null or empty)
            const measure = meal[`strMeasure${i}`];  // Getting the corresponding measure (e.g., '1 kg')
            ingredientsList += `<li>${measure} ${ingredient}</li>`;  // Adding the ingredient and measure to the list
        } else {
            break;  // Stop if there are no more ingredients
        }
    }
    return ingredientsList;  // Return the completed list of ingredients
}

// Function to display the recipe details in a popup when the user clicks "View Recipe"
const openRecipePopup = (meal) => {
    // Filling the popup with the meal's name, ingredients, and instructions
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchingIngredients(meal)}</ul>  <!-- Calling fetchingIngredients to generate the ingredient list -->
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>  <!-- Adding the cooking instructions -->
        </div>
    `;
    // Display the recipe details popup (which was initially hidden)
    recipeDetailsContent.parentElement.style.display = "block";
}

// Event listener for the close button in the recipe details popup
recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";  // Hide the recipe details when the user clicks the close button
});

// Event listener for the search button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    const searchInput = searchBox.value.trim();  // Get the search input value and remove any extra spaces

    // If the search input is empty, display a message prompting the user to type a meal
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`;
        return;  // Stop further execution
    }

    // Fetch recipes based on the search input
    fetchRecipes(searchInput);
});
