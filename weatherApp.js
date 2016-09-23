
$(function () {

    $.ajax({
        url: "https://api.darksky.net/forecast/50b27b3201c2b8f7dc70688446641577/37.8267,-122.4233",
        dataType: "jsonp",
        success: function (result) {
            console.log(result.currently.summary);
        }
    });

});



$(function () {

    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=41240=AIzaSyBZ3-N0emDDcRv06ohzzKn4jF00eev977Y",
        dataType: "json",
        success: function (result) {
            console.log(result);
        }
    });

});


function lookupLatLong_Complete(result) {
            var lat = result.results["0"].geometry.location.lat;
            var long = result.results["0"].geometry.location.lng;
            console.log("The lat and long is " + lat + ", " + long);
            
            var darkSkyUrl = "https://api.darksky.net/forecast/f76dbd347401ed83f364678ffc75ffae/" + lat + "," + long;
            localWeather(darkSkyUrl);
        }
        function localWeather(darkSkyUrl){
            var weather =  {
                url: darkSkyUrl,
                dataType: "jsonp",  
                success: darksky_complete
            };
        $.ajax(weather);
        }
    
        function darksky_complete(weather){
        
           console.log("Latitude: " + weather.latitude);
           console.log("Longitude: " + weather.longitude);
           console.log("Time zone: " + weather.timezone);
          console.log("Current Weather: " + weather.currently.summary);
        }
        function lookupLatLong(city, state, postalCode) {
            // Create the address.
            var address = "";
            if (postalCode.length != 0) {
                address = postalCode.trim();
            }
            else if (city.length != 0 && state != 0) {
                address = city.trim() + ", " + state;
            }
            else {
                return; // they didn't give me anything valid, so exit
            }
            
            var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBZ3-N0emDDcRv06ohzzKn4jF00eev977Y";
            var request = {
                url: googleUrl,
                success: lookupLatLong_Complete
            };
            $.ajax(request);
            
        }
// putting google and darksky together
    
function lookupWeatherForPostalCode_Click() {
    var pcode = $("#postalCode").val();
    lookupLatLong("", "", pcode);
}
//  what makes the zip work
$(function () {
    $("#lookupWeatherForPostalCode").on("click", lookupWeatherForPostalCode_Click)
});








  



