const track = document.getElementById('track'),
    sliderDots = document.getElementById('slider-dots'),
    slides = Array.from(track.children),
    pages = Array.from(sliderDots.children),
    autoplayCheck = document.getElementById('autoplay'),
    showArrowsCheck = document.getElementById('show-arrows'),
    showPagesCheck = document.getElementById('show-pages'),
    animationSpeedInput = document.getElementById('animation-speed'),
    prevButton = document.getElementById('prev'),
    nextButton = document.getElementById('next');

const images = [
    "https://picsum.photos/1600/500?random=1",
    "https://picsum.photos/1600/500?random=2",
    "https://picsum.photos/1600/500?random=3",
]

let currentSlide = 0;
let autoplay = false;
let intervalId = '';

window.addEventListener('load', () => {
    for(let i = 0; i < images.length; i++) {
        slides[i].style.background = `url(${images[i]}) no-repeat`;
    }
    for(let i = 0; i < pages.length; i++) {
        pages[i].addEventListener('click', () => {
            currentSlide = i;
            updateSlidePosition();
        });
    }
})

autoplayCheck.addEventListener('change', () => {
    autoplay = autoplayCheck.checked;
    if(autoplay) {
        intervalId = setInterval(nextSlide, 3000);
    }
    else {
        clearInterval(intervalId);
    }
})

showArrowsCheck.addEventListener('change', () => {
    const checked = showArrowsCheck.checked;
    prevButton.style.display = checked ? 'block' : 'none';
    nextButton.style.display = checked ? 'block' : 'none';
})

showPagesCheck.addEventListener('change', () => {
    const checked = showPagesCheck.checked;
    sliderDots.style.display = checked ? 'flex' : 'none';
})

animationSpeedInput.addEventListener('change', (e) => {
    track.style.transitionDuration = `${e.target.value}ms`;
})

function updateSlidePosition() {
    for(const page of pages) {
        page.classList.remove('selected');
    }
    pages[currentSlide].classList.add('selected');
    track.style.transform = 'translateX(-' + currentSlide * 100 + '%)';
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlidePosition();
}

track.addEventListener('mouseover', () => {
    clearInterval(intervalId);
})

track.addEventListener('mouseleave', () => {
    if(autoplay) {
        intervalId = setInterval(nextSlide, 3000);
    }
})

function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlidePosition();
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', previousSlide);
window.addEventListener('keydown', (e) => {
    if(e.key == 'ArrowLeft') {
        previousSlide();
    }
    else if(e.key == 'ArrowRight') {
        nextSlide();
    }
})