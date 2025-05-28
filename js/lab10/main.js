const API = 'https://randomuser.me/api/?results=150';
const friendsContainer = document.getElementById('friends-container');
const mainWindow = document.getElementById('main'),
    searchBar = document.getElementById('friends-search'),
    sortSelect = document.getElementById('sort-select'),
    logoutButton = document.getElementById('logout'),
    filterInputs = [...document.getElementsByClassName('filter-input')],
    reverseCheck = document.getElementById('reverse-check');

const explosionSound = new Audio('./explosion.mp3'),
    vanishSound = new Audio('./vanish.mp3'),
    explosionGif = document.getElementById('boom-img');

let friends = [],
    thrashed = [],
    pages = 0,
    reversed = 1,
    start = 1,
    end = 1;

reverseCheck.addEventListener('change', () => {
    resetPages();
    reversed *= -1;
    sortFriends();
});


function renderFriends(arr) {
    friendsContainer.innerHTML = '';
    const friendsSlice = arr.slice(30 * (start - 1), 30 * end);

    for(const friend of friendsSlice) {
        const card = document.createElement('div');
        card.className = 'friend-card';
        card.id = friend.login.username;
        if(thrashed.includes(card.id)) {
            card.classList.add('thrashed');
        }
        card.innerHTML += `
            <div class="friend-avatar">
                <img src="${friend.picture.large}" alt="user-img">
                <img src="https://media.tenor.com/3QNUdJR3PUgAAAAi/twitch-youngmulti.gif" alt="user-img" class="fire">
            </div>
            <h2>${friend.name.first} ${friend.name.last}</h2>
            <p>${friend.dob.age} years old</p>
            <p>Lives in ${friend.location.city}</p>
            <p>${friend.email}</p>
            <p>${friend.phone}</p>
            <img class="boom" src="explosion-boom.gif" alt="boom">
        `;
        
        const thrashButton = document.createElement('button');
        thrashButton.textContent = card.classList.contains('thrashed') ? 'Say sorry.' : 'Thrash!';
        thrashButton.type = 'button';
        thrashButton.addEventListener('click', (e) => thrashFriend(e));
        
        card.appendChild(thrashButton);
        friendsContainer.appendChild(card);
    }
}

function thrashFriend(e) {
    const parent = e.target.parentElement;
    const username = parent.id;
    const boomImg = document.querySelector(`#${username} .boom`);
    
    for(const friend of friends) {
        if(friend.login.username === username) {
            if(!thrashed.includes(username)) {
                thrashed.push(username);
                parent.classList.add('thrashed');
                explode(boomImg);
                e.target.textContent = 'Say sorry.';
            }
            else {
                thrashed.splice(thrashed.indexOf(username), 1);
                parent.classList.remove('thrashed');
                parent.classList.toggle('apologized');
                vanishSound.currentTime = 0;
                vanishSound.play();
                setTimeout(() => {
                    parent.classList.toggle('apologized');
                }, 1000);
                e.target.textContent = 'Thrash!';
            }
            
            localStorage.setItem('thrashed', thrashed.toString());
            break;
        }
    }
}


function sortFriends() {
    updateURL('sort', sortSelect.value);

    switch(sortSelect.value) {
        case 'relevance':
            renderFriends(reversed > 0 ? friends : friends.toReversed());
            break;
        case 'alphabet':
            renderFriends(friends.toSorted((a, b) => a.name.first.localeCompare(b.name.first) * reversed));
            break;
        case 'age':
            renderFriends(friends.toSorted((a, b) => (a.dob.age - b.dob.age) * reversed));
            break;
        case 'registered':
            renderFriends(friends.toSorted((a, b) => {
                return (new Date(a.registered.date) - new Date(b.registered.date)) * reversed;
            }));
            break;
    }
}


