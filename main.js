// Define base portion of the Geocode API request URL
const geocode = "https://geocode.maps.co/search?q=";

// Define base portion of the Open Meteo API request URL
const open_meteo = "https://archive-api.open-meteo.com/v1/archive?";

// Define a data set called 'data'
let data;

// Stop p5 from trying to draw things that don't exist yet
let started = false;

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

  let latitude = document.getElementById("latitude").value;
  let longitude = document.getElementById("longitude").value;

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

  // console.log("Getting " + parameter + " data from " + startDate + " to " + endDate)

  // Build the API request URL
  let data_url = open_meteo + "latitude=" + latitude + "&longitude=" + longitude + "&start_date=" + startDate + "&end_date=" + endDate + "&" + granularity + "=" + parameter;

  // Get the data
  const response = await fetch(data_url);
  data = await response.json();
  // return data;
  // Log the data
  // console.table(data.hourly);
  document.getElementById("report").innerText =
    `${data.hourly.time.length} data points showing ${Object.keys(data.hourly)[1]} at ${latitude}, ${longitude} from ${startDate} to ${endDate}`;
  start();
}

function preload() {
  // getData();
  // console.log(data);
}

function setup() {
  createCanvas(720, 128);
  noLoop();
}

function draw() {


  if (started) {

    let start = new Date(data.hourly.time[0]).toDateString();
    let data_length = data.hourly.time.length - 1;
    let end = new Date(data.hourly.time[data_length]).toDateString();

    // console.log(Object.keys(data.hourly))
    clear();
    background(255);
    // console.log(data);


    for (let i = 0; i < data.hourly.time.length; i++) {
      let x = (i / data.hourly.time.length) * width;
      let y = height / 2 - Object.values(data.hourly)[1][i];
      // strokeWeight(1);
      if (data.hourly.time.length > width) {
        if (i % 200 == 0) point(x, y);
      } else {
        point(x, y);
      }
      if (x > 0) {
        // line(x, )
      }
    }



    // text(Object.keys(data.hourly)[0], 10, 10)
    // text(Object.keys(data.hourly)[1], 10, 20)

    // text(data.hourly.time.length + ' data points from ' + start + ' to ' + end, width/2, 10)
  }
}

function start() {
  started = true;
  loop();
}