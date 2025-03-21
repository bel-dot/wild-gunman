const switchBtn = document.getElementById('switch');
const switchImg = document.getElementById('switch-img');
const bulbDiv = document.getElementById('bulb-div');
const bulb = document.getElementById('bulb');

const defaultBulbBtn = document.getElementById('default-bulb-btn');
const energyBulbBtn = document.getElementById('energy-bulb-btn');
const LEDBulbBtn = document.getElementById('led-bulb-btn');
const brightnessBtn = document.getElementById('brightness-btn');

function switchLight() {
    switchImg.className = switchImg.className === 'off' ? 'on' : 'off'; 
    bulbDiv.classList.toggle('enabled');
}

function setToEnergyBulb() {
    bulb.classList.remove('default');
    bulb.classList.remove('led');
    bulb.classList.add('energy');
    
    bulbDiv.classList.remove('default');
    bulbDiv.classList.remove('led');
    bulbDiv.classList.add('energy');
}

function setToDefaultBulb() {
    bulb.classList.remove('energy');
    bulb.classList.remove('led');
    bulb.classList.add('default');
    
    bulbDiv.classList.remove('energy');
    bulbDiv.classList.remove('led');
    bulbDiv.classList.add('default');
}

function setToLEDBulb() {
    bulb.classList.remove('energy');
    bulb.classList.remove('default');
    bulb.classList.add('led');
    
    bulbDiv.classList.remove('energy');
    bulbDiv.classList.remove('default');
    bulbDiv.classList.add('led');
}

function changeBrightness() {
    const brightness = prompt('Введіть значення яскравості від 1 до 100', 100);
    if(brightness > 100 || brightness < 1) {
        alert('Некоректно введене значення!');
    } 
    else {
        bulbDiv.style.opacity = `${brightness / 100}`;
    }
}

switchBtn.addEventListener('click', switchLight);
defaultBulbBtn.addEventListener('click', setToDefaultBulb);
energyBulbBtn.addEventListener('click', setToEnergyBulb);
LEDBulbBtn.addEventListener('click', setToLEDBulb);
brightnessBtn.addEventListener('click', changeBrightness);
