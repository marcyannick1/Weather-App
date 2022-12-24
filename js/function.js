export function DisplaySearhItems(data) {
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
}

export function WeatherChart(type, labelsNb, list ) {
    var date = []
    var temp = []
    if(type == "temperature"){
        var label = "Température en °C"
        for (let i = labelsNb-5; i < labelsNb; i++) {
            temp.push(list[i].main.temp)
            date.push(moment(list[i].dt * 1000).calendar())
        }
    }else if(type == "humidity"){
        var label = "Taux d'humidité en %"
        for (let i = labelsNb-5; i < labelsNb; i++) {
            temp.push(list[i].main.humidity)
            date.push(moment(list[i].dt * 1000).calendar())
        }
    }else if(type == "wind"){
        var label = "Vitesse du vent en Km/h"
        for (let i = labelsNb-5; i < labelsNb; i++) {
            temp.push((list[i].wind.speed * 3.6).toFixed(2))
            date.push(moment(list[i].dt * 1000).calendar())
        }
    }else{
        var label = "Pression en hPa"
        for (let i = labelsNb-5; i < labelsNb; i++) {
            temp.push(list[i].main.pressure)
            date.push(moment(list[i].dt * 1000).calendar())
        }  
    }

    // Chart
    const canvas = document.getElementById("myChart");

    var data = {
        labels: date,
        datasets: [
            {
                label : `${label}`,
                data: temp,
                tension : 0.2,
                fill: 'start',
                borderColor : '#2e67c3',
                backgroundColor: 'rgba(59, 130, 246, 0.2)'
            },
        ],
    };        
    var options = {
        layout : {
            padding : {
                left : 50,
                right: 50,
            }
        },
        animation: true,
        y: {
            suggestedMin: Math.min(...temp) - 5,
            suggestedMax: Math.max(...temp) + 10
          }
    }

    var config = {
        type: "line",
        data: data,
        options: options,
    }
    
    var myChart = new Chart(canvas, config)
    
    return myChart;
}

export function ShowIcon(code){
    switch (code){
        case '01d':
            return('fa-solid fa-circle')
        case '01n':
            return('fa-solid fa-circle')
        case '02d':
            return('fa-duotone fa-cloud-moon')
        case '02n':
            return('fa-duotone fa-cloud-moon')
        case '03d':
            return('fa-solid fa-cloud')
        case '03n':
            return('fa-solid fa-cloud')
        case '04d':
            return('fa-duotone fa-clouds')
        case '04n':
            return('fa-duotone fa-clouds')
        case '09d':
            return('fa-duotone fa-cloud-hail-mixed')
        case '09n':
            return('fa-duotone fa-cloud-hail-mixed')
        case '10d':
            return('fa-duotone fa-cloud-showers')
        case '10n':
            return('fa-duotone fa-cloud-showers')
        case '11d':
            return('fa-duotone fa-cloud-bolt')
        case '11n':
            return('fa-duotone fa-cloud-bolt')
        case '13d':
            return('fa-duotone fa-snowflake')
        case '13n':
            return('fa-duotone fa-snowflake')
        case '50d':
            return('fa-duotone fa-smog')
        case '50n':
            return('fa-duotone fa-smog')
    }
}

export function DisplayCurrentWeather(lat, lon, cityname, isUserLocation) {
    var settingsCurrentWeather = {
        "url": `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=775b43c6cfc7dcb4ef93f452147deda1&lang=fr&units=metric`,
        "method": "GET",
        "timeout": 0,
    };

    axios(settingsCurrentWeather)
    .then(function (response) {
        var data = response.data
        if (cityname == "") {
            cityname = response.data.name
        }

        // Center data
        const resenti = Math.round(data.main.feels_like)
        const humidity = data.main.humidity
        const pression = data.main.pressure
        const windspeed =  (data.wind.speed * 3.6).toFixed(2)

        // Right data
        const icon = data.weather[0].icon
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const temp_max = Math.round(data.main.temp_max)
        const temp_min = Math.round(data.main.temp_min)
        const sunrise = data.sys.sunrise
        const sunset = data.sys.sunset

        //Center
        $(".center .top").append(
            `
            <h2 class="font-medium text-start col-span-full">Aperçu du Jour</h2>
            <div class="flex items-center bg-gray-50 px-2.5 py-4 rounded col-span-1 max-md:col-span-full">
                <i class="fa-light fa-temperature-list text-3xl text-blue-500 mr-5"></i>
                <div class="text text-start">
                    <span class="text-gray-400">Résenti</span><br>
                    <span class="text-2xl font-bold">${resenti}°C</span>
                </div>
            </div>
            <div class="flex items-center bg-gray-50 px-2.5 py-4 rounded col-span-1 max-md:col-span-full">
                <i class="fa-light fa-droplet-percent text-3xl text-blue-500 mr-5"></i>
                <div class="text text-start">
                    <span class="text-gray-400">Taux d'humidité</span><br>
                    <span class="text-2xl font-bold">${humidity}%</span>
                </div>
            </div>
            <div class="flex items-center bg-gray-50 px-2.5 py-4 rounded col-span-1 max-md:col-span-full">
                <i class="fa-light fa-wind text-3xl text-blue-500 mr-5"></i>
                <div class="text text-start">
                    <span class="text-gray-400">Vitesse du vent</span><br>
                    <span class="text-2xl font-bold">${windspeed} Km/h</span>
                </div>
            </div>
            <div class="flex items-center bg-gray-50 px-2.5 py-4 rounded col-span-1 max-md:col-span-full">
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
            <span class="text-2xl font-medium text-center cityname">${cityname}</span>
            <div class="icon text-center my-5">
                <i class="${ShowIcon(icon)} text-7xl"></i> 
                <span class="text-2xl font-medium capitalize block">${description}</span>
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
        if (isUserLocation == true) {
            $(".cityname").before('<i class="fa-duotone fa-location-arrow mr-2"></i>');
        }

        // Favoris
        const locationData = {
            lat : lat,
            lon : lon,
            cityname : cityname
        }

        $.ajax({
            method: 'POST',
            url: 'check_fav.php',
            data: {locationData: JSON.stringify(locationData)} 
        })

        axios({
            type: "GET",
            url: "check_fav.php"
        }).then(function (response){
            if (response.data.isFavoris) {
                $(".right .icon").before('<i class="fa-solid fa-heart text-xl ml-2.5 cursor-pointer"></i>');
            } else {
                $(".right .icon").before('<i class="fa-regular fa-heart text-xl ml-2.5 cursor-pointer"></i>');
            }

            $('.right .fa-heart').click(function () {
                $('.right .fa-heart').toggleClass('fa-regular');
                $('.right .fa-heart').toggleClass('fa-solid');
                
                $.ajax({
                    method: 'POST',
                    url: 'add_favoris.php',
                    data: {locationData: JSON.stringify(locationData)} 
                })
            });
        })

    })
    .catch(function (error) {
        console.log(error);
    });
}

export function Display5daysWeather(lat, lon) {
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
                <select id="chart-type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/4 max-md:w-2/4">
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
        // list.forEach(element => {
        //     console.log(element)
        //     $(".right .5days").append(
        //         `
        //         <div class="sunset text-start flex items-center bg-gray-50 px-2.5 py-4 rounded">
        //         <i class="${ShowIcon(element.weather[0].icon)}"></i>
        //         <div class="text">
        //             <span>${moment(element.dt * 1000).calendar()}</span><br>
        //             <span class="text-2xl font-bold"></span>
        //         </div>
        //         </div>
        //         `
        //     );
        // });
    })
    .catch(function (error) {
        console.log(error);
    });
}