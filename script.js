// ========== GALLERY SCROLL ==========
function scrollGallery(direction) {
    const container = document.getElementById("galleryWrapper");
    if (!container) {
        console.error("Gallery container not found!");
        return;
    }
    container.scrollLeft += direction * 350;
    console.log("Scrolled gallery:", direction);
}

// ========== GALLERY AUTOSCROLL ==========
document.addEventListener('DOMContentLoaded', function () {
    const galleryWrapper = document.getElementById("galleryWrapper");

    if (!galleryWrapper) {
        console.error("Gallery wrapper not found!");
        return;
    }

    let isAutoScrolling = true;

    function autoScroll() {
        if (isAutoScrolling && galleryWrapper) {
            galleryWrapper.scrollLeft += 2;

            if (galleryWrapper.scrollLeft >= galleryWrapper.scrollWidth - galleryWrapper.clientWidth) {
                galleryWrapper.scrollLeft = 0;
            }
        }
    }

    const autoScrollInterval = setInterval(autoScroll, 30);

    galleryWrapper.addEventListener('mouseenter', function () {
        isAutoScrolling = false;
    });

    galleryWrapper.addEventListener('mouseleave', function () {
        isAutoScrolling = true;
    });
});

// ========== FORM SUBMISSION ==========
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const fullName = form.querySelector('input[placeholder="Full Name"]').value;
    const subject = form.querySelector('input[placeholder="Subject"]').value;
    const phone = form.querySelector('input[placeholder="Phone Number"]').value;
    const email = form.querySelector('input[placeholder="Email Id"]').value;
    const city = form.querySelector('input[placeholder="City"]').value;
    const state = form.querySelector('input[placeholder="State"]').value;
    const address = form.querySelector('textarea[placeholder="Address"]').value;
    const message = form.querySelector('textarea[placeholder="Message"]').value;

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
// COURSE BUTTONS FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function () {
    // Get all course buttons
    const buttons = document.querySelectorAll('.course-btn');

    // Add click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function () {
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
// Handle course tab switching
document.querySelectorAll('.course-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const courseId = this.dataset.course;
        switchCourse(courseId);
    });
});

function switchCourse(courseId) {
    // Hide all course details
    document.querySelectorAll('.course-detail').forEach(detail => {
        detail.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.course-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected course and mark button as active
    document.getElementById('course-' + courseId).classList.add('active');
    document.querySelector(`[data-course="${courseId}"]`).classList.add('active');
}

// Handle URL hash on page load
window.addEventListener('load', function () {
    const hash = window.location.hash.substring(1); // Remove the '#'
    if (hash.startsWith('course-')) {
        const courseId = hash.split('-')[1];
        switchCourse(courseId);
    }
});