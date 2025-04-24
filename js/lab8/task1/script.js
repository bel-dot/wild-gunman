'use strict'

let width = 6,
    height = 6,
    time = 180,
    currentTime = time,
    steps = 0,
    intervalId = '',
    pairsAmount = (width * height) / 2;

const images = [
    { name: "evw", url: "https://media1.tenor.com/m/morPeOgGlkkAAAAd/erivvanwilderman-geometry-dash.gif" },
    { name: "normal", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgUbk38tKTnRvyJdoId2c3UqTxrUcbUzPoKQ&s" },
    { name: "colon", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiSaR3LSzCYXw5ZlBdQ9Tih_a9FB917503ig&s" },
    { name: "michigun", url: "https://static.wikia.nocookie.net/geometry-dash/images/f/f8/Michigun.jpg/revision/latest?cb=20161227142259&path-prefix=ru" },
    { name: "robtop", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWi8B8p0ccTrbLuNT5STlbvaoDKJ_kfn4yhg&s" },
    { name: "boomkitty", url: "https://i.scdn.co/image/ab676161000051740537e4e52505684d70275b45" },
    { name: "waterflame", url: "https://yt3.googleusercontent.com/vYbhw3MueeU3uaf-gIgx1ybgrJs_lqxrZgiUMRyphhstfBV_wReu4drozput5YcA7y2WL4g3Yw=s900-c-k-c0x00ffffff-no-rj" },
    { name: "titan", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbmuloNJDQAiIVOBNwZhsaxh_W2K_E0QRTWQ&s" },
    { name: "decody", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJXcgCP_lCfczzruOcxs_XS82bOz18CQ1M6Q&s" },
    { name: "vortrox", url: "https://i.ytimg.com/vi/W4S9d3xCGMI/sddefault.jpg" },
    { name: "bloodbath", url: "https://i.ytimg.com/vi/LjlkMdZ9eJ0/maxresdefault.jpg" },
    { name: "sammelot", url: "https://static.wikia.nocookie.net/youtube/images/b/b2/KingSammelotClips.jpg/revision/latest/thumbnail/width/360/height/360?cb=20240914055936" },
    { name: "dash", url: "https://i.redd.it/hjcrljvkpgec1.jpeg" },
    { name: "congregation", url: "https://static.wikia.nocookie.net/geometry-dash-fan/images/7/7e/Congregation.jpg/revision/latest?cb=20250119211837" },
    { name: "vortex", url: "https://preview.redd.it/pc1c9a2598t91.png?width=640&crop=smart&auto=webp&s=7a2d813f1d769dc1db723a30dee9f6011013fd1b" },
    { name: "maffaka", url: "https://static.wikia.nocookie.net/geometry-dash/images/2/2b/MoFFoKo.jpg/revision/latest?cb=20210717173100&path-prefix=ru" },
    { name: "vernam", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbwrXagI8pyv2u8Ymh4GldwhqsugCTeulxQ&s" },
    { name: "limbo", url: "https://external-preview.redd.it/i-made-the-limbo-keys-in-3d-guess-which-one-is-the-correct-v0-b3FvbHcxaW53cXhjMUL-bknpD9KqUlrx0iBtsTuauBRzIUrYAJ0fUNC7tP5Z.png?format=pjpg&auto=webp&s=635941593e86a2011045d81a2a90f7d1548992df" }
];
      

let pair = [];

const cardsContainer = document.getElementById('memory-cards'),
    restartButton = document.getElementById('restart-btn'),
    sizeSelect = document.getElementById('size-select'),
    difficultySelect = document.getElementById('difficulty-select'),
    resetSettingsButton = document.getElementById('reset-btn'),
    startGameButton = document.getElementById('start-game'),
    timeSpan = document.getElementById('time-span'),
    stepsSpan = document.getElementById('steps-span'),
    resultsSpan = document.getElementById('results-span'),
    wrongSound = new Audio('sounds/wrong.mp3'),
    deathSound = new Audio('sounds/death.mp3'),
    winSound = new Audio('sounds/win.mp3'),
    fireSound = new Audio('sounds/fire.mp3'),
    congregationSound = new Audio('sounds/congregation.mp3'),
    correctSound = new Audio('sounds/correct.mp3');

function shuffle(list) {
    list.sort((a, b) => 0.5 - Math.random());
}

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

restartButton.addEventListener('click', placeCards);

function startGame() {
    [ width, height ] = sizeSelect.value.split('x');
    time = Number(difficultySelect.value);
    currentTime = time;

    startTimer();
    setupGrid();
    placeCards();
}

startGameButton.addEventListener('click', startGame);

function resetSettings() {
    sizeSelect.value = "4x4";
    difficultySelect.value = "easy";
}

function startTimer() {
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

resetSettingsButton.addEventListener('click', resetSettings)

function gameOver() {
    clearInterval(intervalId);
    for(const card of cardsContainer.children) {
        card.removeEventListener('click', showCard);
    }
    play(deathSound, 0.5);
    resultsSpan.textContent = 'Game over!';
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
    console.log(pairsAmount);
}

setupGrid();

function winGame() {
    clearInterval(intervalId);
    play(winSound);
    const minutesCompleted = Math.floor((time - currentTime) / 60);
    const secondsCompleted = (time - currentTime) % 60;
    resultsSpan.textContent = `You won!\nYour time: ${minutesCompleted}:${(secondsCompleted < 10 ? `0${secondsCompleted}` : secondsCompleted)}`;
}

function play(sound, time = 0) {
    sound.currentTime = time;
    sound.play();
}

function compareCards(a, b) {
    stepsSpan.textContent = ++steps;
    setTimeout(() => {
        if(a.className == b.className) {
            pairsAmount--;
            if(a.classList.contains('normal')) {
                play(fireSound);
            }
            else if(a.classList.contains('congregation')) {
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
        }
    }, 500);
}
