const introGunman = document.getElementById('intro-gunman');
const menu = document.getElementById('menu');
const cursor = document.getElementById('cursor'),
    shot = document.getElementById('shot');
const gunmanA = document.querySelector('.game-a .menu-gunman');
const introSound = new Audio('sfx/intro.m4a'),
    titleSound = new Audio('sfx/title.m4a'),
    fireSound = new Audio('sfx/fire.m4a'),
    shotGunmanSound = new Audio('sfx/shot-fall.m4a'),
    shotPlayerSound = new Audio('sfx/shot.m4a'),
    deathSound = new Audio('sfx/death.m4a'),
    foulSound = new Audio('sfx/foul.m4a'),
    winSound = new Audio('sfx/win.m4a'),
    waitSound = new Audio('sfx/wait.m4a');

setTimeout(() => {
    introGunman.classList.remove('walking');
}, 9000);

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function startGameA() {
    titleSound.pause();
    gunmanA.classList.add('shot');
    playSound(shotGunmanSound);
    
    setTimeout(() => {
        startGame();
        gunmanA.classList.remove('shot');
    }, 3000);
}

gunmanA.addEventListener('click', startGameA);

function startMenu() {
    playSound(shotPlayerSound);
    introGunman.classList.remove('walking');
    introGunman.classList.add('fallen');
    setTimeout(() => {
        menu.classList.add('active');
        playSound(titleSound);
    }, 1000);
    
    introGunman.removeEventListener('click', startMenu);
}

function updateCursor(e) {
    const mouseY = e.clientY;
    const mouseX = e.clientX;

    cursor.style.top = `${mouseY}px`;
    cursor.style.left = `${mouseX}px`;
}

function shoot(e) {
    shot.src = '';
    const mouseY = e.clientY;
    const mouseX = e.clientX;

    shot.style.display = 'initial';
    shot.src = 'img/shot.gif';
    shot.style.top = `${mouseY}px`;
    shot.style.left = `${mouseX}px`;
    
}

window.addEventListener('mousemove', updateCursor);
window.addEventListener('click', shoot);
introGunman.addEventListener('click', startMenu);