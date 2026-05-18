// MAIN SLIDER
let index = 0;
const slides = document.getElementById("slides");
const totalMainSlides = 4;

setInterval(() => {
    index++;
    if (index >= totalMainSlides) index = 0;

    slides.style.transform = `translateX(-${index * 100}%)`;
}, 2000);


// UPDATE SLIDER
let currentSlide = 0;
const track = document.getElementById("updatesTrack");
const dots = document.querySelectorAll(".dot");
const totalUpdateSlides = dots.length;

function updateSlider(i) {
    track.style.transform = `translateX(-${i * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[i].classList.add("active");
}

// AUTO SLIDE
setInterval(() => {
    currentSlide++;
    if (currentSlide >= totalUpdateSlides) currentSlide = 0;

    updateSlider(currentSlide);
}, 3000);

// DOT CLICK
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        currentSlide = i;
        updateSlider(currentSlide);
    });
});


// GALLERY SCROLL
function scrollGallery(direction) {
    const container = document.getElementById("galleryWrapper");
    const scrollAmount = 320;

    container.scrollLeft += direction * scrollAmount;
}

document.addEventListener('DOMContentLoaded', function() {
    // Get all course buttons
    const buttons = document.querySelectorAll('.course-btn');
    
    // Add click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the course number from data attribute
            const courseId = this.getAttribute('data-course');
            
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all course details
            const courseDetails = document.querySelectorAll('.course-detail');
            courseDetails.forEach(detail => detail.classList.remove('active'));
            
            // Show the selected course detail
            const selectedCourse = document.getElementById(`course-${courseId}`);
            if (selectedCourse) {
                selectedCourse.classList.add('active');
            }
        });
    });
});