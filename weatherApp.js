var locationName = " ";
var currentTemp = " ";
var precip = " ";
var max = " ";
var min = " ";
var currentSum = " ";

//pulls lat and lng from google
function lookupLatLong_Complete(result) {
        var lat = result.results[0].geometry.location.lat;
        var long = result.results[0].geometry.location.lng;

        locationName = result.results[0].formatted_address;

        //calls darksky
        var darkSkyUrl = "https://api.darksky.net/forecast/f76dbd347401ed83f364678ffc75ffae/" + lat + "," + long;
        localWeather(darkSkyUrl);

}


function localWeather(darkSkyUrl) {
        var weather = {
                url: darkSkyUrl,
                dataType: "jsonp",
                success: darksky_complete
        };

        $.ajax(weather);

}

function darksky_complete(weather) {
        // Info that is coming from darksky
        precip = weather.daily.data[1].precipIntensity;
        max = weather.daily.data[1].temperatureMax;
        min = weather.daily.data[1].temperatureMin;
        currentTemp = weather.currently.temperature;
        currentSum = weather.currently.summary;

        generateNewCard();
}
function lookupLatLong(city, state, postalCode) {
        var address = "";
        if (postalCode.length != 0) {
                address = postalCode.trim();
        }
        else if (city.length != 0 && state != 0) {
                address = city.trim() + ", " + state;
        }
        else {
                return;
        }


        var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBYlXyp7yQ0n8EYG0lotJPD7sdfKj24PNg";

        var request = {
                url: googleUrl,
                success: lookupLatLong_Complete
        };

        $.ajax(request);
}



function lookupWeatherForPostalCode_Click() {
        var pcode = $("#ZIP").val();
        lookupLatLong("", "", pcode);
}
function newCard() {
        var template =
                $("#templateCard").html();
        //Replace values
        template = template.replace("@@CITY@@", locationName);
        template = template.replace("@@TEMP@@", parseInt(currentTemp) + "&degF <br/> <br/> <br/>" + currentSum);
        template = template.replace("@@HIGH@@", "High" + "<br/>" + parseInt(max) + "&degF");
        template = template.replace("@@LOW@@", "Low" + "<br/>" + parseInt(min) + "&degF");
        template = template.replace("@@PRECIP@@", "Precip" + "<br/>" + precip + " %");

        return template;
};

function generateNewCard() {

        var card = newCard();
        $("#cards").append(card);

}





$(function () {
        $("#lookupWeatherForPostalCode").on("click", lookupWeatherForPostalCode_Click)
        $(document).on('click', '#remove', function () {
                $(this).closest('div').remove();
        });

});




