let currentSlide = -1;
const carouselSection = document.getElementById('carrPage');
const buttonSection = document.getElementById('buttonPage');


function showSlide(index) {
    carouselSection.style.display = 'flex';
    

    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        if(index === currentSlide){
            carouselSection.style.display = 'none';
            currentSlide = -1;
        }else{
            currentSlide = index;
            carouselSection.style.backgroundImage = `url('/resources/images/fondo${currentSlide}.png')`;
            const offset = -currentSlide * 100;
            document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
        
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide].classList.add('active');
            scrollToCarousel()
        }
        
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



function scrollToCarousel() {
    carouselSection.scrollIntoView({ behavior: 'smooth' });
}
