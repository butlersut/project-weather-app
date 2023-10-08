function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
    }
    
    
    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }
    
    
    let dayIndex = date.getDay();
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ];
    
    
    let day = days[dayIndex];
    return `${day} ${hours}:${minutes}`;
    }

    
    function displayForecast() {
        let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;

let days = ["Sat", "Sun", "Mon", "Tues"];
days.forEach(function(day) {

forecastHTML = forecastHTML + 
` 
<div class="col-2">

<div class="forcast-date">${day}</div>
<div class="forcast-emojis">🌧</div>
<div class="weather-forcast-temp">
    <span class="weather-forcast-temp-max">27°</span>
    <span class="weather-forcast-temp-min">20°</span>
</div>
</div>

`;
    });

forecastHTML = forecastHTML + `</div>`
forecastElement.innerHTML = forecastHTML;
    }

    
    function showWeather(response) {
    console.log(response.data.name);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
    }
    
    
    function searchCity(city) {
    let apiKey = "452e0992d075db1c0fb2bae7c30f9918";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
    }
    
    
    function handleSubmit(event) {
    debugger;
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
    }
    
    
    function searchLocation(position) {
    let apiKey = "452e0992d075db1c0fb2bae7c30f9918";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitute}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
    }
    
    
    function showCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
    }
    
    
    function convertToFahrenheit(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temp");
    tempElement.innerHTML = 75;
    }
    
    
    function convertToCelsius(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temp");
    tempElement.innerHTML = 24;
    }
    
    
    let dateElement = document.querySelector("#date");
    let currentTime = new Date();
    dateElement.innerHTML = formatDate(currentTime);
    
    
    let searchForm = document.querySelector("#search-form");
    searchForm.addEventListener("submit", handleSubmit);
    
    
    let currentLocationButton = document.querySelector("#current-location-button");
    searchForm.addEventListener("submit", showCurrentLocation);
    
    
    searchCity("Ottawa");
    displayForecast();

    
    
    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", convertToFahrenheit);
    
    
    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", convertToCelsius);
    
    
    
    
    iconElement.setAttribute("src", `http://openweather.org/img/wn/${response.data.weather[0].icon}@2x.png`);