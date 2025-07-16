'use strict';

// variables and elements

let score = 0,
    reward = 3000,
    bonus = 0,
    level = 1,
    lives = 3,
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
    rewardPanelNumber = document.querySelector('.score-panel__reward_num'),
    livesPanelNumber = document.querySelector('.score-panel__lives_num'),
    levelPanelNumber = document.querySelector('.score-panel__level_num'),
    gunman = document.querySelector('.gunman'),
    hat = document.querySelector('.hat'),
    message = document.querySelector('.message');


function updateStats() {
    scorePanelNumber.textContent = score;
    rewardPanelNumber.textContent = reward;
    levelPanelNumber.textContent = level;
    livesPanelNumber.textContent = lives;
    timePanelGunman.textContent = (gunmanTime / 100).toFixed(2);
    timePanelPlayer.textContent = '0.00';
}

function startGame() {
    level = 1;
    score = 0;
    gameMenu.style.display = 'none';
    updateStats();
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

function gameOver() {
    message.style.display = 'none';
    gameWrapper.style.display = 'none';
    setTimeout(() => {
        gameMenu.style.display = 'block';
    }) 
}

function nextLevel() {
    winSound.pause();
    gameWrapper.style.display = 'none';
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
    gunmanTime -= 30;
    reward += 500;
    updateStats();
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
    gunman.classList.toggle(`gunman-level-${level}__standing`);
    gameScreen.classList.toggle('shootable');

    const timeoutId = setTimeout(() => {
        gunman.classList.toggle(`gunman-level-${level}__standing`)
        waitSound.pause();
        timeCounter();
    }, timeToWait);
    
    gameScreen.onclick = () => {
        gameScreen.onclick = null;
        gameScreen.classList.toggle('shootable');
        clearTimeout(timeoutId);
        playerShootsEarly();
    };
}

function screenShot() {
    shotPlayerSound.currentTime = 0;
    shotPlayerSound.play();
    gameScreen.classList.toggle('game-screen--shot');
    setTimeout(() => {
        gameScreen.classList.toggle('game-screen--shot');
        gameScreen.onclick = screenShot;
    }, 500);
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
            gameScreen.onclick = null;
            clearInterval(intervalId);
            gunman.classList.toggle(`gunman-level-${level}__ready`)
            gunmanShootsPlayer();
        }
    }, 10);
    gameScreen.onclick = screenShot;
    gunman.onclick = () => {
        gunman.onclick = null;
        message.classList.toggle('message--fire');
        clearInterval(intervalId);
        bonus = ((gunmanTime / 10) - Math.floor(playerTime / 10)) * 1000;
        gunman.classList.toggle(`gunman-level-${level}__ready`)
        setTimeout(() => {
            gameScreen.onclick = null;
        }, 501);
        playerShootsGunman();
    }
}

function gunmanShootsPlayer() {
    gunman.classList.remove('shootable');
    gameScreen.classList.remove('shootable');
    lives--;
    score -= reward;
    livesPanelNumber.textContent = lives;
    scorePanelNumber.textContent = score;
    shotPlayerSound.currentTime = 0;
    shotPlayerSound.play();
    gunman.classList.toggle(`gunman-level-${level}__shooting`);
    
    deathSound.currentTime = 0;
    deathSound.play();
    gameScreen.classList.toggle('game-screen--death');
    if(lives > 0) {
        setTimeout(() => {
            message.classList.toggle('message--dead');
            message.textContent = 'You lost.';
        }, 3000);
        setTimeout(() => {
            buttonRestart.style.display = 'block';
        }, 4000);
    }
    else {
        setTimeout(() => {
            message.classList.toggle('message--dead');
            message.textContent = 'You are ded.';
        }, 3000);
        setTimeout(() => {
            message.textContent += '\nGame over.'
        }, 7000);
        setTimeout(gameOver, 9000);
    }
}

function playerShootsGunman() {
    gunman.classList.remove('shootable');
    gameScreen.classList.remove('shootable');
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
    lives -= 1;
    livesPanelNumber.textContent = lives;
    waitSound.pause();
    foulSound.currentTime = 0;
    foulSound.play();
    
    message.classList.toggle('message--dead');
    message.textContent = 'Foul!!!';
    const intervalId = setInterval(() => {
        message.style.visibility = message.style.visibility == 'visible' ? 'hidden' : 'visible';
    }, 100);
    if(lives > 0) {
        setTimeout(() => {
            clearInterval(intervalId);
            message.style.visibility = 'visible';
            buttonRestart.style.display = 'block';
        }, 1500);
    }
    else {
        setTimeout(() => {
            clearInterval(intervalId);
            message.style.visibility = 'visible';
            message.textContent += '\nGame over.'
        }, 1500);
        setTimeout(gameOver, 2500);
    }
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