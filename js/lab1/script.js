const header = document.getElementById('header');
const button = document.getElementById('btn');

header.innerText = "Hello World!";

function clickButton() {
    console.log("Artem");
}

button.addEventListener("click", clickButton);
