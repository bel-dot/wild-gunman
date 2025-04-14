'use strict';

// variables and elements

let score = 0,
    reward = 3000,
    bonus = 0,
    level = 1,
    gunmanTime = 150;

const buttonStart = document.querySelector('.button-start-game'),
    buttonRestart = document.querySelector('.button-restart'),
    buttonNext = document.querySelector('.button-next-level'),
    gameMenu = document.querySelector('.game-menu'),
    gameWrapper = document.querySelector('.wrapper'),
    gameScreen = document.querySelector('.game-screen'),
    timePanelGunman = document.querySelector('.time-panel__gunman'),
    timePanelPlayer = document.querySelector('.time-panel__you'),
    scorePanelNumber = document.querySelector('.score-panel__score_num'),
    gunman = document.querySelector('.gunman'),
    message = document.querySelector('.message'),
    introSound = new Audio('sfx/intro.m4a'),
    fireSound = new Audio('sfx/fire.m4a'),
    shotGunmanSound = new Audio('sfx/shot-fall.m4a'),
    shotPlayerSound = new Audio('sfx/shot.m4a'),
    deathSound = new Audio('sfx/death.m4a'),
    foulSound = new Audio('sfx/foul.m4a'),
    winSound = new Audio('sfx/win.m4a'),
    waitSound = new Audio('sfx/wait.m4a');


function startGame() {
    gameMenu.style.display = 'none';
    timePanelGunman.textContent = (gunmanTime / 100).toFixed(2);
    gunman.classList.toggle(`gunman-level-${level}`);
    setTimeout(() => {
        gameWrapper.style.display = 'block';
        moveGunman();
    }, 500);
}

buttonStart.onclick = startGame;

function restartGame() {

}

function nextLevel() {

}

function moveGunman() {
    introSound.currentTime = 0;
    introSound.play();
    gunman.classList.toggle(`gunman-level-${level}__walk`);
    setTimeout(() => {
        gunman.classList.toggle(`gunman-level-${level}__walk`);
        prepareForDuel();
    }, 5000);
}

function prepareForDuel() {
    const timeToWait = 500 + Math.floor((Math.random() * 1500));

    waitSound.loop = true;
    waitSound.currentTime = 0;
    waitSound.play();
    gunman.classList.toggle(`gunman-level-${level}__standing`)

    setTimeout(() => {
        gunman.classList.toggle(`gunman-level-${level}__standing`)
        waitSound.pause();
        timeCounter();
    }, timeToWait);
}

function timeCounter() {
    let playerTime = 0;
    fireSound.currentTime = 0;
    fireSound.play();
    gunman.classList.toggle(`gunman-level-${level}__ready`)
    message.classList.toggle('message--fire');

    const intervalId = setInterval(() => {
        playerTime += 1;
        timePanelPlayer.textContent = (playerTime / 100).toFixed(2);
        if(playerTime > gunmanTime) {
            message.classList.toggle('message--fire');
            gunman.onclick = null;
            clearInterval(intervalId);
            gunman.classList.toggle(`gunman-level-${level}__ready`)
            gunmanShootsPlayer();
        }
    }, 10);
    gunman.onclick = () => {
        message.classList.toggle('message--fire');
        clearInterval(intervalId);
        bonus = ((gunmanTime / 10) - Math.floor(playerTime / 10)) * 1000;
        gunman.classList.toggle(`gunman-level-${level}__ready`)
        playerShootsGunman();
    }
}

function gunmanShootsPlayer() {
    shotPlayerSound.currentTime = 0;
    shotPlayerSound.play();
    gunman.classList.toggle(`gunman-level-${level}__shooting`);
    
    deathSound.currentTime = 0;
    deathSound.play();
    gameScreen.classList.toggle('game-screen--death');
    setTimeout(() => {
        message.classList.toggle('message--dead');
        message.textContent = 'You are ded.';
    }, 3000);
    setTimeout(() => {
        buttonRestart.style.display = 'block';
    }, 4000);
}

function playerShootsGunman() {
    shotGunmanSound.currentTime = 0;
    shotGunmanSound.play();
    gunman.classList.toggle(`gunman-level-${level}__death`);
    const intervalId = setInterval(() => {
        timePanelPlayer.style.visibility = timePanelPlayer.style.visibility == 'visible' ? 'hidden' : 'visible';
    }, 500);
    
    setTimeout(() => {
        message.classList.toggle('message--win');
        message.textContent = 'You won!';
        winSound.currentTime = 0;
        winSound.play();
    }, 1500);
    setTimeout(() => {
        clearInterval(intervalId);
        timePanelPlayer.style.visibility = 'visible';
        scoreCount();
    }, 2500);
}

function scoreCount() {
    if(bonus > 0) {
        score += bonus;
        message.textContent += `\nBonus: ${bonus}`;
    }
    
    score += reward;
    scorePanelNumber.textContent = score;
    buttonNext.style.display = 'block';
}
