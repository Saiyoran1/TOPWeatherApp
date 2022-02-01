const API_KEY = "c5b8c203d2175280350e9ba811e5ef26";
const GIPHY_KEY = "5uz5f9yETD54Imt5RaBJiqkhPHgrAqo9"

const container = document.querySelector(".container");
const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");
const cityNameElement = document.querySelector("#city-name");
const weatherDescription = document.querySelector("#weather");
const temperatureReadout = document.querySelector("#temperature");
const unitsReadout = document.querySelector("#units");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeather(e.target.elements.location.value, e.target.elements.faren.checked);
});

async function getWeather(location, faren) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
    try {
        const response = await fetch(weatherUrl, {mode: "cors"});
        const data = await response.json();
        console.log(data.weather[0].main);
        const giphyUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_KEY}&s=${data.weather[0].main}`;
        const image = await fetch(giphyUrl, {mode: "cors"});
        const imageData = await image.json();  
        container.style.backgroundImage = `url(${imageData.data.images.original.url})`;
        resultDiv.style.visibility = "visible";
        cityNameElement.textContent = location;
        weatherDescription.textContent = data.weather[0].description;
        console.log(data);
        temperatureReadout.textContent = faren ? kToF(data.main.temp) : kToC(data.main.temp);
        unitsReadout.textContent = faren ? "Farenheit" : "Celsius";
    } catch (err) {
        console.log(err);
    }
}

function kToC(kelvin) {
    return kelvin - 273.15;
}

function kToF(kelvin) {
    return (kelvin - 273.15) * (9 / 5) + 32;
}