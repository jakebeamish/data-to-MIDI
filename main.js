// Define base portion of the Geocode API request URL
const geocode = "https://geocode.maps.co/search?q=";

// Define base portion of the Open Meteo API request URL
const open_meteo = "https://archive-api.open-meteo.com/v1/archive?";


// Get coordinates for a given location using the Geocode API
// User can enter place name (country, city, etc.) or an address, or a postal code

async function getLoc() {

  // Define query portion of the API request URL
  let location_string = document.getElementById("location").value;

  // Replace spaces in the query string with '+'
  let location_url = geocode + location_string.replace(' ', '+');

  // Get the data
  const response = await fetch(location_url);
  let location = await response.json();

  // The API usually returns an array of 10 locations ordered by 'importance'
  // console.log(location);


  // Assume the most accurate location is the first one
  location = location[0];

  // Show the location's display name and attributes
  document.getElementById("place_name").innerText = location.display_name;
  // document.getElementById("place_attributes").innerText = location.class + ", " + location.type;
 
  // Update latitude and longitude values in the form
  document.getElementById("latitude").setAttribute('value', location.lat);
  document.getElementById("longitude").setAttribute('value', location.lon);
}


// Get weather data using the Open Meteo Historical Weather Data API
// User defines latitude and longitude (possibly auto-populated by getLoc() function)
// as well as start and end dates, and a chosen weather parameter

async function getData() {

  // Define start date
  let startDate = document.getElementById("start-date").value;

  // Define end date
  let endDate = document.getElementById("end-date").value;

  // If the start date is after the end date, swap them
  // TODO   THIS IS BROKEN
  if (Date.parse(new Date(startDate)) > Date.parse(new Date(endDate))) {
    // alert("Start date is after end date. Swapping them around");

    let swap = startDate;
    startDate = endDate;
    endDate = swap;
    document.getElementById("start-date").setAttribute('value', startDate);
    document.getElementById("end-date").setAttribute('value', endDate);
    // startDate = endDate;
    // endDate = swap;
  }

  // Define parameter of weather data
  let parameter = document.getElementById("parameter").value;

  // Define granularity of weather data (this is currently fixed to 'hourly').
  // Daily data points are also available, but the parameters are slightly different,
  // so the input form would have to adapt to this option dynamically
  let granularity = "hourly";

  console.log("Getting " + parameter + " data from " + startDate + " to " + endDate)

  // Build the API request URL
  let data_url = open_meteo + "latitude=52.52&longitude=13.41&" + "start_date=" + startDate + "&end_date=" + endDate + "&" + granularity + "=" + parameter;

  // Get the data
  const response = await fetch(data_url);
  data = await response.json();

  // Log the data
  console.table(data.hourly);

}
