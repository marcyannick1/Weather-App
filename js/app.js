import { DisplaySearhItems, DisplayCurrentWeather, Display5daysWeather } from "./function.js";

// Localisation utilisateur
navigator.geolocation.getCurrentPosition((position)=>{
    const lat = position.coords.latitude.toFixed(3)
    const lon = position.coords.longitude.toFixed(3)

    DisplayCurrentWeather(lat, lon, "", true)

    Display5daysWeather(lat, lon)
}, ()=>{
})

// Recherche de localisation
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

        DisplaySearhItems(data);

        $("li").on('click', function (e) {
            $(".search-results").empty();
            const locationIndex = e.target.id[e.target.id.length - 1]

            $("#search").val(data[locationIndex].place_name_fr)
            
            const lat = data[locationIndex].geometry.coordinates[1].toFixed(3)
            const lon = data[locationIndex].geometry.coordinates[0].toFixed(3)
            const cityname = data[locationIndex].text_fr

            $(".weather-data").empty()

            // Appel current API Weather
            DisplayCurrentWeather(lat, lon, cityname, false)

            // Appel 5 days API Weather
            Display5daysWeather(lat, lon)

        });
    })
    .catch(function (error) {
        console.log(error); 
    });
});