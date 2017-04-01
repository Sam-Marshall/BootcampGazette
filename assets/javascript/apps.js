$(document).ready(function() {

    //information for awesomeplete auto-complete for jobs search
    var input = document.getElementById("job-input");
    var awesomplete = new Awesomplete(input, {
        minChars: 1,
        maxItems: 5,
        autoFirst: true
    });

    //auto-complete array of job possibilities
    awesomplete.list = ["UX Architect/Lead", "DevOps Engineer", ".NET Developer", "Business Systems Analyst", "Junior Developer", "Security Risk Analyst", "Software Quality Assurance Analyst", "Data Analyst", "Project Manager", "Mechanical Engineer", "Angular JS Developer", "Chemical Engineer", "Laboratory Technician", "Laboratory Manager", "Developer", "Java Developer", "Java Engineer", "Software Developer", "Sr Software Developer", "Senior Software Developer", "Sr App Developer", "Senior App Developer", "Android Developer", "Java Script/Node Developer", "Application Solution Developer", "Application Solution Engineer", "Python Developer", "Full Stack Developer", "System Engineer", "Senior Security Engineer", "Desktop Support Technician", "Software Engineer"];

    //lat lng storage of all jobs in array
    var locationArray = [];
    //variable to hold the Dice information regarding job URL of first 50 results
    var jobUrlArray = [];
    //holds job location formatted as 'city, state'
    var jobLocation = "";
    //store lat and long of user input city/state searched to center the map on inquiry
    var jobLocationLatLong = [];
    //variable to hold the Dice information regarding job title of first 50 results
    var jobTitleArray = [];
    //variable to hold the Dice information regarding company name of first 50 results
    var jobCompanyArray = [];
    //user input in the 'Job Title' field
    var job = "";
    //variable to hold Dice information regarding when the job was posted of first 50 results
    var jobPostDate = [];
    //variable to hold html for payscale form
    var htmlPayScaleForm = "";

    //firebase
    var config = {
        apiKey: "AIzaSyAbJ91qY97twuQ2Pro2lVB7Fq0-O-d8u94",
        authDomain: "jobportal-17688.firebaseapp.com",
        databaseURL: "https://jobportal-17688.firebaseio.com",
        projectId: "jobportal-17688",
        storageBucket: "jobportal-17688.appspot.com",
        messagingSenderId: "550571516137"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //filling out table for 5 most recent searches
    database.ref().on("value", function(snapshot) {
        console.log(snapshot.val());
        var svArr = Object.keys(snapshot.val());
        console.log(svArr);

        for (var i = 0; i < 5; i++) {
            var toBeSubtracted = i + 1;
            var lastIndex = svArr.length - toBeSubtracted;
            var lastKey = svArr[lastIndex];
            var lastObj = snapshot.val()[lastKey];

            console.log(lastObj);
            var lastCity = lastObj.city;
            var lastJob = lastObj.job;
            var lastState = lastObj.state;

            $('#job' + [i]).html(lastJob);
            $('#city' + [i]).html(lastCity);
            $('#state' + [i]).html(lastState);

        }

    }, function(errorObject) {

        console.log("The firebase read failed: " + errorObject.code);

    });

    function generatePayScaleTable() {
        htmlPayScaleForm =
            '<script type="text/javascript" defer="defer">' +
            'PayScaleExtension.affiliateId = \'\';PayScaleExtension.srcId = \'calcA3\';PayScaleExtension.ServiceURL = \'https://www.payscale.com\';PayScaleExtension.init();' +
            '</script>' +

            '<div class="PayscaleSalaryCalculator" id="PayscaleSalaryCalculator1">' +
            '<div id="PayscaleHeadingSection">' +
            '<div id="SalaryResearch">' +
            '<span id="PayscaleSalaryCalculatorReset1" class="spnLaquo" onclick="javascript:PayScaleExtension.resetSalaryCalculatorV3R(\'PayscaleSalaryCalculatorContent1\',\'PayscaleSalaryCalculatorResults1\', \'PayscaleSalaryCalculatorReset1\')">&laquo;</span> Salary Research' +
            '</div>' +

            // '<div id="SalaryResearchLogo">' +
            // '<a rel="nofollow" href="https://www.payscale.com/?af=&src=calcA3" target="_blank">' +
            // '<img id="payscaleLogo" src="https://cdn-payscale.com/images/powered-by-payscale.png" alt="PayScale"/>' +
            // '</a>' +
            // '</div>' +
            // '</div>' +

            '<div id="PayscaleSalaryCalculatorContent1">' +
            '<form id="PayScale_startModule" name="startModule" action="https://www.payscale.com/syndication/total_pay_chart.aspx" method="get">' +
            '<table cellpadding="5" cellspacing="0" border="0" id="startModuleTable">' +

            '<tr valign="middle">' +
            '<td>' +
            '<label style="font-family: OldNewspaperTypes">Job Title</label>' +
            '<input type="text" name="jobTitle" class="payscaleText" id="PayScale_jobTitle1" value="" placeholder=" e.g. Mechanical Engineer" maxlength="100"/>' +
            '</td>' +
            '</tr>' +

            '<tr id="startModule_cityRow">' +
            '<td>' +
            '<label style="font-family: OldNewspaperTypes">City</label>' +
            '<input type="text" name="city" class="payscaleText" id="PayScale_city1" value="" placeholder=" e.g. Chicago" maxlength="100"/>' +
            '</td>' +
            '</tr>' +

            '<tr id="stateRow" style="display: ">' +
            '<td valign="bottom">' +
            '<label>' +
            '<span style="font-family: OldNewspaperTypes" id="startModule_stateLabel">State</span>' +
            '</label>' +

            '<div>' +
            '<span id="startModule_stateDropDown_dropDown"><span>' +
            '<select class="clsCountryDropDown" id="PayScale_stateDropDown1" name="state" onchange=""><option value="">- Select State -</option></span><br /><span><option value="Alabama">Alabama</option></span><br /><span><option value="Alaska">Alaska</option></span><br /><span><option value="Arizona">Arizona</option></span><br /><span><option value="Arkansas">Arkansas</option></span><br /><span><option value="California">California</option></span><br /><span><option value="Colorado">Colorado</option></span><br /><span><option value="Connecticut">Connecticut</option></span><br /><span><option value="Delaware">Delaware</option></span><br /><span><option value="District of Columbia">District of Columbia</option></span><br /><span><option value="Florida">Florida</option></span><br /><span><option value="Georgia">Georgia</option></span><br /><span><option value="Hawaii">Hawaii</option></span><br /><span><option value="Idaho">Idaho</option></span><br /><span><option value="Illinois">Illinois</option></span><br /><span><option value="Indiana">Indiana</option></span><br /><span><option value="Iowa">Iowa</option></span><br /><span><option value="Kansas">Kansas</option></span><br /><span><option value="Kentucky">Kentucky</option></span><br /><span><option value="Louisiana">Louisiana</option></span><br /><span><option value="Maine">Maine</option></span><br /><span><option value="Maryland">Maryland</option></span><br /><span><option value="Massachusetts">Massachusetts</option></span><br /><span><option value="Michigan">Michigan</option></span><br /><span><option value="Minnesota">Minnesota</option></span><br /><span><option value="Mississippi">Mississippi</option></span><br /><span><option value="Missouri">Missouri</option></span><br /><span><option value="Montana">Montana</option></span><br /><span><option value="Nebraska">Nebraska</option></span><br /><span><option value="Nevada">Nevada</option></span><br /><span><option value="New Hampshire">New Hampshire</option></span><br /><span><option value="New Jersey">New Jersey</option></span><br /><span><option value="New Mexico">New Mexico</option></span><br /><span><option value="New York">New York</option></span><br /><span><option value="North Carolina">North Carolina</option></span><br /><span><option value="North Dakota">North Dakota</option></span><br /><span><option value="Ohio">Ohio</option></span><br /><span><option value="Oklahoma">Oklahoma</option></span><br /><span><option value="Oregon">Oregon</option></span><br /><span><option value="Pennsylvania">Pennsylvania</option></span><br /><span><option value="Rhode Island">Rhode Island</option></span><br /><span><option value="South Carolina">South Carolina</option></span><br /><span><option value="South Dakota">South Dakota</option></span><br /><span><option value="Tennessee">Tennessee</option></span><br /><span><option value="Texas">Texas</option></span><br /><span><option value="Utah">Utah</option></span><br /><span><option value="Vermont">Vermont</option></span><br /><span><option value="Virginia">Virginia</option></span><br /><span><option value="Washington">Washington</option></span><br /><span><option value="West Virginia">West Virginia</option></span><br /><span><option value="Wisconsin">Wisconsin</option></span><br /><span><option value="Wyoming">Wyoming</option></span><br /><span></select></span></span></div>' +
            '<button id="submitPSButtonImage" class="btn" onclick="javascript:PayScaleExtension.displaySalaryCalculatorV3R(document.getElementById(\'PayScale_jobTitle1\').value,document.getElementById(\'PayScale_city1\').value,document.getElementById(\'PayScale_stateDropDown1\').value,document.getElementById(\'PayScale_country1\').value, \'#333333\', \'#a5d34c\',\'PayscaleSalaryCalculatorContent1\', false, \'PayscaleSalaryCalculatorResults1\', \'PayscaleSalaryCalculatorReset1\');return false;">Submit</button>' +
            '</td>' +
            '</tr>' +

            '<tr>' +
            '<td align="right"><input type="hidden" id="PayScale_stateDropDown1" name="state" value="" />' +
            '<input type="hidden" id="PayScale_country1" name="country" value="United States" />' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '</form>' +
            '</div>' +

            '<div id="PayscaleSalaryCalculatorResults1"></div></div>';

        var $payScaleForm = $("#payScaleForm");
        var span = document.createElement('span');
        span.innerHTML = htmlPayScaleForm;
        $payScaleForm.html(span);
    }
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
                    //getting storing user city and state in variables to return weather of location
                    var userLocation = response.results[0].formatted_address;
                    var userCity = response.results[0].address_components[3].long_name;
                    var userState = response.results[0].address_components[5].short_name;
                    var userCityState = userCity + "," + userState;
                    $('#weatherLocation').html(userCityState);
                    getWeather(userCityState);

                    console.log(userCityState);
                    console.log(response.results[0].address_components[3].long_name);
                    console.log(response.results[0].address_components[5].short_name);
                    $("#userlocation").text(userLocation);

                });
            });
        }
    }

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
            var article3 = response.articles[2];

            $(".article-1 .title").text(article1.title);
            $(".article-1 .description").text(article1.description);
            $(".article-1 .articleImage").attr("src", article1.urlToImage);
            $(".article-1 .articleImage").addClass("newsImg");
            $(".article-1 .link").attr("href", article1.url);
            $(".article-1 .date").text(article1.publishedAt);

            $(".article-2 .title").text(article2.title);
            $(".article-2 .description").text(article2.description);
            $(".article-2 .articleImage").attr("src", article2.urlToImage);
            $(".article-2 .articleImage").addClass("newsImg");
            $(".article-2 .link").attr("href", article2.url);
            $(".article-2 .date").text(article2.publishedAt);

            $(".article-3 .title").text(article3.title);
            $(".article-3 .description").text(article3.description);
            $(".article-3 .articleImage").attr("src", article3.urlToImage);
            $(".article-3 .articleImage").addClass("newsImg");
            $(".article-3 .link").attr("href", article3.url);
            $(".article-3 .date").text(article3.publishedAt);

        });
    }

    //get weather info
    function getWeather(location) {
        var weatherAPIKey = "6600f874ba527145933cc89563343b71";
        var getweatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + weatherAPIKey;
        $.ajax({
            url: getweatherURL,
            method: "GET"
        }).done(function(response) {
            console.log(response.main);
            var humidity = response.main.humidity;
            console.log(humidity);
            $('#localHumidity').html(humidity + "%");
            var temperature = Math.round((9 / 5) * (response.main.temp - 273) + 32);
            $('#localTemp').html(temperature + "F");
            var tempHigh = Math.round((9 / 5) * (response.main.temp_max - 273) + 32);
            $('#highTemp').html(tempHigh + "F");
            var tempLow = Math.round((9 / 5) * (response.main.temp_min - 273) + 32);
            $('#lowTemp').html(tempLow + "F");
            console.log(temperature);
        });

    }
    //get current time
    function printTime() {
        var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        $("#currentTime").text(currentTime);
    }

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

    //get company information from Glassdoor
    function companyReviewGlassdoor(company) {
        var tpID = "134832";
        var tkID = "gwCCc0SqSnc";
        jobLocation = jobLocation.split(' ').join('+');
        var companyUrl = "https://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=" + tpID + "&t.k=" + tkID + "&action=employers&q=" + company + "&l=" + jobLocation;
        console.log(companyUrl);
        $.ajax({
            url: companyUrl,
            method: 'GET',
            dataType: 'jsonp'
        }).done(function(response) {

            console.log(response.response.employers[0]);
            var checkIfEmpty = response.response.employers[0];
            console.log(checkIfEmpty);

            //some companies do not have the usual job info and were showing 'undefined' errors in the console log
            //this if/else is checking for the existence of the data we expect
            //if the data does not exist all data in the table defaults to No Data and the logo link takes the user to the 
            //Glassdoor webpage of the company instead of an external company URL

            if (typeof checkIfEmpty == "undefined") {
                var companyLogoURL = "./assets/images/questionMark.png";
                var overallRating = "No Data";
                var cultureAndValuesRating = "No Data";
                var workLifeBalanceRating = "No Data";
                var recommendToFriendRating = "No Data";
                var companyName = "No Data";
                var companyWebsite = response.response.attributionURL;


            } else {

                var overallRating = response.response.employers[0].overallRating;
                var cultureAndValuesRating = response.response.employers[0].cultureAndValuesRating;
                var workLifeBalanceRating = response.response.employers[0].workLifeBalanceRating;
                var recommendToFriendRating = response.response.employers[0].recommendToFriendRating;
                var companyName = response.response.employers[0].name;
                var companyWebsite = response.response.employers[0].website;
                var companyLogoURL = response.response.employers[0].squareLogo;
                //some companies didn't have a logo, so the placeholder is a green questionmark
                if (companyLogoURL === "") {
                    companyLogoURL = "./assets/images/questionMark.png";
                }

            }

            var logoLink = '<a target="_blank" href="https://' + companyWebsite + '"><img src="' + companyLogoURL + '"style="width: 35px; height: 35px;"></a>';
            console.log(logoLink);
            console.log(companyLogoURL);

            var tableRow = $('<tr>');
            var columnOne = $('<td>').append(logoLink);
            var columnTwo = $('<td>').text(companyName);
            var columnThree = $('<td>').text(overallRating);
            var columnFour = $('<td>').text(cultureAndValuesRating);
            var columnFive = $('<td>').text(workLifeBalanceRating);
            var columnSix = $('<td>').text(recommendToFriendRating);

            tableRow.append(columnOne);
            tableRow.append(columnTwo);
            tableRow.append(columnThree);
            tableRow.append(columnFour);
            tableRow.append(columnFive);
            tableRow.append(columnSix);

            // div.append(tableRow);
            $('#newRowHere').append(tableRow);
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
                zoom: 10,
                scrollwheel: false,
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

                //closes open payscale window if a marker is clicked on (only works on PS form screen not results screen)
                if ($(".payScale").hasClass("hidden") === false) {
                    $(".payScale").toggleClass("hidden");
                }
            });
            //Mouseover markers pop-up only works for final marker created. Could fix in future
            // gm.event.addListener(marker, "mouseover", function() {

            //     var markerCurrent = "Test: " + this.id;
            //     infoWindow.close();
            //     infoWindow.setContent(markerCurrent);
            //     infoWindow.open(map, marker);

            // });
            // gm.event.addListener(marker, "mouseout", function() {
            //     var markerCurrent = " ";
            //     infoWindow.close();
            // });

        });
    }
    
    geolocator();
    getNews();
    setInterval(printTime, 1000);
    getTodayQuote();

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
        generatePayScaleTable();

        //Hide articles, show data tables/forms, change input field backgrounds to white
        $(".article-1").css('display', 'none');
        $("#insertWeather").css('display', 'none');
        $(".payScale").css('display', 'block');
        $('#insertPrevSearches').css('display', 'none');
        $('#mapPayScaleParent').css('display', 'block');
        $(".article-2").css('display', 'none');
        $(".article-3").css('display', 'none');
        $("#payScaleBtn").removeClass('hidden');
        $("#glassdoorTable").css('display', 'block');
        $("#formEntry").css('display', 'none');
        $('.topBarInfo').css('display', 'none');
        $('.line').css('display', 'none');
        $('#TitleImage').css('display', 'none');
        $('#job-input').css("background", 'white');
        $('#city-input').css("background", 'white');
        $('#state-input').css("background", 'white');
        $("#state-cost-table").removeClass('hidden');
        $("#StockTickerContainer").css('display', 'none');


        //empty variables for new search
        locationArray = [];
        jobTitleArray = [];
        jobUrlArray = [];
        jobLocation = "";
        jobLocationLatLong = [];
        jobCompanyArray = [];
        job = "";
        jobPostDate = [];

        job = $("#job-input").val().trim();
        $('#jobSearchPosition').html(job);
        $('#jobSearchPosition2').html(job);

        var jobCity = $("#city-input").val().trim();
        var jobState = $("#state-input").val().trim();
        jobLocation = jobCity + ", " + jobState;
        $('#jobSearchLocation').html(jobLocation);
        $('#jobSearchLocation2').html(jobLocation);
        // var jobGeoCenter = "https://maps.googleapis.com/maps/api/geocode/json?address=Bangalore&sensor=false";

        database.ref().push({
            job: job,
            city: jobCity,
            state: jobState
        });

        job = job.split(' ').join('+');
        // $("#state-cost-header").html("How affordable is " + jobCity.toUpperCase() + "?");

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

                    var locationElement = responsecity.results[0].geometry.location;
                    locationArray.push(locationElement);


                }); //done function
                promises.push(promise);
                console.log(promise);
            } //for loop
            console.log(jobCompanyArray);
            $.when.apply(this, promises).then(myMap);
        }); //done function

        //getting city costs from Numbeo, leaving out of app for accessibility reasons
        // var CityCostURL = "https://www.numbeo.com/api/city_prices?api_key=x0nilg3vso6mp1&query=" + jobCity;
        // $.ajax({
        //     url: CityCostURL,
        //     method: "GET",
        // }).done(function(response) {
        //     console.log(response);

        // });


        $("#payScaleBtn").on("click", function() {
            $(".payScale").toggleClass("hidden");
        });


    }); //submit button


});
