$(document).ready(function() {

    //for information autocomplete for jobs search
    var input = document.getElementById("job-input");
    var awesomplete = new Awesomplete(input, {
        minChars: 1,
        maxItems: 5,
        autoFirst: true
    });

    awesomplete.list = ["UX Architect/Lead", "DevOps Engineer", ".NET Developer", "Business Systems Analyst", "Junior Developer", "Security Risk Analyst", "Software Quality Assurance Analyst", "Data Analyst", "Project Manager", "Mechanical Engineer", "Angular JS Developer", "Chemical Engineer", "Laboratory Technician", "Laboratory Manager", "Developer", "Java Developer", "Java Engineer", "Software Developer", "Sr Software Developer", "Senior Software Developer", "Sr App Developer", "Senior App Developer", "Android Developer", "Java Script/Node Developer", "Application Solution Developer", "Application Solution Engineer", "Python Developer", "Full Stack Developer", "System Engineer", "Senior Security Engineer", "Desktop Support Technician", "Software Engineer"];

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
    var htmlPayScaleForm = "";


    function generatePayScaleTable() {
        htmlPayScaleForm =
            '<script type="text/javascript" defer="defer">' +
            'PayScaleExtension.affiliateId = \'\';PayScaleExtension.srcId = \'calcA3\';PayScaleExtension.ServiceURL = \'http://www.payscale.com\';PayScaleExtension.init();' +
            '</script>' +

            '<div class="PayscaleSalaryCalculator" id="PayscaleSalaryCalculator1">' +
            '<div id="PayscaleHeadingSection">' +
            '<div id="SalaryResearch">' +
            '<span id="PayscaleSalaryCalculatorReset1" class="spnLaquo" onclick="javascript:PayScaleExtension.resetSalaryCalculatorV3R(\'PayscaleSalaryCalculatorContent1\',\'PayscaleSalaryCalculatorResults1\', \'PayscaleSalaryCalculatorReset1\')">&laquo;</span> Salary Research' +
            '</div>' +

            // '<div id="SalaryResearchLogo">' +
            // '<a rel="nofollow" href="http://www.payscale.com/?af=&src=calcA3" target="_blank">' +
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
            console.log(response.response.employers);
            console.log("Overall Rating: " + response.response.employers[0].overallRating);
            console.log("Culture and Values Rating: " + response.response.employers[0].cultureAndValuesRating);
            console.log("Work Life Balance Rating: " + response.response.employers[0].workLifeBalanceRating);
            console.log("Recommend To Friend Rating: " + response.response.employers[0].recommendToFriendRating);

            // var trHTML = '';

            //Work in Progress
            var div = $('<div>');

            var overallRating = response.response.employers[0].overallRating;
            var cultureAndValuesRating = response.response.employers[0].cultureAndValuesRating;
            var workLifeBalanceRating = response.response.employers[0].workLifeBalanceRating;
            var recommendToFriendRating = response.response.employers[0].recommendToFriendRating;

            var tableRow = $('<tr>');
            var columnOne = $('<td>').text(overallRating);
            var columnTwo = $('<td>').text(cultureAndValuesRating);
            var columnThree = $('<td>').text(workLifeBalanceRating);
            var columnFour = $('<td>').text(recommendToFriendRating);

            tableRow.append(columnOne);
            tableRow.append(columnTwo);
            tableRow.append(columnThree);
            tableRow.append(columnFour);

            div.append(tableRow);
            $('#newRowHere').append(div);



            // $.each(response.response.employers[0], function() {
            //     trHTML = '<tr><td>' + response.response.employers[0].overallRating + '</td></tr>';
            //     $('#glassdoorTable').append(trHTML);
            // })


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
        generatePayScaleTable();

        //Hide articles, show data tables/forms, change input field backgrounds to white
        $(".article-1").css('display', 'none');
        $(".payScale").css('display', 'block');
        $('#mapPayScaleParent').css('display', 'block');
        $(".article-2").css('display', 'none');
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
        job = job.split(' ').join('+');
        var jobCity = $("#city-input").val().trim();
        var jobState = $("#state-input").val().trim();
        jobLocation = jobCity + ", " + jobState;
        $('#jobSearchLocation').html(jobLocation);
        $('#jobSearchLocation2').html(jobLocation);
        var jobGeoCenter = "http://maps.googleapis.com/maps/api/geocode/json?address=Bangalore&sensor=false";
        console.log(jobLocation);
        console.log(jobGeoCenter);
        console.log(jobLocationLatLong);


        $("#state-cost-header").html("How affordable is " + jobCity.toUpperCase() + "?");

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

        //getting city costs from Numbeo
        var CityCostURL = "https://www.numbeo.com/api/city_prices?api_key=x0nilg3vso6mp1&query=" + jobCity;
        $.ajax({
            url: CityCostURL,
            method: "GET",
        }).done(function(response) {
            console.log(response);

        });


        $("#payScaleBtn").on("click", function (){ 
        $(".payScale").toggleClass("hidden");
       });


    }); //submit button


});
