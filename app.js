$("#search").keyup(function (e) {
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

        //Proposition cliquée
        $("li").click(function (e) {
            $(".search-results").empty();
            const locationIndex = e.target.id[e.target.id.length - 1]

            const lat = data[locationIndex].geometry.coordinates[1]
            const lon = data[locationIndex].geometry.coordinates[0]

            console.log(lat, lon)
        });
    });
});