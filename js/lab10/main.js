const API = 'https://randomuser.me/api/?results=150';
const friendsContainer = document.getElementById('friends-container');
const mainWindow = document.getElementById('main'),
    searchBar = document.getElementById('friends-search'),
    sortSelect = document.getElementById('sort-select'),
    reverseCheck = document.getElementById('reverse-check');

const explosionSound = new Audio('./explosion.mp3'),
    explosionGif = document.getElementById('boom-img');

let friends = [],
    reversed = 1,
    start = 1,
    end = 1;

reverseCheck.addEventListener('change', () => {
    resetPages();
    reversed *= -1;
    renderFriends(friends.reverse());
});

sortSelect.addEventListener('change', () => {
    resetPages();
    updateURL('sort', sortSelect.value);
    switch(sortSelect.value) {
        case 'alphabet':
            renderFriends(friends.sort((a, b) => a.name.first.localeCompare(b.name.first) * reversed));
            break;
        case 'age':
            renderFriends(friends.sort((a, b) => (a.dob.age - b.dob.age) * reversed));
            break;
        case 'registered':
            renderFriends(friends.sort((a, b) => {
                return (new Date(a.registered.date) - new Date(b.registered.date)) * reversed;
            }));
            break;
    }
});

function updateURL(key, value) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value);
    let params = '';
    for(const [key, value] of searchParams.entries()) {
        params += `?${key}=${value}`;
    } 
    location += params;
    
}

const searchFriends = debounce(() => {
    resetPages();
    const query = searchBar.value;
    const found = friends.filter(friend => friend.name.first.includes(query) || friend.name.last.includes(query));
    renderFriends(found);
}, 500);

searchBar.addEventListener('input', searchFriends);

async function startService() {
    explode();
    mainWindow.style.display = 'grid';
    try {
        const data = await fetch(API); 
        const json = await data.json();
        friends = json.results;
        renderFriends(friends);
    }
    catch {
        console.log('Fetch error');
    }
}

function explode() {
    explosionSound.play();
    explosionGif.style.display = 'initial';
    setTimeout(() => {
        explosionGif.style.display = 'none';
    }, 1600);
}



function renderFriends(arr) {
    friendsContainer.innerHTML = '';
    const friendsSlice = friends.slice(30 * (start - 1), 30 * end);

    for(const friend of arr) {
        const card = document.createElement('div');
        card.className = 'friend-card';
        card.innerHTML += `
            <div class="friend-avatar">
                <img src="${friend.picture.large}" alt="user-img">
                <img src="https://media.tenor.com/3QNUdJR3PUgAAAAi/twitch-youngmulti.gif" alt="user-img" class="fire">
            </div>
            <h2>${friend.name.first} ${friend.name.last}</h2>
            <p>${friend.dob.age} years old</p>
            <p>${friend.email}</p>
            <p>${friend.phone}</p>
        `;
        
        const thrashButton = document.createElement('button');
        thrashButton.textContent = 'Thrash!';
        thrashButton.type = 'button';
        
        card.appendChild(thrashButton);
        friendsContainer.appendChild(card);
    }
}

function resetPages() {
    start = end = 1;
}

function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), timeout);
    };
}



