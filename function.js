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

export function WeatherChart(labelsNb, list ) {
    var date = []
    var temp = []
    for (let i = labelsNb-5; i < labelsNb; i++) {
        temp.push(list[i].main.temp)
        date.push(moment(list[i].dt * 1000).calendar())
    }

    // Chart
    const canvas = document.getElementById("myChart");

    var data = {
        labels: date,
        datasets: [
            {
                label : 'Température en °C',
                data: temp,
                tension : 0.2,
                fill: true,
                borderColor : '#2e67c3',
                backgroundColor: 'rgba(59, 130, 246, 0.2)'
            },
        ],
    };        
    var options = {
        layout : {
            padding : 25
        }
    }

    var config = {
        type: "line",
        data: data,
        options: options,
    }
    
    return new Chart(canvas, config);
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