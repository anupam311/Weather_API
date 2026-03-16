const apiKey = "cea1d52a3e38afec818e53239fd9a160";

document
.getElementById("cityInput")
.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        getWeather();
    }
});

function getWeather(){

    const city = document.getElementById("cityInput").value.trim();
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {

        if(data.cod == "404"){
            document.getElementById("weatherResult").innerHTML = "City not found";
            return;
        }

        const temp = data.main.temp;
        const weather = data.weather[0].description;
        const humidity = data.main.humidity;

        let emoji="☀";

        if(weather.includes("cloud")) emoji="☁";
        if(weather.includes("rain")) emoji="🌧";
        if(weather.includes("snow")) emoji="❄";
        if(weather.includes("storm")) emoji="⛈";

        document.getElementById("weatherResult").innerHTML =
        `<h2>${data.name}</h2>
        <div class="temp">${emoji} ${temp}°C</div>
        <p>${weather}</p>
        <p>Humidity: ${humidity}%</p>`;

    })
    .catch(error=>{
        document.getElementById("weatherResult").innerHTML="Error fetching weather";
    });
}