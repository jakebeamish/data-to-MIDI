let lat = 52;
let lon = 13;
let startDate = '1955-12-14';
let endDate = '1970-02-01';
let datatime = 'hourly';
let parameter = 'temperature_2m';
let questionURL = `https://archive-api.open-meteo.com/v1/archive?${lat}&${lon}&${startDate}&${endDate}&${datatime}=${parameter}`;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    button = createButton('Get data');
    button.position(width * 0.5, height * 0.1);
    button.mousePressed(getData);
}

function getData() {
    console.log('getting data...');
    loadJSON(questionURL, gotData)
}

function gotData(data) {
    console.log('got data:')
    console.table(data);
}

function draw() {
    line(0, 0, width, height)
}