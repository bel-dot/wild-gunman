'use strict'

const selects = [ ...document.getElementsByTagName('select') ];
const inputs = [ ...document.getElementsByTagName('input'), ...selects ];

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
})

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
    today.setFullYear(today.getFullYear - 12);
    if(date.value != '') {
        const dateValue = new Date(date.value);
        date.className = dateValue > today ? 'invalid' : 'valid';
        return !(dateValue > today);
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
    selects.forEach(elem => {
        if(elem.value == 'none') {
            elem.className = 'invalid';
            return false;
        }
        else elem.className = 'valid';
    });
    return true;
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
        succesfullBlock.style.display = 'block';
        setTimeout(() => {
            succesfullBlock.style.display = 'none';
        }, 3000);
    } 
})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    validateLoginPassword(loginForm.pass);
    validateUsername(loginForm.username);
})