// Input elements
const factorial = document.getElementById('factorial-input');
const month = document.getElementById('month-input');
const array = document.getElementById('array-input');
const string = document.getElementById('string-input');
const base = document.getElementById('base-input');
const exponent = document.getElementById('exponent-input');

// Button elements
const sumButton = document.getElementById('sum-button');
const factorialButton = document.getElementById('factorial-button');
const monthButton = document.getElementById('month-button');
const arrayButton = document.getElementById('array-button');
const stringButton = document.getElementById('string-button');
const exponentButton = document.getElementById('exponent-button');

// Getting the span for showing up console check
const consoleSpan = document.getElementById('console-check');

// Function for showing console check
function consoleCheck() {
    consoleSpan.style.visibility = 'visible';

    setTimeout(() => {
        consoleSpan.style.visibility = 'hidden';
    }, 3000);
}

// Task 1.
function theFirst50Sum() {
    let a = 0, result = 0;
    while(a < 50) {
        result += a;
        a++;
    }
    
    console.log(result);
    consoleCheck();
}

// Task 2.
function findFactorial() {
    const number = Number(factorial.value);

    let result = 1;
    for(let i = 1; i <= number; i++) {
        result *= i;
    }
    
    console.log(result);
    consoleCheck();
}

// Task 3.
function returnMonth() {
    const monthNumber = Number(month.value);
    switch(monthNumber) {
        case 1:
            console.log('Січень');
            break;
        case 2:
            console.log('Лютий');
            break;
        case 3:
            console.log('Березень');
            break;
        case 4:
            console.log('Квітень');
            break;
        case 5:
            console.log('Травень');
            break;
        case 6:
            console.log('Червень');
            break;
        case 7:
            console.log('Липень');
            break;
        case 8:
            console.log('Серпень');
            break;
        case 9:
            console.log('Вересень');
            break;
        case 10:
            console.log('Жовтень');
            break;
        case 11:
            console.log('Листопад');
            break;
        case 12:
            console.log('Грудень');
            break;
        default:
            console.log('Некоректний номер місяця');
            break;
    } 
    consoleCheck();
}

// Task 4.
function arrayEvenSum(arr) {
    let result = 0;
    for(const num of arr) {
        if(num % 2 === 0) {
            result += num;
        }
    }
    
    consoleCheck();
    console.log(result);
    return result;
}

// Task 5.
const checkVowelsAmount = (str) => {
    const vowels = 'aoeiu';
    let amount = 0;
    
    for(const char of str) {
        if(vowels.includes(char.toLowerCase())) {
            amount++;
        }
    }

    consoleCheck();
    console.log(amount);
    return amount;
}

// Task 6.
const exponentTheBase = (base, exponent) => {
    let result = base;
    for(let i = 1; i < exponent; i++) {
        result *= base;
    }
    consoleCheck();
    console.log(result);
    return result;
}

// Connecting buttons
sumButton.addEventListener('click', theFirst50Sum);
factorialButton.addEventListener('click', findFactorial);
monthButton.addEventListener('click', returnMonth);
arrayButton.addEventListener('click', () => {
    const arr = array.value.split(' ').map(el => Number(el));
    arrayEvenSum(arr);
});
stringButton.addEventListener('click', () => {
    checkVowelsAmount(string.value);
});
exponentButton.addEventListener('click', () => {
    exponentTheBase(base.value, exponent.value);
});
