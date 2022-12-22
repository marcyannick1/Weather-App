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
    // myChart.destroy();

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
    
    // myChart.destroy()
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

export function DisplayCurrentWeather(data, cityname) {
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
                <span class="text-2xl font-bold">${windspeed} Km/h</span>
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
        <i class="fa-regular fa-heart text-xl mb-5 ml-2.5 cursor-pointer"></i>
        <div class="icon text-center mb-5">
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

    $('.right .fa-heart').click(function () { 
        console.log('heart')
        $('.right .fa-heart').toggleClass('fa-regular');
        $('.right .fa-heart').toggleClass('fa-solid');
    });
}