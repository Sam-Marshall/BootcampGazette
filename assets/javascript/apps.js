$(document).ready(function() {

    //for information autocomplete for jobs search
    var input = document.getElementById("job-input");
    var awesomplete = new Awesomplete(input, {
        minChars: 1,
        maxItems: 5,
        autoFirst: true
    });

    awesomplete.list = ["Mechanical Engineer", "Chemical Engineer", "Laboratory Technician", "Laboratory Manager", "Developer", "Java Developer", "Java Engineer", "Software Developer", "Sr Software Developer", "Senior Software Developer", "Sr App Developer", "Senior App Developer", "Android Developer", "Java Script/Node Developer", "Application Solution Developer", "Application Solution Engineer", "Python Developer", "Full Stack Developer", "System Engineer", "Senior Security Engineer", "Desktop Support Technician"];

    //lat lng storage
    var locationArray = [];
    //job url storage for click event to be fixed later
    var jobUrlArray = [];
    var jobLocation = "";
    var jobLocationLatLong = [];
    var jobTitleArray = [];
    var jobCompanyArray = [];
    var job = "";
    var jobPostDate = [];

    //get location of the user  
    function geolocator() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                var queryURLgeo = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.lat + "," + pos.lng + "&key=AIzaSyB_GC-33tMoeP_2GlBptjFH0ZIcER8Ztqg"
                $.ajax({
                    url: queryURLgeo,
                    method: "GET"
                }).done(function(response) {

                    var userLocation = response.results[0].formatted_address;
                    console.log(userLocation);
                    $("#userlocation").text(userLocation);
                });
            });
        }
    }

    geolocator();

//get news for front page
    function getNews() {
        var getNewsURL = "https://newsapi.org/v1/articles?source=techcrunch&apiKey=aabe6370d0da41d19293747b576aab51";
        $.ajax({
            url: getNewsURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response);
             var article1 = response.articles[0];
             var article2 = response.articles[1];
       
             $(".article-1 .title").text(article1.title);
             $(".article-1 .description").text(article1.description);
             $(".article-1 .image").attr("src",article1.urlToImage);
             $(".article-1 .link").attr("href",article1.url);
             $(".article-1 .date").text(article1.publishedAt);

             $(".article-2 .title").text(article2.title);
             $(".article-2 .description").text(article2.description);
             $(".article-2 .image").attr("src",article2.urlToImage);
             $(".article-2 .link").attr("href",article2.url);
             $(".article-2 .date").text(article2.publishedAt);

        });
    }

