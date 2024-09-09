// Selecting necessary DOM elements
const inputBox = document.querySelector(`.input-box`); // The input field where the user enters the city name
const searchBtn = document.getElementById(`searchBtn`); // The search button to trigger weather fetch
const weather_img = document.querySelector(`.weather-img`); // Image element to display weather icon
const temperature = document.querySelector(`.temperature`); // Element to display the temperature
const description = document.querySelector(`.description`); // Element to display weather description (e.g., "clear", "rain")
const humidity = document.getElementById(`humidity`); // Element to display humidity percentage
const wind_speed = document.getElementById(`wind-speed`); // Element to display wind speed
const location_not_found = document.querySelector(`.location-not-found`); // Section to show an error message if location is not found
const weather_body = document.querySelector(`.weather-body`); // Section to show weather details when location is found

// Async function to fetch and display weather information based on the city
async function checkWeather(city){
    const api_key = "71765298ae81521cbed1015424bf061c"; // OpenWeatherMap API key
    // Construct the API request URL using the city name and API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    // Fetch the weather data from the OpenWeatherMap API and parse it as JSON
    const weather_data = await fetch(`${url}`).then(response => response.json());
    console.log(weather_data); // Logging the weather data for debugging

    // If the API returns a 404 error (city not found), show the "location not found" message
    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex"; // Show the error section
        weather_body.style.display = "none"; // Hide the weather details
        console.log("error");
        return; // Exit the function
    }

    // If city is found, hide the "location not found" message and show the weather details
    location_not_found.style.display = "none"; // Hide error section
    weather_body.style.display = "flex"; // Show weather details

    // Update the temperature (converted from Kelvin to Celsius) and insert into the DOM
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    
    // Update the weather description (e.g., "light rain") and insert into the DOM
    description.innerHTML = `${weather_data.weather[0].description}`;
    
    // Update humidity value and insert into the DOM
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    
    // Update wind speed and insert into the DOM
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/Hr`;

    // Update the weather image based on the current weather condition
    switch(weather_data.weather[0].main){
        case `Clouds`:
            weather_img.src = "/Weather App/assets/cloud.png"; // Set the image to 'cloud'
            break;
        case `Clear`:
            weather_img.src = "/Weather App/assets/clear.png"; // Set the image to 'clear sky'
            break;
        case `Rain`:
            weather_img.src = "/Weather App/assets/rain.png"; // Set the image to 'rain'
            break;
        case `Mist`:
            weather_img.src = "/Weather App/assets/mist.png"; // Set the image to 'mist'
            break;
        case `Snow`:
            weather_img.src = "/Weather App/assets/snow.png"; // Set the image to 'snow'
            break;
    }
}

// Add an event listener to the search button to trigger the weather check when clicked
searchBtn.addEventListener(`click`, () =>{
    checkWeather(inputBox.value); // Pass the input value (city name) to the `checkWeather` function
});
