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
                zoom: 8,
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
            spiderfy.addListener('mouseover', function(marker, event) {
                var markerCurrent = marker.id;
                alert("Hello: " + markerCurrent);
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
        $('#jobsListHere').html("<h3>Top 10 Jobs in the Area</h3><ol><li>Cool Job 1</li><li>Cool Job 2</li><li>Cool Job 3</li><li>Cool Job 4</li><li>Cool Job 5</li><li>Etc</li></ol>");
        $('#jobStats').html("<h3>Projected Job Growth</h3><img class='autoSize' src='./assets/images/sampleGraph1.png'>");
        $('#formEntry').html("<h2>Top 50 Hits</h2><br><h4>Job Title</h4><br><h4>City, State</h4>");

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
