const apiKey = '0b20d300d3a742fd946155010250302';
const apiUrl = 'http://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=';

// City Suggestion Logic
let cities = [];
async function suggestCity() {
    const input = document.getElementById("city-input").value;
    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = '';
    
    if(input.length < 3) {
        suggestions.style.display = "none";
        return;
    }
    
    // Fetch list of cities
    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${input}`);
    const data = await response.json();
    
    cities = data;
    
    if(cities.length > 0) {
        suggestions.style.display = "block";
        cities.forEach(city => {
            const div = document.createElement('div');
            div.textContent = city.name + ", " + city.country;
            div.onclick = () => {
                document.getElementById("city-input").value = city.name;
                suggestions.style.display = "none";
                getWeather(city.name);
            };
            suggestions.appendChild(div);
        });
    } else {
        suggestions.style.display = "none";
    }
}


// Fetch Weather Data
async function getWeather(city) {
    const response = await fetch(apiUrl + city);
    const data = await response.json();
    
    if (data.error) {
        alert("City not found.");
        return;
    }

    document.getElementById("weather-info").style.display = "block";
    document.getElementById("city-name").textContent = data.location.name + ", " + data.location.country;
    document.getElementById("temperature").textContent = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById("condition").textContent = `Condition: ${data.current.condition.text}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;
    document.getElementById("wind").textContent = `Wind: ${data.current.wind_kph} kph`;
    document.getElementById("weather-icon").src = "https:" + data.current.condition.icon;
}
