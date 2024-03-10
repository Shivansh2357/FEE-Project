let currentIndex = 0;
const intervalTime = 3000; // Set the interval time in milliseconds (e.g., 5000ms = 5 seconds)
let slideInterval;

function startSlider() {
    slideInterval = setInterval(nextSlide, intervalTime);
}

function stopSlider() {
    clearInterval(slideInterval);
}

function showSlide(index) {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }

    const translateValue = -currentIndex * 100 + '%';
    slider.style.transform = 'translateX(' + translateValue + ')';
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

startSlider(); // Start the slider automatically

// Pause the slider when the user hovers over it
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', stopSlider);

// Resume the slider when the user moves the mouse out
sliderContainer.addEventListener('mouseleave', startSlider);
