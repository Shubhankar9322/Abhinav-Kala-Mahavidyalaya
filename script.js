// MAIN SLIDER
let index = 0;
const slides = document.getElementById("slides");
const totalMainSlides = 4;

setInterval(() => {
    index++;
    if (index >= totalMainSlides) index = 0;

    slides.style.transform = `translateX(-${index * 100}%)`;
}, 2000);

<script>
    function handleSubmit(event) {
        event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Get form values
    const fullName = form.querySelector('input[placeholder="Full Name"]').value;
    const subject = form.querySelector('input[placeholder="Subject"]').value;
    const phone = form.querySelector('input[placeholder="Phone Number"]').value;
    const email = form.querySelector('input[placeholder="Email Id"]').value;
    const city = form.querySelector('input[placeholder="City"]').value;
    const state = form.querySelector('input[placeholder="State"]').value;
    const address = form.querySelector('textarea[placeholder="Address"]').value;
    const message = form.querySelector('textarea[placeholder="Message"]').value;

    // Create email content
    const emailContent = `
    Name: ${fullName}
    Email: ${email}
    Phone: ${phone}
    Subject: ${subject}
    City: ${city}
    State: ${state}
    Address: ${address}
    Message: ${message}
    `;

    // Send to backend
    fetch('send-email.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fullName: fullName,
            email: email,
            phone: phone,
            subject: subject,
            city: city,
            state: state,
            address: address,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent successfully!');
        form.reset();
    })
    .catch(error => {
        alert('Error sending message. Please try again.');
        console.error('Error:', error);
    });
}
</script>

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

const galleryWrapper = document.querySelector('.gallery-wrapper');
let scrollAmount = 0;

setInterval(() => {
    scrollAmount += 2;
    galleryWrapper.scrollLeft = scrollAmount;

    if (galleryWrapper.scrollLeft >= galleryWrapper.scrollWidth / 2) {
        scrollAmount = 0;
    }
}, 30);

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