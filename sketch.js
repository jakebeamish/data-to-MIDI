function setup() {
    createCanvas(windowWidth, windowHeight);
    button = createButton('Get data');
    button.position(width * 0.5, height * 0.1);
    button.mousePressed(getData);
}

function getData() {
    console.log('getting data...');
    let lat = 52;
    let lon = 13;
    let startDate = 1955-12-14;
    let endDate = 1970-02-01;
    let datatime = 'hourly';
    let parameter = 'temperature_2m';
    let url = `https://archive-api.open-meteo.com/v1/archive?${lat}&${lon}&${startDate}&${endDate}&${datatime}=${parameter}`;
    loadJSON('https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2022-12-14&end_date=2023-01-13&hourly=temperature_2m', gotData)
}

function gotData(data) {
    console.log('got data:')
    console.table(data);
}

function draw() {

}