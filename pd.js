
window.addEventListener("DOMContentLoaded", init);


function init() {
    registerEvent();

    let data = dataset()
    Plotly.newPlot('tester', data);
}


function dataset() {
    let x = [];
    let y0 = [];
    let y1 = [];
    let y2 = [];

    let dx = 0.01;

    let param0 = readParameter("line0");
    let param1 = readParameter("line1");
    let param2 = readParameter("line2");
    // console.log(param1)

    for (let i = 0; i < 1000; i++) {
        let xx = i * dx - 5;
        x.push(xx);

        y0.push(normalDistribution(xx, param0.average, param0.variance))
        y1.push(normalDistribution(xx, param1.average, param1.variance))
        y2.push(normalDistribution(xx, param2.average, param2.variance))
    }

    let trace0 = { x: x, y: y0, type: 'scatter' };
    let trace1 = { x: x, y: y1, type: 'scatter' };
    let trace2 = { x: x, y: y2, type: 'scatter' };
    return [trace0, trace1, trace2];
}


function redrawGraph() {
    let data = dataset()
    Plotly.react('tester', data);
}


function registerEvent(){
    const paramElements = document.getElementsByClassName("params");
    for (let i = 0; i < paramElements.length; i++) {
        paramElements[i].addEventListener('change', (event) => {
            // let element = event.target;
            // console.log(event);
            // console.log(element.value);
            redrawGraph();
        });
    }
}


function readParameter(id){
    id = id || "line0"
    let average = document.getElementById(id).getElementsByClassName("average")[0].value;
    let variance = document.getElementById(id).getElementsByClassName("variance")[0].value;
    return {average:average, variance:variance};
}


// Normal distributiopn
function normalDistribution(x, average, variance){
    average = average || 0;
    variance = variance || 1;
    return Math.exp( - ((x - average)**2 / (2*variance)) ) / Math.sqrt(2 * Math.PI * variance);
}
