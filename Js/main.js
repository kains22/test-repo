const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const slides = document.querySelectorAll('.slide');
const video = document.getElementById("my-video")
const marquee = document.getElementsByClassName("marquee")


// Clone the first and last items to create a seamless loop
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

carouselInner.appendChild(firstClone);
carouselInner.insertBefore(lastClone, items[0]);

let index = 1; // Start at the first real item
const itemWidth = items[0].clientWidth + 10; // Width of an item + margin-right

// Set initial position
carouselInner.style.transform = `translateX(${-itemWidth}px)`;

function updateCarousel() {
    index++;
    carouselInner.style.transition = 'transform 0.5s ease-in-out';
    carouselInner.style.transform = `translateX(${-index * itemWidth}px)`;

    // Reset to real first item
    if (index === items.length + 1) {
        setTimeout(() => {
            carouselInner.style.transition = 'none';
            index = 1;
            carouselInner.style.transform = `translateX(${-itemWidth}px)`;
        }, 500);
    }

    // Reset to real last item
    if (index === 0) {
        setTimeout(() => {
            carouselInner.style.transition = 'none';
            index = items.length;
            carouselInner.style.transform = `translateX(${-index * itemWidth}px)`;
        }, 500);
    }
}

// Auto-scroll every 3 seconds
setInterval(updateCarousel, 2500);
let slideIndex = 0;

function showSlides() {
    slides.forEach(slide => {
        slide.classList.remove('show');
    });

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].classList.add('show');
}

// Change image every 3 seconds (3000 ms)
setInterval(showSlides, 3000);


let currentSlide = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');

function showSlide(index) {
    testimonialSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'next');
        if (i === index) {
            slide.classList.add('active');
        } else if (i === (index + 1) % testimonialSlides.length) {
            slide.classList.add('next');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}

function handleClick(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

setInterval(nextSlide, 6000); // Change slide every 3 seconds

testimonialSlides.forEach((slide, index) => {
    slide.addEventListener('click', () => handleClick(index));
});

// Initial setup
showSlide(currentSlide);

// Restart video when it ends

video.addEventListener('ended', function() {
    video.currentTime = 0;
    video.play();
});

// humburger code

function toggleMenu() {
    // Toggle the 'show' class on the ul.nav-links to show/hide the menu
    const menu = document.querySelector('.nav-left ul');
    menu.classList.toggle('show');

    // Toggle the 'hide' class on all other content
    const otherContent = document.querySelectorAll('.mid-img, .mid-content, .marquee, .content-3, .title, .carousel-container, .slideshow-container, .testimonial-container, .content-4');
    otherContent.forEach(item => {
        item.classList.toggle('hide');
    });

    const marquee = document.querySelector('.marquee');
    const spans = marquee.querySelectorAll('span');
    spans.forEach(span => span.remove());
}