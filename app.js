import { showIcon } from "/function.js";

navigator.geolocation.getCurrentPosition((p)=>{
    console.log(p)
}, ()=>{
    console.log('nop')
})

$("#search").on('keyup', function (e) {
    // Appel api MapBox
    var settingsMapbox = {
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${$("#search").val()}.json?types=place%2Cpostcode%2Caddress%2Cregion%2Cdistrict&language=fr&access_token=pk.eyJ1IjoibWFyY3lhbm5pY2siLCJhIjoiY2xhODdyZWswMDE2azNwbHZ3NjE3djhraiJ9.oati14hnpLbT5TRYK84T_w`,
        method: "GET",
        timeout: 0,
    };

    $.ajax(settingsMapbox).done(function (response) {
        const data = response.features;

        // Proposition recherche
        $(".search-results").empty();
        let id = 0
        data.forEach((element) => {
            const secondText = element.place_name_fr.split(',')
            secondText.shift()
            $(".search-results").append(
                `<li id="search-result${id}" class="search-result text-sm list-none hover:bg-gray-200 cursor-pointer text-start px-2 py-1 overflow-hidden whitespace-nowrap text-ellipsis">
                    <span id="first-text${id}" class="first-text font-medium">
                        ${element.text_fr}
                    </span>
                    <br>
                    <span id="second-text${id}" class="second-text text-sm">
                        ${secondText.toString()}
                    </span>
                </li>`
            );
            id++
        });

        //Proposition cliquée
        $("li").on('click', function (e) {
            $(".search-results").empty();
            const locationIndex = e.target.id[e.target.id.length - 1]

            $("#search").val(data[locationIndex].place_name_fr)
            
            const lat = data[locationIndex].geometry.coordinates[1]
            const lon = data[locationIndex].geometry.coordinates[0]
            const cityname = data[locationIndex].text_fr

            // Appel current API Weather
            var settingsCurrentWeather = {
                "url": `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=775b43c6cfc7dcb4ef93f452147deda1&lang=fr&units=metric`,
                "method": "GET",
                "timeout": 0,
              };
              
              $.ajax(settingsCurrentWeather).done(function (response) {
                console.log(response);

                const resenti = Math.round(response.main.feels_like)
                const humidity = response.main.humidity
                const pression = response.main.pressure
                const windspeed = response.wind.speed

                const icon = response.weather[0].icon
                const temperature = Math.round(response.main.temp)
                const temp_max = Math.round(response.main.temp_max)
                const temp_min = Math.round(response.main.temp_min)
                const sunrise = response.sys.sunrise
                const sunset = response.sys.sunset

                $(".weather-data").empty();

                //Center
                $(".center .current-weather").append(
                    `
                    <h2 class="font-medium text-start col-span-full">Aperçu du Jour</h2>
                    <div class="flex items-center bg-gray-100 px-2.5 py-4 rounded col-span-1">
                        <i class="fa-light fa-temperature-list text-3xl text-blue-500 mr-5"></i>
                        <div class="text text-start">
                            <span class="text-gray-400">Résenti</span><br>
                            <span class="text-2xl font-bold">${resenti}°C</span>
                        </div>
                    </div>
                    <div class="flex items-center bg-gray-100 px-2.5 py-4 rounded col-span-1">
                        <i class="fa-light fa-droplet-percent text-3xl text-blue-500 mr-5"></i>
                        <div class="text text-start">
                            <span class="text-gray-400">Taux d'humidité</span><br>
                            <span class="text-2xl font-bold">${humidity}%</span>
                        </div>
                    </div>
                    <div class="flex items-center bg-gray-100 px-2.5 py-4 rounded col-span-1">
                        <i class="fa-light fa-wind text-3xl text-blue-500 mr-5"></i>
                        <div class="text text-start">
                            <span class="text-gray-400">Vitesse du vent</span><br>
                            <span class="text-2xl font-bold">${(windspeed * 3.6).toFixed(2)} Km/h</span>
                        </div>
                    </div>
                    <div class="flex items-center bg-gray-100 px-2.5 py-4 rounded col-span-1">
                        <i class="fa-light fa-tire-pressure-warning text-3xl text-blue-500 mr-5"></i>
                        <div class="text text-start">
                            <span class="text-gray-400">Pression</span><br>
                            <span class="text-2xl font-bold">${pression} hPa</span>
                        </div>
                    </div>
                    `
                );

                // Right
                $(".app > .weather-data").append(
                    `<span class="text-2xl font-medium block text-center">${cityname}</span><br>
                    <div class="icon text-center">
                        <!-- <img class="mx-auto" src="https://openweathermap.org/img/wn/${icon}@2x.png"> -->

                        <i class="${showIcon(icon)} text-7xl"></i> 
                        <span class="text-2xl font-medium capitalize block">${response.weather[0].description}</span><br>
                    </div>
                    <span class="text-5xl font-bold">${temperature}°C</span>
                    <span class="align-super"><i class="fa-solid fa-arrow-up text-green-600"></i>${temp_max}°C</span>
                    <span class="align-super"><i class="fa-solid fa-arrow-down text-red-600"></i>${temp_min}°C</span><br>
                    <div class="sunrise flex items-center bg-gray-100 px-2.5 py-4 rounded my-4">
                        <i class="fa-duotone fa-sunrise text-3xl mr-5"></i>
                        <div class="text">
                            <span>Levée du soleil</span><br>
                            <span class="text-2xl font-bold">${new Date(sunrise * 1000).toTimeString().slice(0, 5).replace(':', 'h')}</span>
                        </div>
                    </div>
                    <div class="sunset flex items-center bg-gray-100 px-2.5 py-4 rounded">
                        <i class="fa-duotone fa-sunset text-3xl mr-5"></i>
                        <div class="text">
                            <span>Couché du soleil</span><br>
                            <span class="text-2xl font-bold">${new Date(sunset * 1000).toTimeString().slice(0, 5).replace(':', 'h')}</span>
                        </div>
                    </div>`
                );
            });
        });
    });
});