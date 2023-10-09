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

    
function formatDay(timestamp) {
let date = new Date (timestamp*1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

return days[day];

}



    function displayForecast(response) {
        console.log(response.data);
let forecast = response.data.daily;


        let forecastElement = document.querySelector(".forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index) {
if (index < 6) {

forecastHTML = forecastHTML + 
` 
<div class="col-2">

<div class="forcast-date">${formatDay(forecastDay.dt)}</div>
<img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" />

<div class="weather-forcast-temp">
    <span class="weather-forcast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
    <span class="weather-forcast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
</div>
</div>

`;
}
    });

forecastHTML = forecastHTML + `</div>`
forecastElement.innerHTML = forecastHTML;
    }

    function getForecast(coordinates) {
        console.log(coordinates);
        let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
        console.log(apiUrl);
        axios.get(apiUrl).then(displayForecast);
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

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);



getForecast(response.data.coord);
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
    
    let dateElement = document.querySelector("#date");
    let currentTime = new Date();
    dateElement.innerHTML = formatDate(currentTime);
    
    
    let searchForm = document.querySelector("#search-form");
    searchForm.addEventListener("submit", handleSubmit);
    
    
    let currentLocationButton = document.querySelector("#current-location-button");
    searchForm.addEventListener("submit", showCurrentLocation);
    
    
    searchCity("Mandeville");

    
    
    
    
    
    
    


