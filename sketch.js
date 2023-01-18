function setup() {
    createCanvas(windowWidth, windowHeight);
    button = createButton('Get data');
    button.position(width * 0.5, height * 0.1);
    button.mousePressed(getData);
}

function getData() {
    console.log('getting data...')
    loadJSON('https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2022-12-14&end_date=2023-01-13&hourly=temperature_2m', gotData)
}

function gotData(data) {
    console.log('got data:')
    console.table(data);
}

function draw() {

}