const redTraffic = document.getElementsByClassName('traffic-circle')[0];
const yellowTraffic = document.getElementsByClassName('traffic-circle')[1];
const greenTraffic = document.getElementsByClassName('traffic-circle')[2];
const stateSpan = document.getElementById('state-text');

const setTimeButton = document.getElementById('set-time-btn');
const nextStageButton = document.getElementById('next-stage-btn');

let timeoutId;
let intervalId;

let state = "red";
let redTime = 5000;
let yellowTime = 3000;
let greenTime = 7000;

function turnOff(el) {
    el.style.background = "gray";
}

function turnRed() {
    turnOff(yellowTraffic);

    redTraffic.style.background = "red";
    state = "red";
    stateSpan.textContent = "Червоний";
    timeoutId = setTimeout(turnYellow, redTime);
}

function turnYellow() {
    turnOff(redTraffic);
    turnOff(greenTraffic);
    
    yellowTraffic.style.background = "yellow";
    state = "yellowg";
    stateSpan.textContent = "Жовтий";
    timeoutId = setTimeout(turnGreen, yellowTime);
}

function turnBlinkingYellow() {
    turnOff(greenTraffic);
    
    state = "yellowr"
    stateSpan.textContent = "Жовтий";
    yellowTraffic.style.background = "yellow";
    intervalId = setInterval(() => {
        yellowTraffic.style.background = yellowTraffic.style.background === "yellow" ? "gray" : "yellow";
    }, yellowTime / 5);
    timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        turnRed();
    }, yellowTime);
}

function turnGreen() {
    turnOff(yellowTraffic);

    greenTraffic.style.background = "green";
    state = "green";
    stateSpan.textContent = "Зелений";
    timeoutId = setTimeout(turnBlinkingYellow, greenTime);
}

window.addEventListener('load', turnRed);

setTimeButton.addEventListener('click', () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);

    const times = prompt("Введіть нові значення часу станів (<червоний> <жовтий> <зелений>) в секундах", "5 3 7").split(' ').map(str => Number(str));
    
    if(times.length < 3 || times.some(num => isNaN(num))) {
        alert('Некоректно введені дані');
        turnRed();
    }
    else {
        redTime = times[0] * 1000;
        yellowTime = times[1] * 1000;
        greenTime = times[2] * 1000;
        turnRed();
    }
})

nextStageButton.addEventListener('click', () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    
    switch(state) {
        case "red":
            turnYellow();
            break;
        case "green":
            turnBlinkingYellow();
            break;        
        case "yellowr":
            turnRed();
            break;
        case "yellowg":
            turnGreen();
            break;
        default:
            turnRed();
    }
})

