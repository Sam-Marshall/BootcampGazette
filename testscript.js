$(document).ready(function() {
    //lat lng storage
    var locationArray = [];
    //job url storage for click event to be fixed later
    var jobUrlArray = [];

    $("#submit-btn").on("click", function(event) {
        //empty array for new search
        locationArray = [];

        $('#textHere').append("");

        event.preventDefault();

        var job = $("#job-input").val().trim();

        var queryURL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=" + job;



        //http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=134847&t.k=eNprP3MRqUy&userip=192.168.43.42&useragent=Mozilla/%2F4.0&q=janitor
        //http://api.glassdoor.com/api/api.htm?t.p=134847&t.k=eNprP3MRqUy&userip=0.0.0.0&useragent=&format=json&v=1&action=jobs-stats&returnStates=true&admLevelRequested=1
                      //dumps all states
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(handleJobSiteResponse);
        setTimeout(myMap, 3000);
    }); //submit button


      function handleJobSiteResponse(response) {
            console.log(response);

            var results = response.resultItemList;

            for (i = 0; i < results.length; i++) {
                //trying to capture job links. Work in progress
                jobUrlArray.push(results[i].detailUrl);

                console.log(jobUrlArray);
                var city = results[i].location;
                console.log(city);

                var queryURLcity = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyB_GC-33tMoeP_2GlBptjFH0ZIcER8Ztqg";

                $.ajax({
                    url: queryURLcity,
                    method: "GET"
                }).done(function(responsecity) {
                    locationArray.push(responsecity.results[0].geometry.location);
                }); //done function
            } //for loop
        }); //done function

    function myMap() {
        var mapProp = {
            center: new google.maps.LatLng(39.833333, -98.585522),
            zoom: 4,
        };

        var map = new google.maps.Map(document.getElementById('map'), mapProp);

        //looping through array to add markers for each locale
        for (var i = 0; i < locationArray.length; i++) {

            var myLatLng = {
                lat: locationArray[i].lat,
                lng: locationArray[i].lng
            };

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Hello World'
            }); //marker object

            marker.setMap(map);
            marker.addListener('click', function() {
                alert("Boop!");
                map.setZoom(8); //random map-centered zoom
                $('#textHere').append("Click!");
            }); //Listener
        }
    }
});