const weatherContainer = document.querySelector('.weather-container');

// List of locations
const locations = [
    { name: "Ulaanbaatar, Mongolia", latitude: 47.9077, longitude: 106.8832 },
    { name: "Francistown, Botswana", latitude: -21.17, longitude: 27.5078 },
    { name: "Porgsgrunn, Norway", latitude: 59.1405, longitude: 9.6561 },
    { name: "Richmond, USA", latitude: 37.5538, longitude: -77.4603 },
    { name: "Mt. Everest, Nepal", latitude: 27.9879, longitude: 86.9253 },
    { name: "Dildo, Canada", latitude: 47.5666, longitude: -53.5481 }
];

// Fetch weather data for each location
function fetchWeather() {
    weatherContainer.innerHTML = ''; // Clear previous weather data
    locations.forEach(location => {     // For every location
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;
                                            // url with coordiates
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayWeather(location.name, data.current_weather);    // Call on display function with name and data
            })
            .catch(error => console.error('Error fetching weather data:', error));  // In case of error
    });
}

// Display weather data
function displayWeather(location, weatherData) {
    const weatherCard = document.createElement('div');      // Create div and add class weather-card
    weatherCard.classList.add('weather-card');              // then add all the data, i chose temprature, windspeed and winddirection
    weatherCard.innerHTML = `
        <h3>${location}</h3>
        <p><strong>Temperature:</strong> ${weatherData.temperature}°C</p>
        <p><strong>Wind Speed:</strong> ${weatherData.windspeed} km/h</p>
        <p><strong>Wind Directon:</strong> ${weatherData.winddirection}°</p>
    `;
    weatherContainer.appendChild(weatherCard);      // Append to weatherContainer
}

// Update weather data every 5 minutes
setInterval(fetchWeather, 300000);

// Initial fetch
fetchWeather();