getNews();

    //get current time
    function printTime() {
        var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        $("#currentTime").text(currentTime);
    }

    setInterval(printTime, 1000);

    //get quote of the day
    function getTodayQuote() {
        var getQuoteURL = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=localjsonp";
        $.ajax({
            url: getQuoteURL,
            dataType: 'jsonp',
            jsonpCallback: 'localjsonp'
        }).done(function(response) {
            console.log(response);
            $("#quote").text('"' + response.quoteText + '"');
            $("#author").text('-' + response.quoteAuthor);
        });
    }

    getTodayQuote();


    function companyReviewGlassdoor(company) {
        var tpID = "134832";
        var tkID = "gwCCc0SqSnc";
        jobLocation = jobLocation.split(' ').join('+');
        var companyUrl = "http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=" + tpID + "&t.k=" + tkID + "&action=employers&q=" + company + "&l=" + jobLocation;
        console.log(companyUrl);
        $.ajax({
            url: companyUrl,
            method: 'GET',
            dataType: 'jsonp'
        }).done(function(response) {
            console.log(response.response.employers[0]);
        });
    }


    function myMap() {

        console.log(jobLocation);
        console.log(jobCompanyArray);
        var cityQueryUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + jobLocation + "&key=AIzaSyB_GC-33tMoeP_2GlBptjFH0ZIcER8Ztqg";
        $.ajax({
            url: cityQueryUrl,
            method: 'GET'
        }).done(function(response) {
            console.log(response);

            jobLocationLatLong.push(response.results[0].geometry.location);
            console.log(jobLocationLatLong);

            var gm = google.maps
            var mapProp = {
                center: new gm.LatLng(jobLocationLatLong[0].lat, jobLocationLatLong[0].lng),
                zoom: 9,
            };

            console.log(jobUrlArray);
            console.log(jobTitleArray);


            var map = new gm.Map(document.getElementById('map'), mapProp);
            var spiderfy = new OverlappingMarkerSpiderfier(map, {
                keepSpiderfier: true
            });
            var infoWindow = new gm.InfoWindow();
            console.log(locationArray);

            for (var i = 0; i < locationArray.length; i++) {
                var datum = locationArray[i];
                var loc = new gm.LatLng(datum.lat, datum.lng);
                var marker = new gm.Marker({
                    position: loc,
                    id: i,
                    map: map,
                    URL: jobUrlArray[i],
                    jobTitle: jobTitleArray[i],
                    company: jobCompanyArray[i],
                    postDate: jobPostDate[i]

                });

                spiderfy.addMarker(marker);
                marker.setMap(map);
            }
            spiderfy.addListener('click', function(marker, event) {
                var contentString =
                    '<div id="content" class="text-left">' +
                    '<a target="_blank" href="' + marker.URL + '">' +
                    '<strong>' + marker.jobTitle + '</strong></a>' +
                    '<br><span>Company: ' + marker.company + '</span>' +
                    '<br><span>Date Posted: ' + marker.postDate + '</span>' +
                    '</div>';
                var activeMarkerCompany = marker.company.split(' ').join('+');
                console.log(activeMarkerCompany);
                companyReviewGlassdoor(activeMarkerCompany);
                infoWindow.close();
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);

            });
            //Mouseover only works for final item added to array. Why?
            gm.event.addListener(marker, "mouseover", function() {

                var markerCurrent = "Test: " + this.id;
                infoWindow.close();
                infoWindow.setContent(markerCurrent);
                infoWindow.open(map, marker);

            });
            gm.event.addListener(marker, "mouseout", function() {
                var markerCurrent = " ";
                infoWindow.close();
            });

        });
    }

    $("#submit-btn").on("click", function(event) {
        // input validation block
        event.preventDefault();
        var isFormValid = true;

        if (!$('#job-input').val()) {
            $('#job-input').attr("placeholder", "Please enter a valid job");
            $('#job-input').css("background", "#FAA");
            isFormValid = false;
        }
        if (!$('#city-input').val()) {
            $('#city-input').css("background", "#FAA");
            $('#city-input').attr("placeholder", "Please enter a valid city");
            isFormValid = false;
        }
        if (!$('#state-input').val()) {
            $('#state-input').css("background", "#FAA");
            isFormValid = false;
        }
        if (!isFormValid) {
            return;
        }

        $("#jobsListHere").css('display', 'none');
        $(".payScale").css('display', 'block');
        // $("#formEntry").css('display', 'none');
        $("#jobStats").css('display', 'none');
        //empty array for new search
        locationArray = [];
        jobTitleArray = [];

        $('#textHere').html("");

        // marker.setMap(null);

        job = $("#job-input").val().trim();
        job = job.split(' ').join('+');
        var jobCity = $("#city-input").val().trim();
        var jobState = $("#state-input").val().trim();
        jobLocation = jobCity + ", " + jobState;
        var jobGeoCenter = "http://maps.googleapis.com/maps/api/geocode/json?address=Bangalore&sensor=false";
        console.log(jobLocation);
        console.log(jobGeoCenter);
        console.log(jobLocationLatLong);

        var queryURL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=" + job + "&city=" + jobCity + ",+" + jobState;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            console.log(response);

            var results = response.resultItemList;

            console.log(results);
            var promises = [];

            for (i = 0; i < results.length; i++) {

                jobUrlArray.push(results[i].detailUrl);
                jobTitleArray.push(results[i].jobTitle);
                jobCompanyArray.push(results[i].company);
                jobPostDate.push(results[i].date);

                var city = results[i].location;


                var queryURLcity = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyB_GC-33tMoeP_2GlBptjFH0ZIcER8Ztqg";


                var promise = $.ajax({
                    url: queryURLcity,
                    method: "GET"
                }).done(function(responsecity) {

                    locationArray.push(responsecity.results[0].geometry.location);


                }); //done function
                promises.push(promise);
                console.log(promise);
            } //for loop
            console.log(jobCompanyArray);
            $.when.apply(this, promises).then(myMap);
        }); //done function



    }); //submit button


});
