function getData() {
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;
    let latitude = document.getElementById("latitude").value;
    let longitude = document.getElementById("longitude").value;
    let granularity = "hourly";
    let parameter = document.getElementById("parameter").value;

    if (Date.parse(new Date(startDate)) > Date.parse(new Date(endDate))) {
        alert("Start date is after end date. Swapping them around")
        let swap = startDate;
        startDate = endDate;
        endDate = swap;
    }

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