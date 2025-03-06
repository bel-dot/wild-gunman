// Input elements
const factorial = document.getElementById('factorial-input');
const month = document.getElementById('month-input');
const array = document.getElementById('array-input');
const string = document.getElementById('string-input');

const consoleSpan = document.getElementById('console-check');
function consoleCheck() {
    consoleSpan.style.visibility = 'visible';

    setTimeout(() => {
        consoleSpan.style.visibility = 'hidden';
    }, 3000);
}

function theFirst50Sum() {
    let a = 0, result = 0;
    while(a < 50) {
        result += a;
        a++;
    }
    
    console.log(result);
    consoleCheck();
}

function findFactorial() {
    const number = Number(factorial.value);

    let result = 1;
    for(let i = 1; i <= number; i++) {
        result *= i;
    }
    
    console.log(result);
    consoleCheck();
}

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
    } 
    consoleCheck();
}

function arrayEvenSum(arr) {
    let result = 0;
    for(const num of arr) {
        if(num % 2 === 0) {
            result += num;
        }
    }
    
    console.log(result);
    consoleCheck();
}

const checkVowelsAmount = (str) => {
    const vowels = 'aoeiu';
    let amount = 0;
    
    for(const char of str) {
        if(vowels.includes(char)) {
            amount++;
        }
    }

    console.log(amount);
    consoleCheck();
}

const exponentTheBase = (base, exponent) => {
    console.log(Math.pow(base, exponent));
    consoleCheck();
}

