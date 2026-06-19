// Mobile Navigation
const menuToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("showing");
    document.body.style.overflow = navMenu.classList.contains("showing") ? "hidden" : "";
  });
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("showing");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

function updateTeamCarousel() {
  if (window.innerWidth <= 768) {
    // Single column layout for mobile
    document.querySelectorAll('.team-slide').forEach(slide => {
      slide.style.gridTemplateColumns = '1fr';
    });
  } else {
    // Two columns for larger screens
    document.querySelectorAll('.team-slide').forEach(slide => {
      slide.style.gridTemplateColumns = 'repeat(2, 1fr)';
    });
  }
}

// Initialize and update on resize
updateTeamCarousel();
window.addEventListener('resize', updateTeamCarousel);

// Touch support for carousels
let touchStartX = 0;
let touchEndX = 0;

// Add touch events to hero slider
const heroSlider = document.querySelector('.hero-slides');
if (heroSlider) {
  heroSlider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  heroSlider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
}

// Add touch events to team carousel
const teamCarousel = document.querySelector('.team-slides');
if (teamCarousel) {
  teamCarousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  teamCarousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleTeamSwipe();
  }, false);
}

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left - next slide
    showNextHeroSlide();
  }
}

function handleTeamSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left - next slide
    teamSlideIndex = (teamSlideIndex + 1) % totalTeamSlides;
    showTeamSlide(teamSlideIndex);
  } else if (touchEndX > touchStartX + 50) {
    // Swipe right - previous slide
    teamSlideIndex = (teamSlideIndex - 1 + totalTeamSlides) % totalTeamSlides;
    showTeamSlide(teamSlideIndex);
  }
}

// Hero Image Slider
let heroSlideIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slide');

function showNextHeroSlide() {
    heroSlides[heroSlideIndex].classList.remove('active');
    heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
    heroSlides[heroSlideIndex].classList.add('active');
}

setInterval(showNextHeroSlide, 5000);

// Team Carousel with 2 columns
let teamSlideIndex = 0;
const teamSlides = document.querySelector('.team-slides');
const teamDots = document.querySelectorAll('.team .carousel-dot');
const totalTeamSlides = document.querySelectorAll('.team-slide').length;
        
function showTeamSlide(index) {
    teamSlideIndex = index;
    teamSlides.style.transform = `translateX(-${index * 100}%)`;          
    teamDots.forEach(dot => dot.classList.remove('active'));
    teamDots[index].classList.add('active');
}
        
teamDots.forEach(dot => {
    dot.addEventListener('click', () => {
    showTeamSlide(parseInt(dot.dataset.index));
});
});
        
// Auto-rotate team slides
    setInterval(() => {
    teamSlideIndex = (teamSlideIndex + 1) % totalTeamSlides;
    showTeamSlide(teamSlideIndex);
}, 5000);

submitComment.addEventListener('click', () => {
    const commentText = document.querySelector('.comment-form textarea').value;
    if (commentText.trim() !== '') {
        // In a real implementation, you would send this to a server
        // For now, we'll just simulate adding a new comment
        alert('Thank you for your feedback! Your comment has been submitted.');
        document.querySelector('.comment-form textarea').value = '';
        commentForm.style.display = 'none';
    } else {
        alert('Please write your comment before submitting.');
    }
});

const slider = document.getElementById('testimonialSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let index = 0;

function showSlide(i) {
    const cards = document.querySelectorAll('.testimonial-card');
    if (i < 0) index = cards.length - 1;
    else if (i >= cards.length) index = 0;
    else index = i;

    const cardWidth = cards[0].offsetWidth;
    slider.style.transform = `translateX(-${index * cardWidth}px)`;
}

prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));

// Auto-slide
setInterval(() => showSlide(index + 1), 6000);

// Toggle Form
const form = document.getElementById('commentForm');
document.getElementById('showFormBtn').addEventListener('click', () => {
    form.style.display = "block";
});
document.getElementById('closeFormBtn').addEventListener('click', () => {
    form.style.display = "none";
});

// Capture Comment
document.getElementById('submitComment').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = document.getElementById('comment').value.trim();
    if (!name || !email || !comment) return alert("All fields are required!");

    const hash = md5(email.toLowerCase().trim());
    const gravatar = `https://www.gravatar.com/avatar/${hash}?d=identicon`;

    const newCard = document.createElement('div');
    newCard.className = 'testimonial-card';
    newCard.innerHTML = `
        <div class="testimonial-header">
            <img src="${gravatar}" alt="${name}" class="testimonial-image">
            <div class="client-info">
                <div class="client-name">${name}</div>
                <div class="client-email">${email}</div>
            </div>
        </div>
        <p>"${comment}"</p>
    `;
    slider.appendChild(newCard);

    // Reset
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('comment').value = '';
    form.style.display = "none"; // hide form after submit
});

let triggered = false;
window.addEventListener("scroll", () => {
    const statsSection = document.querySelector(".stats");
    const rect = statsSection.getBoundingClientRect();
    if (!triggered && rect.top < window.innerHeight) {
        animateCounters();
        triggered = true;
    }
});