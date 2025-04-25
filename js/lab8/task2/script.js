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

const options = {
    images: [
    "https://picsum.photos/1600/500?random=1",
    "https://picsum.photos/1600/500?random=2",
    "https://picsum.photos/1600/500?random=3",
    ],
    showArrows: true,
    showPages: true,
    autoplay: false,
};

let currentSlide = 0;
let intervalId = '';

window.addEventListener('load', () => {
    prevButton.style.display = options.showArrows ? 'block' : 'none';
    nextButton.style.display = options.showArrows ? 'block' : 'none';
    sliderDots.style.display = options.showPages ? 'flex' : 'none';
    
    showArrowsCheck.checked = options.showArrows;
    showPagesCheck.checked = options.showPages;
    autoplayCheck.checked = options.autoplay;

    for(let i = 0; i < options.images.length; i++) {
        slides[i].style.background = `url(${options.images[i]}) no-repeat`;
    }
    sliderDots.addEventListener('click', (e) => {
        const dot = e.target.closest('.slider-dot');
        if(!dot) return;

        const index = Array.from(sliderDots.children).indexOf(dot);
        currentSlide = index;
        updateSlidePosition();
    })
})

autoplayCheck.addEventListener('change', () => {
    options.autoplay = autoplayCheck.checked;
    if(options.autoplay) {
        intervalId = setInterval(nextSlide, 3000);
    }
    else {
        clearInterval(intervalId);
    }
})

showArrowsCheck.addEventListener('change', () => {
    options.showArrows = showArrowsCheck.checked;
    prevButton.style.display = options.showArrows ? 'block' : 'none';
    nextButton.style.display = options.showArrows ? 'block' : 'none';
})

showPagesCheck.addEventListener('change', () => {
    options.showPages = showPagesCheck.checked;
    sliderDots.style.display = options.showPages ? 'flex' : 'none';
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
    if(options.autoplay) {
        intervalId = setInterval(nextSlide, 3000);
    }
    else clearInterval(intervalId);
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