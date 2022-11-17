$("#search").keyup(function (e) {
    // Appel api MapBox
    var settingsMapbox = {
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${$(
            "#search"
        ).val()}.json?limit=6&proximity=ip&types=place%2Cpostcode%2Caddress%2Cregion%2Cdistrict&language=fr&access_token=pk.eyJ1IjoibWFyY3lhbm5pY2siLCJhIjoiY2xhODdyZWswMDE2azNwbHZ3NjE3djhraiJ9.oati14hnpLbT5TRYK84T_w`,
        method: "GET",
        timeout: 0,
    };

    $.ajax(settingsMapbox).done(function (response) {
        const data = response.features;

        // Proposition recherche
        $(".search-results").empty();
        data.forEach((element) => {
            const li = `<li class="search-resut list-none hover:bg-gray-200 cursor-pointer py-2">${element.place_name_fr}</li>`;
            $(".search-results").append(li);
        });

        //Proposition cliquée
        $("li").click(function (e) {
            $(".search-results").empty();
            data.forEach((element) => {
                if(element.place_name_fr == e.target.innerText){
                    console.log(element)
                }
            });
        });
    });
});