function filterFriends() {
    const ageMin = Number(filterInputs[0].value);
    const ageMax = Number(filterInputs[1].value);
    const city = filterInputs[2].value;
    const email = filterInputs[3].value;
    const thrashedCheck = filterInputs[4].checked;
    
    updateURL('age-min', ageMin);
    updateURL('age-max', ageMax);
    updateURL('city', city);
    updateURL('email', email);
    updateURL('thrashed', thrashedCheck);
    
    if(ageMin > 0) {
        friends = friends.filter(friend => friend.dob.age >= ageMin);
    }
    if(ageMax > 0) {
        friends = friends.filter(friend => friend.dob.age <= ageMax);
    }
    friends = friends.filter(friend => friend.location.city.includes(city))
    .filter(friend => friend.email.includes(email));
    if(thrashedCheck) {
        friends = friends.filter(friend => !thrashed.includes(friend.login.username)); 
    }
    sortFriends();
};

const searchFriends = debounce(() => {
    resetPages();
    const query = searchBar.value;
    updateURL('search', query);
    friends = JSON.parse(localStorage.getItem('friends'));
    const regex = new RegExp(query, 'i');
    friends = friends.filter(friend => regex.test(friend.name.first + ' ' + friend.name.last));
    filterFriends();
}, 500);

function getParams() {
    const url = new URL(location);
    let sorted, filtered, searched;
    if(url.searchParams.has('sort')) {
        sorted = true;
        sortSelect.value = url.searchParams.get('sort');
    }
    if(url.searchParams.has('search')) {
        searched = true;
        searchBar.value = url.searchParams.get('search');
    }
    if(url.searchParams.has('age-min')) {
        filtered = true;
        filterInputs[0].value = url.searchParams.get('age-min');
    }
    if(url.searchParams.has('age-max')) {
        filtered = true;
        filterInputs[1].value = url.searchParams.get('age-max');
    }
    if(url.searchParams.has('city')) {
        filtered = true;
        filterInputs[2].value = url.searchParams.get('city');
    }
    if(url.searchParams.has('email')) {
        filtered = true;
        filterInputs[3].value = url.searchParams.get('email');
    }
    if(url.searchParams.has('thrashed')) {
        filtered = true;
        filterInputs[4].checked = url.searchParams.get('thrashed');
    }
    
    if(searched) searchFriends();
    if(filtered) filterFriends();
    if(sorted) sortFriends();
}


searchBar.addEventListener('input', searchFriends);
sortSelect.addEventListener('change', () => {
    resetPages();
    sortFriends();
});
for(const filter of filterInputs) {
    filter.addEventListener('input', searchFriends); 
}

async function startService() {
    explode();
    mainWindow.style.display = 'grid';
    if(localStorage.getItem('thrashed') != null) {
        thrashed = localStorage.getItem('thrashed').split(',');
    }

    if(localStorage.getItem('friends') != null) {
        friends = JSON.parse(localStorage.getItem('friends'));
    }
    else {
        try {
            const data = await fetch(API); 
            const json = await data.json();
            friends = json.results;
            localStorage.setItem('friends', JSON.stringify([...friends]));
        }
        catch {
            console.log('Fetch error');
        }
    }
    pages = Math.floor(friends.length / 30);
    renderFriends(friends);
    getParams();
}

function updateURL(key, value) {
    const url = new URL(location);
    if(value != '') {
        url.searchParams.set(key, value);
    }
    else {
        url.searchParams.delete(key);
    }
    const state = {};
    url.searchParams.forEach((value, key) => {
        state[key] = value;
    });
    
    history.pushState(state, '', url);
}

function explode(img = explosionGif) {
    explosionSound.currentTime = 0;
    explosionSound.play();
    img.style.display = 'initial';
    setTimeout(() => {
        img.style.display = 'none';
    }, 1550);
}


function resetPages() {
    start = 1;
    end = 1;
}

function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), timeout);
    };
}

const loadMore = debounce(() => {
    if(window.innerHeight + window.pageYOffset >= document.body.offsetHeight && end <= pages) {
        end++;
        sortFriends();
    }
}, 500);

window.addEventListener('scroll', loadMore);

function logout() {
    localStorage.clear();
    
    mainWindow.style.display = 'none';
    formWindow.style.display = 'block';
    formWindow.style.visibility = 'visible';
}

logoutButton.addEventListener('click', logout);


window.addEventListener('unload', () => {
    localStorage.removeItem('friends');
})
