const searchFormEl = document.querySelector("#search-form");
const cityNameEl = document.querySelector("#city-name");
const currentWeatherEl = document.querySelector("#current-weather");
const fiveDayEl = document.querySelector("#five-day");
const apiKey = '43307f36c133c1b4d80feb3644b2ab3e';

// Create a global array to save city from the input textbox.
// Get from localStorage first if it exists, otherwise default it to an empty array
const cityArr = JSON.parse(localStorage.getItem("cities")) || [];

function searchCity(event) {
  event.preventDefault();
  const cityName = cityNameEl.value;
  populateCurrentWeather(cityName);
  populate5Day(cityName);
}

function populateCurrentWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Push city name into array and save to localStorage
      if (!cityArr.includes(data.name)) {
        cityArr.push(data.name);
        localStorage.setItem("cities", JSON.stringify(cityArr));
      }

      currentWeatherEl.innerHTML = `
        <h3>${data.name} ( ${dayjs.unix(data.dt).format("MM/DD/YYYY")} ) 
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </h3>
        <p> Temp: <span>${data.main.temp} °F</span> </p>
        <p> Wind: <span>${data.wind.speed} MPH</span> </p>
        <p> Humidity: <span>${data.main.humidity} %</span> </p>
      `;

      console.log(data);
    });
}

function populate5Day(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);

      fiveDayEl.textContent = "";

      for (let i = 3; i < data.list.length; i = i + 8) {
        const forecast = data.list[i];
        console.log(forecast);
        fiveDayEl.innerHTML += `
          <div class="col-sm-2 mb-3 mb-sm-0">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${dayjs.unix(forecast.dt).format("MM/DD/YYYY")}</h5>
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="">
                <p> Temp: <span>${forecast.main.temp} °F</span> </p>
                <p> Wind: <span>${forecast.wind.speed} MPH</span> </p>
                <p> Humidity: <span>${forecast.main.humidity} %</span> </p>
              </div>
            </div>
          </div>
        `;
      }
    });
}

searchFormEl.addEventListener("submit", searchCity);

// Get latest city from localStorage to replace default value (e.g., Chicago)
const lastCity = cityArr.length > 0 ? cityArr[cityArr.length - 1] : 'Chicago';
populateCurrentWeather(lastCity);
populate5Day(lastCity);
