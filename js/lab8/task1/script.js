'use strict'

let width = 6,
    height = 6,
    time = 180,
    currentTime = time,
    steps = 0,
    intervalId = '',
    twoPlayers = false,
    round = 1,
    rounds = 1,
    nameFirst = 'Player 1',
    nameSecond = 'Player 2',
    timeFirst = 0,
    timeSecond = 0,
    stepsFirst = 0,
    stepsSecond = 0,
    scoreFirst = 0,
    scoreSecond = 0,
    intervalIdFirst = '',
    intervalIdSecond = '',
    turn = true,
    pairsAmount = (width * height) / 2;

const roundResults = [];

const images = [
    { name: "evw", url: "https://media1.tenor.com/m/morPeOgGlkkAAAAd/erivvanwilderman-geometry-dash.gif" },
    { name: "normal", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgUbk38tKTnRvyJdoId2c3UqTxrUcbUzPoKQ&s" },
    { name: "colon", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiSaR3LSzCYXw5ZlBdQ9Tih_a9FB917503ig&s" },
    { name: "michigun", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJXzfCCqVe452VmMY2ii23piKq7pCViXWFA&s" },
    { name: "robtop", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWi8B8p0ccTrbLuNT5STlbvaoDKJ_kfn4yhg&s" },
    { name: "boomkitty", url: "https://i.scdn.co/image/ab676161000051740537e4e52505684d70275b45" },
    { name: "waterflame", url: "https://yt3.googleusercontent.com/vYbhw3MueeU3uaf-gIgx1ybgrJs_lqxrZgiUMRyphhstfBV_wReu4drozput5YcA7y2WL4g3Yw=s900-c-k-c0x00ffffff-no-rj" },
    { name: "titan", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbmuloNJDQAiIVOBNwZhsaxh_W2K_E0QRTWQ&s" },
    { name: "decody", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJXcgCP_lCfczzruOcxs_XS82bOz18CQ1M6Q&s" },
    { name: "vortrox", url: "https://i.ytimg.com/vi/W4S9d3xCGMI/sddefault.jpg" },
    { name: "bloodbath", url: "https://i.ytimg.com/vi/LjlkMdZ9eJ0/maxresdefault.jpg" },
    { name: "sammelot", url: "https://static.wikia.nocookie.net/youtube/images/b/b2/KingSammelotClips.jpg" },
    { name: "dash", url: "https://i.redd.it/hjcrljvkpgec1.jpeg" },
    { name: "congregation", url: "https://static.wikia.nocookie.net/geometry-dash-fan/images/7/7e/Congregation.jpg" },
    { name: "vortex", url: "https://preview.redd.it/pc1c9a2598t91.png?width=640&crop=smart&auto=webp&s=7a2d813f1d769dc1db723a30dee9f6011013fd1b" },
    { name: "maffaka", url: "https://pbs.twimg.com/profile_images/1333109176785129472/ChjBA7UG_400x400.jpg" },
    { name: "vernam", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbwrXagI8pyv2u8Ymh4GldwhqsugCTeulxQ&s" },
    { name: "limbo", url: "https://external-preview.redd.it/i-made-the-limbo-keys-in-3d-guess-which-one-is-the-correct-v0-b3FvbHcxaW53cXhjMUL-bknpD9KqUlrx0iBtsTuauBRzIUrYAJ0fUNC7tP5Z.png?format=pjpg&auto=webp&s=635941593e86a2011045d81a2a90f7d1548992df" }
];
      

let pair = [];

const cardsContainer = document.getElementById('memory-cards'),
    restartButton = document.getElementById('restart-btn'),
    nextRoundButton = document.getElementById('next-round'),
    sizeSelect = document.getElementById('size-select'),
    difficultySelect = document.getElementById('difficulty-select'),
    resetSettingsButton = document.getElementById('reset-btn'),
    startGameButton = document.getElementById('start-game'),
    roundsInput = document.getElementById('rounds-input'),
    firstPlayerNameInput = document.getElementById('first-player-name'),
    secondPlayerNameInput = document.getElementById('second-player-name'),
    turnSpan = document.getElementById('turn-span'),
    roundSpan = document.getElementById('round-span'),
    timeSpan = document.getElementById('time-span'),
    stepsSpan = document.getElementById('steps-span'),
    stepsFirstSpan = document.getElementById('steps-1-span'),
    stepsSecondSpan = document.getElementById('steps-2-span'),
    scoreFirstSpan = document.getElementById('score-1-span'),
    scoreSecondSpan = document.getElementById('score-2-span'),
    resultsPre = document.getElementById('results-pre'),
    twoPlayerResultsPre = document.getElementById('two-player-results-pre'),
    soundCheck = document.getElementById('sound-check'),
    jumpscareCheck = document.getElementById('jumpscare-check'),
    twoPlayersCheck = document.getElementById('two-player-check'),
    twoPlayersNames = document.getElementById('two-player-names'),
    twoPlayersSettings = document.getElementsByClassName('two-player-setting'),
    onePlayersSettings = document.getElementsByClassName('one-player-setting'),
    wrongSound = new Audio('sounds/wrong.mp3'),
    deathSound = new Audio('sounds/death.mp3'),
    winSound = new Audio('sounds/win.mp3'),
    fireSound = new Audio('sounds/fire.mp3'),
    congregationSound = new Audio('sounds/congregation.mp3'),
    correctSound = new Audio('sounds/correct.mp3');

function shuffle(list) {
    list.sort((a, b) => 0.5 - Math.random());
}

twoPlayersCheck.addEventListener('change', (e) => {
    twoPlayers = e.target.checked;
    twoPlayersNames.style.display = twoPlayers ? 'flex' : 'none';
    for(const setting of twoPlayersSettings) {
        setting.style.display = twoPlayers ? 'block' : 'none';
    }
    for(const setting of onePlayersSettings) {
        setting.style.display = twoPlayers ? 'none' : 'block';
    }
});

function placeCards(show = false) {
    shuffle(images);    
    
    const splicedImages = pairsAmount < images.length ? [...images].splice(0, pairsAmount) : images;
    cardsContainer.innerHTML = '';
    for(const img of splicedImages) {
        const card = document.createElement('div');
        card.className = `memory-card ${img.name} ${(show ? 'shown' : '')}`;
        card.innerHTML = `
            <img src="${img.url}" alt="card-img">
        `
        if(!show) card.addEventListener('click', showCard);
        
        cardsContainer.appendChild(card);
    }
    
    shuffle(splicedImages);
    for(const img of splicedImages) {
        const card = document.createElement('div');
        card.className = `memory-card ${img.name} ${(show ? 'shown' : '')}`;
        card.innerHTML = `
            <img src="${img.url}" alt="card-img">
        `
        if(!show) card.addEventListener('click', showCard);
        
        cardsContainer.appendChild(card);
    }
}

placeCards(true);

restartButton.addEventListener('click', restartGame);

function restartGame() {
    resultsPre.textContent = '';
    steps = 0;
    stepsSpan.textContent = steps;
    pair = [];
    startTimer();
    setupGrid();
    placeCards();
}

function startGame() {
    [ width, height ] = sizeSelect.value.split('x');
    clearInterval(intervalId);
    clearInterval(intervalIdFirst);
    clearInterval(intervalIdSecond);
    pair = [];
    turn = true;
    if(!twoPlayers) {
        time = Number(difficultySelect.value);
        restartButton.disabled = false;
        steps = 0;
        stepsSpan.textContent = steps;
        startTimer();
    }
    else {
        round = 1;
        rounds = roundsInput.value;
        roundSpan.textContent = round;
        
        nameFirst = firstPlayerNameInput.value != '' ? firstPlayerNameInput.value : 'Player 1';
        nameSecond = secondPlayerNameInput.value != '' ? secondPlayerNameInput.value : 'Player 2';

        stepsFirst = 0;
        stepsSecond = 0;
        stepsFirstSpan.textContent = stepsFirst;
        stepsSecondSpan.textContent = stepsSecond;

        scoreFirst = 0;
        scoreSecond = 0;
        scoreFirstSpan.textContent = scoreFirst;
        scoreSecondSpan.textContent = scoreSecond;

        timeFirst = 0;
        timeSecond = 0;

        twoPlayerResultsPre.textContent = '';
        turnSpan.textContent = '';
        start2PlayerTimer();
    }

    resultsPre.textContent = '';


    setupGrid();
    placeCards();
}

startGameButton.addEventListener('click', startGame);

function resetSettings() {
    sizeSelect.value = "4x4";
    difficultySelect.value = "180";
}

function startTimer() {
    clearInterval(intervalId);
    currentTime = time;
    timeSpan.textContent = `${time / 60}:00`;
    intervalId = setInterval(() => {
        currentTime--;
        const seconds = (currentTime % 60) < 10 ? `0${currentTime % 60}` : currentTime % 60;
        timeSpan.textContent = `${Math.floor(currentTime / 60)}:${seconds}`;
        
        if(currentTime == 0 && pairsAmount > 0) {
            gameOver();
        }
    }, 1000);
}
    
function start2PlayerTimer() {
    clearInterval(intervalIdSecond);
    clearInterval(intervalIdFirst);
    if(turn) {
        turnSpan.textContent = `${nameFirst}'s turn`;
        intervalIdFirst = setInterval(() => {
            timeFirst++;
        }, 1000);
    }
    else {
        turnSpan.textContent = `${nameSecond}'s turn`;
        intervalIdSecond = setInterval(() => {
            timeSecond++;
        });
    }
}

resetSettingsButton.addEventListener('click', resetSettings)

function gameOver() {
    clearInterval(intervalId);
    for(const card of cardsContainer.children) {
        card.removeEventListener('click', showCard);
    }
    play(deathSound, 0.5);
    resultsPre.textContent = 'Game over!';
}

function showCard(event) {
    event.target.classList.toggle('shown');
    event.target.removeEventListener('click', showCard);
    pair.push(event.target);
    
    if(pair.length == 2) {
        compareCards(pair[0], pair[1]);
        pair = [];
    }
}

function setupGrid() {
    cardsContainer.style.gridTemplateRows = `repeat(${height}, 200px)`;
    cardsContainer.style.gridTemplateColumns = `repeat(${width}, 200px)`;
    pairsAmount = (height * width) / 2;
}

setupGrid();

function winGame() {
    if(!twoPlayers) {
        clearInterval(intervalId);
        play(winSound);
        const minutesCompleted = Math.floor((time - currentTime) / 60);
        const secondsCompleted = (time - currentTime) % 60;
        resultsPre.textContent = `You won!\nYour time: ${minutesCompleted}:${(secondsCompleted < 10 ? `0${secondsCompleted}` : secondsCompleted)}`;
    }
    else {
        clearInterval(intervalIdFirst);
        clearInterval(intervalIdSecond);
        if(scoreFirst != scoreSecond) {
            const firstWon = scoreFirst > scoreSecond;
            turn = !firstWon;
            resultsPre.textContent = firstWon ? `${nameFirst} has won the round!` : `${nameSecond} has won the round!`;
            roundResults.push({
                number: round,
                won: firstWon ? nameFirst : nameSecond,
                time: firstWon ? timeFirst : timeSecond,
                steps: firstWon ? stepsFirst : stepsSecond,
            });
        }
        else {
            resultsPre.textContent = 'Round ended with a tie!';
        }
        if(round == rounds) {
            win2PlayerGame();         
        }
        else {
            nextRoundButton.disabled = false;
        }
    }
}

function nextRound() {
    roundSpan.textContent = ++round;

    stepsFirst = 0;
    stepsSecond = 0;
    stepsFirstSpan.textContent = stepsFirst;
    stepsSecondSpan.textContent = stepsSecond;

    scoreFirst = 0;
    scoreSecond = 0;
    scoreFirstSpan.textContent = scoreFirst;
    scoreSecondSpan.textContent = scoreSecond;

    timeFirst = 0;
    timeSecond = 0;

    twoPlayerResultsPre.textContent = '';
    turnSpan.textContent = '';
    pairsAmount = (height * width) / 2;

    resultsPre.textContent = '';

    start2PlayerTimer();
    placeCards();

    nextRoundButton.disabled = true;
}

nextRoundButton.addEventListener('click', nextRound);

function win2PlayerGame() {
    const roundsFirst = roundResults.filter(round => round.won == nameFirst);
    const roundsSecond = roundResults.filter(round => round.won == nameSecond);

    if(roundsFirst.length > roundsSecond.length) {
        twoPlayerResultsPre.textContent = `${nameFirst} has won the game!\nRounds won:\n`
        roundsFirst.forEach(round => {
            twoPlayerResultsPre.textContent += `---
            Round ${round.number}
            Time: ${round.time}s
            Steps: ${round.steps}\n`;
        });
    }
    else if(roundsFirst.length < roundsSecond.length) {
        twoPlayerResultsPre.textContent = `${nameSecond} has won the game!\nRounds won:\n`
        roundsSecond.forEach(round => {
            twoPlayerResultsPre.textContent += `---
            Round ${round.number}
            Time: ${round.time}s
            Steps: ${round.steps}\n`;
        });
    }
    else {
        twoPlayerResultsPre.textContent = 'Game ended with a tie!';
    }
}

function play(sound, time = 0) {
    if(!soundCheck.checked) {
        sound.currentTime = time;
        sound.play();
    }
}

function compareCards(a, b) {
    if(!twoPlayers) stepsSpan.textContent = ++steps;
    else {
        turn ? stepsFirstSpan.textContent = ++stepsFirst
        : stepsSecondSpan.textContent = ++stepsSecond;
    }
    setTimeout(() => {
        if(a.className == b.className) {
            if(twoPlayers) {
                turn ? scoreFirstSpan.textContent = ++scoreFirst
                : scoreSecondSpan.textContent = ++scoreSecond;
            }
            pairsAmount--;
            if(a.classList.contains('normal')) {
                play(fireSound);
            }
            else if(a.classList.contains('congregation') && !jumpscareCheck.checked) {
                play(congregationSound);
            }
            else {
                play(correctSound, 0.3);
            }
            a.style.border = '3px solid green';
            b.style.border = '3px solid green';
            if(pairsAmount == 0) {
                winGame();
            }
        }
        else {
            play(wrongSound);
            a.classList.remove('shown');
            b.classList.remove('shown');

            a.addEventListener('click', showCard);
            b.addEventListener('click', showCard);
            turn = !turn;
            start2PlayerTimer();
        }
    }, 500);
}
