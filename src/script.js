// Feature 1 - date and time

let showDate = document.querySelector("#date-time");

let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentTime.getDay()];
let currentDate = currentTime.getDate();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let currentMonth = months[currentTime.getMonth()];
let currentYear = currentTime.getFullYear();

let hours = currentTime.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentTime.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

showDate.innerHTML = `${currentDay} | ${currentDate} ${currentMonth} ${currentYear}, ${hours}:${minutes}`;

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weather-forecast-temperature");

  let forecastHTML = `<div class="row">`;

  let days = ["Thu", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
      <div class="card">
      <div class="card-body forecast">
                        <h5>${formatForecastDay(forecastDay.dt)}</h5>
                        <div class="d-flex justify-content-center">
                          <img
                      src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      alt=""
                    />
                        </div>
                        <p class="forecast-temp">
                          <span class="weather-forecast-temp-max">${Math.round(
                            forecastDay.temp.max
                          )}</span>°C /
                          <span class="weather-forecast-temp-min forecast-temp"
                            >${Math.round(forecastDay.temp.min)}</span
                          >°C
                        </p>
                      </div>
                      </div>
                      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "f15fd07e82c8e347402ed872bc384665";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  // console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// Feature 2
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("#temp-display");
  tempDisplay.innerHTML = `${temperature}°C`;

  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = description;

  let humidity = response.data.main.humidity;
  let weatherHumidity = document.querySelector("#weather-humidity");
  weatherHumidity.innerHTML = humidity;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  let windSpeed = response.data.wind.speed;
  let roundedWindSpeed = Math.round(windSpeed);
  let weatherSpeed = document.querySelector("#weather-wind-speed");
  weatherSpeed.innerHTML = roundedWindSpeed;

  celciusTemperature = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}

function displayCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#city-display");
  cityName.innerHTML = `${cityInput.value}`;

  let apiKey = "f15fd07e82c8e347402ed872bc384665";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

// let testUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=f15fd07e82c8e347402ed872bc384665`;
// console.log(testUrl);

let form = document.querySelector("#city-form");
form.addEventListener("submit", displayCity);

// Feature 3
function displayCelcius(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temp-display");
  let roundedCelciusTemperature = Math.round(celciusTemperature);
  tempDisplay.innerHTML = `${roundedCelciusTemperature}°C`;
  fahrenheitButton.classList.remove("active");
  celciusButton.classList.add("active");
}

function displayFahrenheit(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temp-display");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let roundedFahrenheitTemperature = Math.round(fahrenheitTemperature);
  tempDisplay.innerHTML = `${roundedFahrenheitTemperature}°F`;
  celciusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
}

let celciusTemperature = null;

let celciusButton = document.querySelector("#celcius-link");
celciusButton.addEventListener("click", displayCelcius);

let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", displayFahrenheit);

// Current Location
function showTemperatureHere(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("#temp-display");
  tempDisplay.innerHTML = `${temperature}°C`;

  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = description;

  let humidity = response.data.main.humidity;
  let weatherHumidity = document.querySelector("#weather-humidity");
  weatherHumidity.innerHTML = humidity;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let windSpeed = response.data.wind.speed;
  let roundedWindSpeed = Math.round(windSpeed);
  let weatherSpeed = document.querySelector("#weather-wind-speed");
  weatherSpeed.innerHTML = roundedWindSpeed;

  celciusTemperature = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "f15fd07e82c8e347402ed872bc384665";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperatureHere);
}

let button = document.querySelector("#location-button");
button.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(retrievePosition)
);
