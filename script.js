const searchInput = document.querySelector('input[type="search"]');
const searchIcon = document.querySelector('.i1');

// Elements to update
const tempElement = document.getElementById('temp');
const descpElement = document.getElementById('descp');
const humidityElement = document.querySelector('.b1 .pr');
const windElement = document.querySelector('.b2 .pr');
const snowfallElement = document.querySelector('.b3 .pr');
const precipElement = document.querySelector('.b4 .pr');
const pressureElement = document.querySelector('.b6 .pr');


async function getCoordinates(city) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
        throw new Error('City not found');
    }
    const { latitude, longitude } = data.results[0];
    return { latitude, longitude };
}


async function getWeather(city) {
    try {
        const { latitude, longitude } = await getCoordinates(city);
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,wind_speed_10m,pressure_msl,cloudcover,is_day&timezone=auto`;
        const response = await fetch(url);
        const data = await response.json();
        const current = data.current;

        // Update fields
        tempElement.innerHTML = `${current.temperature_2m} °C`;
        descpElement.innerHTML = `${current.cloudcover < 50 ? "Mostly Sunny <i class='fa-solid fa-sun'></i>" : "Cloudy <i class='fa-solid fa-cloud'></i>"}`;
        humidityElement.innerHTML = `N/A`; 
        windElement.innerHTML = `${current.wind_speed_10m} km/h`;
        snowfallElement.innerHTML = `N/A`;
        precipElement.innerHTML = `${current.precipitation} mm`;
        pressureElement.innerHTML = `${current.pressure_msl} hPa`;

    } catch (error) {
        alert('Error: ' + error.message);
    }
}


searchIcon.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city !== '') {
        getWeather(city);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather(searchInput.value.trim());
    }
});

let theme_btn = document.querySelector('.btn');

theme_btn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

})
