const currentTime = document.getElementById('current-time');
const timerInput = document.getElementById('timer-date');
const timerButton = document.getElementById('timer-btn');
const timeLeft = document.getElementById('time-left');
const calendarDate = document.getElementById('calendar-date');
const monthSelect = document.getElementById('month-select');
const yearSelect = document.getElementById('year-select');
const dateButton = document.getElementById('date-btn');
const dateInput = document.getElementById('date-input');
const dateLeft = document.getElementById('date-left');

const monthMaxDates = {
    'jan': 31,
    'feb': 28,
    'mar': 31,
    'apr': 30,
    'may': 31,
    'jun': 30,
    'jul': 31,
    'aug': 31,
    'sep': 30,
    'oct': 31,
    'nov': 30,
    'dec': 31,
}

window.addEventListener('load', () => {
    showCalendar('mar', 2025);
    addOptions();
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
        const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
        const seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
        currentTime.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
});

function addOptions() {
    const now = new Date();
    const months = Object.keys(monthMaxDates);
    for(let i = 0; i < months.length; i++) {
        const current = now.getMonth() === i;
        monthSelect.innerHTML += `<option value="${months[i]}" ${(current ? "selected" : "")}>${months[i]}</option>`;
    }
    for(let i = 1970; i <= 2050; i++) {
        const current = now.getFullYear() === i;
        yearSelect.innerHTML += `<option value="${i}" ${(current ? "selected" : "")}>${i}</option>`;
    }
}

timerButton.addEventListener('click', () => {
    const timerTime = Date.parse(timerInput.value);
    
    if(timerTime < Date.now()) {
        alert("Ти хочеш таймер на минуле поставити?");
    }
    else {
        setInterval(() => {
            const left = timerTime - Date.now();
            const hours = Math.floor(left / 3600000);
            const minutes = Math.floor((left - hours * 3600000) / 60000);
            const seconds = Math.floor((left - hours * 3600000 - minutes * 60000) / 1000);
            
            timeLeft.textContent = `Часу залишилось: ${hours}:${minutes}:${seconds}`;
        }, 1000);
    }
});

function clearCalendar() {
    const calendarRows = document.getElementsByClassName('calendar-row');
    for(const row of calendarRows) {
        for(const cell of row.children) {
            cell.style.background = 'black';
            cell.style.color = 'white';
            cell.textContent = '';
        }
    }
}

function showCalendar(month, year) {
    clearCalendar();
    calendarDate.textContent = `${month} ${year} `

    const calendarRows = [...document.getElementsByClassName('calendar-row')];
    const monthIndex = Object.keys(monthMaxDates).indexOf(month);
    let firstDay = new Date(year, monthIndex, 1).getDay();
    let date = 1;
    const maxDate = monthMaxDates[month];
    if(maxDate === 28 && year % 4 === 0) {
        maxDate++;
    }
    const firstRow = calendarRows[0];
    for(let i = firstDay; i < firstRow.children.length; i++) {
        firstRow.children[i].textContent = date++;
    }
    for(let i = 1; i < calendarRows.length; i++) {
        for(const cell of calendarRows[i].children) {
            if(date > maxDate) {
                break;
            }
            if(date === new Date().getDate() && year === new Date().getFullYear() && monthIndex === new Date().getMonth()) {
                cell.style.background = 'white';
                cell.style.color = 'black';
            }
            cell.textContent = date++;

        }
    }
}

monthSelect.addEventListener('change', () => {
    showCalendar(monthSelect.value, yearSelect.value);
});

yearSelect.addEventListener('change', () => {
    showCalendar(monthSelect.value, yearSelect.value);
})

dateButton.addEventListener('click', () => {
    const setTime = Date.parse(dateInput.value);
    const timeLeft = setTime - Date.now();
    
    if(timeLeft < 0) {
        alert('Знову в минуле дивимся?');
    }
    else {
        const seconds = Math.floor(timeLeft / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        
        dateLeft.textContent = `Залишилося часу:\n ${months} місяців\n ${
          days > 30 ? days % 30 : days
        } днів\n ${hours > 24 ? hours % 24 : hours} годин\n ${
          minutes > 60 ? minutes % 60 : minutes
        } хвилин\n ${seconds > 60 ? seconds % 60 : seconds} секунд.`;
    }
})