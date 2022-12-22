import { DisplaySearhItems, ShowIcon, WeatherChart, DisplayCurrentWeather } from "./function.js";

navigator.geolocation.getCurrentPosition((position)=>{
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    var settingsCurrentWeather = {
        "url": `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=775b43c6cfc7dcb4ef93f452147deda1&lang=fr&units=metric`,
        "method": "GET",
        "timeout": 0,
    };

    axios(settingsCurrentWeather)
    .then(function (response) {
        var currentWeatherData = response.data
        const cityname = response.data.name

        DisplayCurrentWeather(currentWeatherData, cityname)
    })
    .catch(function (error) {
        console.log(error);
    });

    // Appel 5 days API Weather
    var settings5days = {
        "url": `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=775b43c6cfc7dcb4ef93f452147deda1&units=metric&lang=fr`,
        "method": "GET",
        "timeout": 0,
    };

    axios(settings5days)
    .then(function (response) {
        $(".center .bottom").append(
            `
            <div class="col-span-full flex justify-between items-center mb-5">
                <h2 class="font-medium text-start col-span-full">
                Les 5 prochains Jours
                </h2>
                <select id="chart-type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4">
                    <option value="temperature">Température</option>
                    <option value="humidity">Taux d'humidité</option>
                    <option value="wind">Vitesse du vent</option>
                    <option value="pressure">Pression</option>
                </select>
            </div>
            <i class="fa-solid fa-chevron-left text-2xl absolute top-2/4 left-0 text-gray-300 cursor-pointer hover:text-blue-500"></i>
            <i class="fa-solid fa-chevron-right text-2xl absolute top-2/4 right-0 text-gray-300 cursor-pointer hover:text-blue-500"></i>
            <canvas id="myChart" width="270" height="90" class="chart bg-gray-50 rounded">
            </canvas>
            `
        )
        var type = $('#chart-type').val()
        var list = response.data.list
        var nb = 5

        WeatherChart(type, nb, list)

        $('#chart-type').change(function () {
            $("#myChart").remove();
            $(".center .bottom").append(
                `
                <canvas id="myChart" width="270" height="90" class="chart bg-gray-50 rounded">
                </canvas>
                `
            )
            type = $('#chart-type').val()
            WeatherChart(type, 5, list)
        });
        $(".fa-chevron-left").click(function () {
            nb -= 5
            if (nb < 5) {
                nb = 40
            }
            $("#myChart").remove();
            $(".center .bottom").append(
                `
                <canvas id="myChart" width="270" height="90" class="chart bg-gray-50 rounded">
                </canvas>
                `
            )
            WeatherChart(type, nb, list)
        });
        $(".fa-chevron-right").click(function () {
            nb += 5
            if (nb > 40) {
                nb = 5
            }
            $("#myChart").remove();
            $(".center .bottom").append(
                `
                <canvas id="myChart" width="270" height="90" class="chart bg-gray-50 rounded">
                </canvas>
                `
            )
            WeatherChart(type, nb, list)
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}, ()=>{
})

$("#search").on('keyup', function () {
    // Appel api MapBox
    var settingsMapbox = {
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${$("#search").val()}.json?types=place%2Cpostcode%2Caddress%2Cregion%2Cdistrict&language=fr&access_token=pk.eyJ1IjoibWFyY3lhbm5pY2siLCJhIjoiY2xhODdyZWswMDE2azNwbHZ3NjE3djhraiJ9.oati14hnpLbT5TRYK84T_w`,
        method: "GET",
        timeout: 0,
    };
    axios(settingsMapbox)
    .then(function (response) {
        var data = response.data.features;
    $.ajax(settingsMapbox).done(function (response) {
        const data = response.features;

        // Proposition recherche
        $(".search-results").empty();
        let id = 0
        data.forEach((element) => {
            const secondText = element.place_name_fr.split(',')
            secondText.shift()
            $(".search-results").append(
                `<li id="search-result${id}" class="search-result list-none hover:bg-gray-200 cursor-pointer py-2">
                    <span id="first-text${id}" class="first-text">
                        ${element.text_fr}
                    </span>
                    <br>
                    <span id="second-text${id}" class="second-text">
                        ${secondText.toString()}
                    </span>
                </li>`
            );
            id += 1
        });
        // Propositions recherche
        DisplaySearhItems(data);

        //Proposition cliquée
        $("li").on('click', function (e) {
            $(".search-results").empty();
            const locationIndex = e.target.id[e.target.id.length - 1]

            $("#search").val(data[locationIndex].place_name_fr)
            
            const lat = data[locationIndex].geometry.coordinates[1]
            const lon = data[locationIndex].geometry.coordinates[0]
            console.log(lat, lon)
            const cityname = data[locationIndex].text_fr

            $(".weather-data").empty()

            // Appel current API Weather
            var settingsCurrentWeather = {
                "url": `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=775b43c6cfc7dcb4ef93f452147deda1&lang=fr&units=metric`,
                "method": "GET",
                "timeout": 0,
            };

            axios(settingsCurrentWeather)
            .then(function (response) {
                var currentWeatherData = response.data
                DisplayCurrentWeather(currentWeatherData,cityname)
            })
            .catch(function (error) {
                console.log(error);
            });

            // Appel 5 days API Weather
            var settings5days = {
                "url": `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=775b43c6cfc7dcb4ef93f452147deda1&units=metric&lang=fr`,
                "method": "GET",
                "timeout": 0,
            };
            axios(settings5days)
            .then(function (response) {
                $(".center .bottom").append(
                    `
                    <div class="col-span-full flex justify-between items-center mb-5">
                        <h2 class="font-medium text-start col-span-full">
                        Les 5 prochains Jours
                        </h2>
                        <select id="chart-type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4">
                            <option value="temperature">Température</option>
                            <option value="humidity">Taux d'humidité</option>
                            <option value="wind">Vitesse du vent</option>
                            <option value="pressure">Pression</option>
                        </select>
                    </div>
                    <i class="fa-solid fa-chevron-left text-2xl absolute top-2/4 left-0 text-gray-300 cursor-pointer hover:text-blue-500"></i>
                    <i class="fa-solid fa-chevron-right text-2xl absolute top-2/4 right-0 text-gray-300 cursor-pointer hover:text-blue-500"></i>
                    <canvas id="myChart" width="270" height="90" class="chart bg-gray-50 rounded">
                    </canvas>
                    `
                )
                var type = $('#chart-type').val()
                var list = response.data.list
                var nb = 5
        
                WeatherChart(type, nb, list)
        
                $('#chart-type').change(function () {
                    $("#myChart").remove();
                    $(".center .bottom").append(
                        `
                        <canvas id="myChart" width="270" height="90" class="chart bg-gray-50 rounded">
                        </canvas>
                        `
                    )
                    type = $('#chart-type').val()
                    WeatherChart(type, 5, list)
                });
                $(".fa-chevron-left").click(function () {
                    nb -= 5
                    if (nb < 5) {
                        nb = 40
                    }
                    $("#myChart").remove();
                    $(".center .bottom").append(
                        `
                        <canvas id="myChart" width="270" height="90" class="chart bg-gray-50 rounded">
                        </canvas>
                        `
                    )
                    WeatherChart(type, nb, list)
                });
                $(".fa-chevron-right").click(function () {
                    nb += 5
                    if (nb > 40) {
                        nb = 5
                    }
                    $("#myChart").remove();
                    $(".center .bottom").append(
                        `
                        <canvas id="myChart" width="270" height="90" class="chart bg-gray-50 rounded">
                        </canvas>
                        `
                    )
                    WeatherChart(type, nb, list)
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        });
    })
    .catch(function (error) {
        console.log(error); 
    });
});