function getVerdictWithIf(grade) {
    if(grade < 0) return "Ти щось не те написав";
    if(grade < 50) return "Незадовільно";
    if(grade < 70) return "Задовільно";
    if(grade < 90) return "Добре";
    if(grade <= 100) return "Відмінно";
    else return "Щось ти погано махлюєш.";
}

function getVerdictWithTernary(grade) {
    return grade < 0 ? "Ти щось не те написав" 
    : grade < 50 ? "Незадовільно"
    : grade < 70 ? "Задовільно"
    : grade < 90 ? "Добре"
    : grade <= 100 ? "Відмінно"
    : "Щось ти погано махлюєш";
}

console.log(getVerdictWithIf(23));
console.log(getVerdictWithIf(56));
console.log(getVerdictWithIf(80));
console.log(getVerdictWithIf(99));
console.log(getVerdictWithIf(10000));

console.log(getVerdictWithTernary(23));
console.log(getVerdictWithTernary(56));
console.log(getVerdictWithTernary(80));
console.log(getVerdictWithTernary(99));
console.log(getVerdictWithTernary(10000));
console.log();

function getSeasonWithIf(month) {
    if(month >= 1 && month <= 12) {
        if(month === 12 || month <= 2) {
            return "Зима";
        }
        if(month >= 3 && month <= 5) {
            return "Весна";
        }
        if(month >= 6 && month <= 8) {
            return "Літо";
        }
        else {
            return "Осінь";
        }
    }
    else return "Некоректний номер місяця";
}

function getSeasonWithTernary(month) {
    return month >= 1 && month <= 12 ? 
        month === 12 || month <= 2 ? "Зима"
        : month >= 3 && month <= 5 ? "Весна"
        : month >= 6 && month <= 8 ? "Літо" : "Осінь"
    : "Некоректний номер місяця";
}

console.log(getSeasonWithIf(0));
console.log(getSeasonWithIf(3));
console.log(getSeasonWithIf(12));
console.log(getSeasonWithIf(9));
console.log(getSeasonWithIf(7));

console.log(getSeasonWithTernary(0));
console.log(getSeasonWithTernary(3));
console.log(getSeasonWithTernary(12));
console.log(getSeasonWithTernary(9));
console.log(getSeasonWithTernary(7));