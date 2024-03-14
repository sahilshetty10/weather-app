fetchData("toronto");

async function fetchData(city) {
  let response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=5c2cd8491d4f4186aea02645241403&q=${city}
        &days=6&aqi=no&alerts=no`
  );
  let data = await response.json();
  console.log(data);
  updateCurrentWeather(data);
  updateForecast(data);
}

function updateCurrentWeather(data) {
  let temp = data.current.temp_c;
  let condition = data.current.condition.text;
  let icon = data.current.condition.icon;
  let high = data.forecast.forecastday[0].day.maxtemp_c;
  let low = data.forecast.forecastday[0].day.mintemp_c;
  let feelsLike = data.current.feelslike_c;
  let humidity = data.current.humidity;
  let windSpeed = data.current.wind_kph;
  document.getElementById("current-temp").innerText = temp + "° C";
  document.getElementById("current-condition").innerText = condition;
  document.getElementById("current-condition-icon").src = icon;
  document.getElementById("current-hi-lo").innerText = `${high}° / ${low}°`;
  document.getElementById(
    "current-feels-like"
  ).innerText = `Feels like: ${feelsLike}° C`;
  document.getElementById(
    "current-humidity"
  ).innerText = `Humidity: ${humidity}%`;
  document.getElementById(
    "current-wind"
  ).innerText = `Wind Speed: ${windSpeed} km/h`;
}
function updateForecast(data) {
  let forecast_data = data.forecast.forecastday;
  for (let index = 1; index < forecast_data.length; index++) {
    let forecast_day = forecast_data[index];
    let date = forecast_day.date;
    console.log(date);
    let condition = forecast_day.day.condition.text;
    let max_temp = forecast_day.day.maxtemp_c;
    let min_temp = forecast_day.day.mintemp_c;
    let icon = forecast_day.day.condition.icon;
    let humidity = forecast_day.day.avghumidity;
    let windSpeed = forecast_day.day.maxwind_kph;
    document.querySelector(`#day${index} > .forecast-date`).innerText = date;
    document.querySelector(`#day${index} > .forecast-condition`).innerText =
      condition;
    document.querySelector(`#day${index} > .forecast-condition-icon`).src =
      icon;
    document.querySelector(
      `#day${index} > .forecast-hi-lo`
    ).innerText = `${max_temp}° / ${min_temp}°`;
    document.querySelector(
      `#day${index} > .forecast-humidity`
    ).innerText = `Humidity: ${humidity}%`;
    document.querySelector(
      `#day${index} > .forecast-wind`
    ).innerText = `Wind Speed: ${windSpeed} km/h`;
  }
}

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let city = document.getElementById("city-input").value;
    fetchData(city);
  });
