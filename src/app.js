// app.js
const API_KEY="77a00f0d7ddd1f393abdea0ff3476129"
const apiKey = API_KEY




function displayWeather(response) {
  console.log(response);
  function getInformation(response) {
    console.log(response);
    function getCurrentDay(timestamp) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const date = new Date(timestamp * 1000);
      return days[date.getDay()];
    }

    function getCurrentMonth(timestamp) {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const date = new Date(timestamp * 1000);
      return months[date.getMonth()];
    }

    let cityInput = document.getElementById("citySearch").value;

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function updateWeatherInfo(weatherData) {
      const locationTimezone = document.querySelector(".location-timezone");
      const locationDate = document.querySelector(".location-date");
      const weatherIcon = document.querySelector(".weather-icon");
      const weatherDescription = document.querySelector(".weather-description");
      const weatherTemperature = document.querySelector(".weather-temperature");

      locationTimezone.textContent = capitalizeFirstLetter(cityInput);     
      
      locationDate.textContent = `${getCurrentDay(weatherData.dt)}, ${getCurrentMonth(weatherData.dt)} ${new Date(weatherData.dt * 1000).getDate()}th ${new Date(weatherData.dt * 1000).getFullYear()}`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
      weatherIcon.alt = weatherData.weather[0].description;
      weatherDescription.textContent = weatherData.weather[0].description;
      weatherTemperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
    }

    // Use the response parameter directly to get weather data
    updateWeatherInfo(response.data);
  } 

  
  getInformation(response);
}

function handleSubmit(event) {
  event.preventDefault();  
  let cityInput = document.getElementById("citySearch").value;

  if (cityInput !== "") {
    const geolocationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${apiKey}`;

    axios.get(geolocationUrl).then(function (geolocationResponse) {
      if (geolocationResponse.data.length > 0) {
        const { lat, lon } = geolocationResponse.data[0];

        // Now that I have the latitude and longitude, use them to get weather data
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        axios.get(weatherUrl).then(function (weatherResponse) {
          displayWeather(weatherResponse);
        });
      } else {
        console.error('City not found');
      }
    });
  }
}

const searchBar = document.querySelector("#citySearchForm");
searchBar.addEventListener("submit", handleSubmit);
