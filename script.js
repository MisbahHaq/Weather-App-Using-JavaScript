const apiKey = "09bcae12cbe35586a8b2a51a81e76d5f";

async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            showError(data.message);
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

        const weatherIcon = document.querySelector(".weather-icon");
        const weatherImages = {
            "Clouds": "Images/clouds.png",
            "Clear": "Images/clear.png",
            "Rain": "Images/rain.png",
            "Drizzle": "Images/drizzle.png",
            "Mist": "Images/mist.png",
            "Snow": "Images/snow.png",
            "Thunderstorm": "Images/thunderstorm.png"
        };

        weatherIcon.src = weatherImages[data.weather[0].main] || "Images/default.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError("Unable to fetch weather data. Please try again.");
    }
}

function showError(message) {
    const errorBox = document.querySelector(".error");
    errorBox.style.display = "block";
    errorBox.innerHTML = `<p>${message}</p>`;
    document.querySelector(".weather").style.display = "none";
}

document.querySelector("button").addEventListener("click", () => {
    const city = document.querySelector("input").value.trim();
    if (city === "") {
        showError("Please enter a city name.");
        return;
    }
    checkWeather(city);
});

document.querySelector("input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        document.querySelector("button").click();
    }
});
