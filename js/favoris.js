import { ShowIcon} from "./function.js";

const locations = $(".location")

for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    
    const inputsHide = location.querySelectorAll('input')
    const iconContainer = location.querySelector('.icon')
    const desc = location.querySelector('.desc')

    const lat = inputsHide[0].value
    const lon = inputsHide[1].value

    var settingsCurrentWeather = {
        "url": `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=775b43c6cfc7dcb4ef93f452147deda1&lang=fr&units=metric`,
        "method": "GET",
        "timeout": 0,
    };

    axios(settingsCurrentWeather)
    .then(function (response) {
        var data = response.data

        console.log(data)
        const icon = data.weather[0].icon
        const description = data.weather[0].description
        const temperature = Math.round(data.main.temp)

        iconContainer.innerHTML = 
        `<i class="${ShowIcon(icon)} text-3xl"></i>
        <span class="text-xl font-medium text-blue-400">${temperature}°C</span>`

        desc.innerHTML = description

        // $("input[type=hidden]").remove();
    })
    .catch(function (error) {
        console.log(error);
    });
}