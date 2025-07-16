const introGunman = document.getElementById('intro-gunman');
const menu = document.getElementById('menu');
const cursor = document.getElementById('cursor');
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

window.addEventListener('mousemove', updateCursor);
introGunman.addEventListener('click', startMenu);