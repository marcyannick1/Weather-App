import { WeatherChart } from "/function.js";
import { ShowIcon } from "/function.js";
import { DisplaySearhItems } from "/function.js";

navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position)
}, ()=>{
    // console.log('nop')
    $("body").append(
        `
        
<button class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="popup-modal">
Toggle modal
</button>

<div id="popup-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
  <div class="relative w-full h-full max-w-md md:h-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Close modal</span>
          </button>
          <div class="p-6 text-center">
              <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
              <button data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Yes, I'm sure
              </button>
              <button data-modal-toggle="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
          </div>
      </div>
  </div>
</div>

        `
    )
})

$("#search").on('keyup', function (e) {
    // Appel api MapBox
    var settingsMapbox = {
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${$("#search").val()}.json?types=place%2Cpostcode%2Caddress%2Cregion%2Cdistrict&language=fr&access_token=pk.eyJ1IjoibWFyY3lhbm5pY2siLCJhIjoiY2xhODdyZWswMDE2azNwbHZ3NjE3djhraiJ9.oati14hnpLbT5TRYK84T_w`,
        method: "GET",
        timeout: 0,
    };

    $.ajax(settingsMapbox).done(function (response) {
        var data = response.features;

        // Proposition recherche
        DisplaySearhItems(data);

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

                // Center data
                const resenti = Math.round(response.main.feels_like)
                const humidity = response.main.humidity
                const pression = response.main.pressure
                const windspeed = response.wind.speed
                // Right data
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
                    <div class="flex items-center bg-gray-50 px-2.5 py-4 rounded col-span-1">
                        <i class="fa-light fa-temperature-list text-3xl text-blue-500 mr-5"></i>
                        <div class="text text-start">
                            <span class="text-gray-400">Résenti</span><br>
                            <span class="text-2xl font-bold">${resenti}°C</span>
                        </div>
                    </div>
                    <div class="flex items-center bg-gray-50 px-2.5 py-4 rounded col-span-1">
                        <i class="fa-light fa-droplet-percent text-3xl text-blue-500 mr-5"></i>
                        <div class="text text-start">
                            <span class="text-gray-400">Taux d'humidité</span><br>
                            <span class="text-2xl font-bold">${humidity}%</span>
                        </div>
                    </div>
                    <div class="flex items-center bg-gray-50 px-2.5 py-4 rounded col-span-1">
                        <i class="fa-light fa-wind text-3xl text-blue-500 mr-5"></i>
                        <div class="text text-start">
                            <span class="text-gray-400">Vitesse du vent</span><br>
                            <span class="text-2xl font-bold">${(windspeed * 3.6).toFixed(2)} Km/h</span>
                        </div>
                    </div>
                    <div class="flex items-center bg-gray-50 px-2.5 py-4 rounded col-span-1">
                        <i class="fa-light fa-tire-pressure-warning text-3xl text-blue-500 mr-5"></i>
                        <div class="text text-start">
                            <span class="text-gray-400">Pression</span><br>
                            <span class="text-2xl font-bold">${pression} hPa</span>
                        </div>
                    </div>
                    `
                );

                // Right
                $(".right.weather-data").append(
                    `
                    <span class="text-2xl font-medium text-center">${cityname}</span>
                    <i class="fa-regular fa-heart text-2xl mb-5"></i>
                    <div class="icon text-center mb-5">
                        <i class="${ShowIcon(icon)} text-7xl"></i> 
                        <span class="text-2xl font-medium capitalize block">${response.weather[0].description}</span>
                    </div>
                    <span class="text-5xl font-bold">${temperature}°C</span>
                    <span class="align-super"><i class="fa-solid fa-arrow-up text-green-600"></i>${temp_max}°C</span>
                    <span class="align-super"><i class="fa-solid fa-arrow-down text-red-600"></i>${temp_min}°C</span><br>
                    <div class="sunrise text-start flex items-center bg-gray-50 px-2.5 py-4 rounded my-4">
                        <i class="fa-duotone fa-sunrise text-3xl mr-5"></i>
                        <div class="text">
                            <span>Levée du soleil</span><br>
                            <span class="text-2xl font-bold">${moment(sunrise * 1000).format('LT')}</span>
                        </div>
                    </div>
                    <div class="sunset text-start flex items-center bg-gray-50 px-2.5 py-4 rounded">
                        <i class="fa-duotone fa-sunset text-3xl mr-5"></i>
                        <div class="text">
                            <span>Couché du soleil</span><br>
                            <span class="text-2xl font-bold">${moment(sunset * 1000).format('LT')}</span>
                        </div>
                    </div>`
                );
            });

            // Appel 5 days API Weather
            var settings5days = {
                "url": `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=775b43c6cfc7dcb4ef93f452147deda1&units=metric&lang=fr`,
                "method": "GET",
                "timeout": 0,
            };

            $.ajax(settings5days).done(function (response) {
                var list = response.list

                $(".center .weather-data").append(
                    `
                    <h2 class="font-medium text-start col-span-full">
                    Les 5 prochains Jours
                    </h2>
                        <canvas id="myChart" width="250" height="100" class="bg-gray-50 rounded">
                        </canvas>
                    `
                )
                var labelsNB = 5
                WeatherChart(labelsNB, list)
            });

        });
    });
});