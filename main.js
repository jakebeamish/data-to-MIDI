let coordinates, latitude, longitude;

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    document.getElementById("latitude").value = crd.latitude;
    document.getElementById("longitude").value = crd.longitude;
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

function getLocation() {
    navigator.geolocation.getCurrentPosition(success, error, options);

}

function getData() {
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;

    if (Date.parse(new Date(startDate)) > Date.parse(new Date(endDate))) {
        alert("Start date is after end date. Swapping them around")
        let swap = startDate;
        startDate = endDate;
        endDate = swap;
    }

    latitude = document.getElementById("latitude").value;
    longitude = document.getElementById("longitude").value;

    let granularity = "hourly";
    let parameter = document.getElementById("parameter").value;

    buildURL(startDate, endDate, latitude, longitude, granularity, parameter)
}

function buildURL(startDate, endDate, latitude, longitude, granularity, parameter) {
    const openMeteo = "https://archive-api.open-meteo.com/v1/archive?";

    let openMeteoURL = openMeteo + "latitude=" + latitude + "&" +
        "longitude=" + longitude + "&" +
        "start_date=" + startDate + "&" +
        "end_date=" + endDate + "&" +
        granularity + "=" + parameter;

    console.log(openMeteoURL);
}


  