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
    winScreen = document.querySelector('.win-screen'),
    gameScreen = document.querySelector('.game-screen'),
    timePanelGunman = document.querySelector('.time-panel__gunman'),
    timePanelPlayer = document.querySelector('.time-panel__you'),
    scorePanelNumber = document.querySelector('.score-panel__score_num'),
    levelPanelNumber = document.querySelector('.score-panel__level_num'),
    gunman = document.querySelector('.gunman'),
    hat = document.querySelector('.hat'),
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
    level = 1;
    score = 0;
    scorePanelNumber.textContent = score;
    levelPanelNumber.textContent = level;
    gameMenu.style.display = 'none';
    timePanelGunman.textContent = (gunmanTime / 100).toFixed(2);
    gunman.classList.add(`gunman-level-${level}`);
    setTimeout(() => {
        gameWrapper.style.display = 'block';
        moveGunman();
    }, 500);
}

buttonStart.onclick = startGame;

function restartGame() {
    deathSound.pause();
    foulSound.pause();
    gameWrapper.style.display = 'none';
    timePanelPlayer.textContent = '0.00';
    buttonRestart.style.display = 'none';
    gameScreen.classList.remove('game-screen--death');
    gunman.classList.remove(`gunman-level-${level}__shooting`);
    gunman.classList.remove(`gunman-level-${level}__standing`)
    message.classList.remove('message--dead');
    message.textContent = '';
    setTimeout(() => {
        gameWrapper.style.display = 'block';
        moveGunman();
    }, 500);
}

buttonRestart.onclick = restartGame;

function nextLevel() {
    winSound.pause();
    gameWrapper.style.display = 'none';
    timePanelPlayer.textContent = '0.00';
    buttonNext.style.display = 'none';
    gunman.classList.remove(`gunman-level-${level}__death`);
    gameScreen.classList.remove('game-screen--win');
    hat.classList.remove(`hat-level-${level}`);
    message.classList.remove('message--win');
    message.textContent = '';
    
    gunman.classList.remove(`gunman-level-${level}`);
    level++;
    if(level == 6) {
        winGame();
        return;
    }
    gunman.classList.add(`gunman-level-${level}`);
    levelPanelNumber.textContent = level;
    gunmanTime -= 30;
    timePanelGunman.textContent = (gunmanTime / 100).toFixed(2);
    reward += 500;
    setTimeout(() => {
        gameWrapper.style.display = 'block';
        moveGunman();
    }, 500);
}

buttonNext.onclick = nextLevel;

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
    gunman.classList.toggle('shootable');

    const timeoutId = setTimeout(() => {
        gunman.classList.toggle(`gunman-level-${level}__standing`)
        waitSound.pause();
        timeCounter();
    }, timeToWait);
    
    gunman.onclick = () => {
        gunman.onclick = null;
        gunman.classList.toggle('shootable');
        clearTimeout(timeoutId);
        playerShootsEarly();
    };
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
            gunman.classList.toggle('shootable');
            gunmanShootsPlayer();
        }
    }, 10);
    gunman.onclick = () => {
        gunman.onclick = null;
        message.classList.toggle('message--fire');
        clearInterval(intervalId);
        bonus = ((gunmanTime / 10) - Math.floor(playerTime / 10)) * 1000;
        gunman.classList.toggle(`gunman-level-${level}__ready`)
        gunman.classList.toggle('shootable');
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
    if(level == 1 || level >= 4) {
        shotGunmanSound.currentTime = 0;
        shotGunmanSound.play();
    }
    else {
        shotPlayerSound.currentTime = 0;
        shotPlayerSound.play();
    }
    gunman.classList.toggle(`gunman-level-${level}__death`);
    hat.classList.toggle(`hat-level-${level}`);
    gameScreen.classList.toggle('game-screen--win');
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

function playerShootsEarly() {
    waitSound.pause();
    foulSound.currentTime = 0;
    foulSound.play();
    
    message.classList.toggle('message--dead');
    message.textContent = 'Foul!!!';
    const intervalId = setInterval(() => {
        message.style.visibility = message.style.visibility == 'visible' ? 'hidden' : 'visible';
    }, 100);
    setTimeout(() => {
        clearInterval(intervalId);
        message.style.visibility = 'visible';
        buttonRestart.style.display = 'block';
    }, 1500);
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


function winGame() {
    winScreen.style.display = 'block'; 
}