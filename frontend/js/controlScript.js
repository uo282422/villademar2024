let currentSlide = -1;
const carouselSection = document.getElementById('carrPage');
const buttonSection = document.getElementById('buttonPage');

function showSlide(index) {
    carouselSection.style.display = 'flex';
    const slides = document.querySelectorAll('.carousel-item');

    if (index >= slides.length) {
        index = 0;
    } else if (index < 0) {
        index = slides.length - 1;
    }

    if (index === currentSlide) {
        carouselSection.style.display = 'none';
        currentSlide = -1;
    } else {
        currentSlide = index;
        carouselSection.style.backgroundImage = `url('/resources/images/liso${currentSlide}b.png')`;
        const offset = -currentSlide * 100;
        document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;

        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');

        adjustCarouselHeight(); // Adjust the height of the carousel
        scrollToCarousel();
    }
}

function adjustCarouselHeight() {
    const activeSlide = document.querySelector('.carousel-item.active');
    if (activeSlide) {
        const height = activeSlide.offsetHeight;
        document.querySelector('.carousel').style.height = `${height}px`;
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function hide() {
    buttonSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        carouselSection.style.display = 'none';
        currentSlide = -1;
    }, 500); 
}

function goTop() {
    const top = document.getElementById('mainPage');
    top.scrollIntoView({ behavior: 'smooth' });
}

function scrollToCarousel() {
    carouselSection.scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('resize', adjustCarouselHeight); // Adjust on window resize
