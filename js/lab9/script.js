'use strict'

const selects = [ ...document.getElementsByTagName('select') ];
const inputs = [ ...document.getElementsByTagName('input'), ...selects ];

const formWindow = document.getElementById('form-window'),
    rememberCheckbox = document.getElementById('remember'),
    backgroundMusic = new Audio('./thrash.mp3'),
    laughSound = new Audio('./laugh.mp3'),
    goodSound = new Audio('./good.mp3'),
    dontForget = new Audio('./dont_forget.mp3');

let forgot = false;
console.log(backgroundMusic.volume);

rememberCheckbox.addEventListener('change', () => {
    if(!forgot && rememberCheckbox.checked) {
        forgot = true;
        backgroundMusic.pause();
        dontForget.currentTime = 0;
        dontForget.play();
    }
});

dontForget.addEventListener('ended', returnBackgroundMusic)

function returnBackgroundMusic() {
    backgroundMusic.volume = 0;
    backgroundMusic.play();
    
    const intervalId = setInterval(() => {
        backgroundMusic.volume += 0.01;
        if(backgroundMusic.volume >= 1) {
            backgroundMusic.volume = 1;
            clearInterval(intervalId);
        }
    }, 5);
}

inputs.forEach(element => {
    element.addEventListener('input', () => {
        element.className = '';
    })
});

selects.forEach(select => {
    select.addEventListener('change', () => {
        if(select.value != 'none') {
            select.options[0].style.display = 'none';
        }
    })
})

const countryInput = document.getElementById('country'),
    cityInput = document.getElementById('city');

window.addEventListener('load', () => {
    if(countryInput.value != '') {
        onCountryChange();
    }
    
    
    setTimeout(runIntro, 500);
})

function runIntro() {
    backgroundMusic.currentTime = 0;
    backgroundMusic.autoplay = true;
    backgroundMusic.loop = true;
    backgroundMusic.play();

    formWindow.classList.toggle('intro');
    
    setTimeout(() => {
        formWindow.classList.toggle('intro');
        formWindow.classList.toggle('active');
    }, 6000);
}

countryInput.addEventListener('change', onCountryChange);

function onCountryChange() {
    for(const option of document.querySelectorAll('#city option')) {
        option.style.display = 'none';
    }

    const selectedGroup = document.getElementsByClassName(`${countryInput.value}-option`);
    for(const option of selectedGroup) {
        option.style.display = 'initial';
    }
}

const registerForm = document.forms.register,
    loginForm = document.forms.login,
    succesfullBlock = document.getElementById('all-valid'),
    succesfullLoginBlock = document.getElementById('all-valid-login'),
    registerBtn = document.getElementById('register'),
    loginBtn = document.getElementById('login');

console.log(registerForm);

registerBtn.addEventListener('click', () => {
    loginBtn.classList.remove('active');
    registerBtn.classList.add('active');
    registerForm.style.display = 'flex';
    loginForm.style.display = 'none';
})

loginBtn.addEventListener('click', () => {
    registerBtn.classList.remove('active');
    loginBtn.classList.add('active');
    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';
})


function validateInput(input) {
    input.className = '';        
    
    if(input.value.length < 3 || input.value.length > 15) {
        input.className = 'invalid';
        return false;
    }
    else input.className = 'valid';
    
    return true;
}

function validateEmail(email) {
    const pattern = /.*@.*\..*/i;
    
    email.className = pattern.test(email.value) ? 'valid' : 'invalid';
    return pattern.test(email.value);
}

function validatePhone(phone) {
    const pattern = /\+380\d{9}/i;
    
    phone.className = pattern.test(phone.value) ? 'valid' : 'invalid';
    return pattern.test(phone.value);
}

function validateLoginPassword(pass) {
    pass.className = pass.value.length >= 6 ? 'valid' : 'invalid';
    return pass.value.length >= 6;
}

function validatePassword(pass, confirm) {
    pass.className = pass.value.length >= 6 ? 'valid' : 'invalid';
    confirm.className = confirm.value == pass.value && confirm.value.length >= 6 ? 'valid' : 'invalid';
    
    return pass.className == 'valid' && confirm.className == 'valid';
}

function validateDate(date) {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 12);
    if(date.value != '') {
        const dateValue = date.valueAsDate;
        date.className = dateValue < today ? 'valid' : 'invalid';
        return dateValue < today;
    }
    else {
        date.className = 'invalid';
        return false;
    }
}

function validateUsername(username) {
    username.className = username.value.length > 0 ? 'valid' : 'invalid';
    return username.value.length > 0;
}

function validateSelects() {
    let validated = true;
    for(const select of selects) {
        if(select.value == 'none') {
            select.className = 'invalid';
            validated = false;
        }
        else select.className = 'valid';
    }
    return validated;
}

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const validates = [
        validateInput(registerForm['first-name']),
        validateInput(registerForm['last-name']),
        validateEmail(registerForm.email),
        validatePassword(registerForm.pass, registerForm['confirm-pass']),
        validatePhone(registerForm.phone),
        validateDate(registerForm['date-birth']),
        validateSelects(),
    ];

    if(validates.every(validate => validate)) {
        registerForm.reset();
        laughSound.currentTime = 0;
        laughSound.play();
        succesfullBlock.classList.toggle('show')
        setTimeout(() => {
            succesfullBlock.classList.toggle('show')
        }, 6000);
    } 
})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const validates = [
        validateLoginPassword(loginForm.pass),
        validateUsername(loginForm.username),
    ];
    
    if(validates.every(validate => validate)) {
        loginForm.reset();
        goodSound.currentTime = 0;
        goodSound.play();
        succesfullLoginBlock.classList.toggle('show')
        setTimeout(() => {
            succesfullLoginBlock.classList.toggle('show')
        }, 6000);
    } 
})