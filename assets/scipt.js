document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const city  = document.getElementById('city').value;
    const appId = 'a69dc26bdec33592724f4ead3ca7b088';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={a69dc26bdec33592724f4ead3ca7b088}';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherResult = `
                    <h2>Weather in ${data.name}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Description: ${data.weather[0].description}</p>`;
                document.getElementById('weatherResult').innerHTML = weatherResult;
            } else {
                document.getElementById('weatherResult').innerHTML = '<p>City not found!</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherResult').innerHTML = '<p>Error fetching weather data.</p>';
        });
});