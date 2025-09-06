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

        // Get DOM elements
        const addCommentBtn = document.getElementById('addCommentBtn');
        const commentForm = document.getElementById('commentForm');
        const submitCommentBtn = document.getElementById('submitComment');
        const commentText = document.getElementById('commentText');
        const commentsContainer = document.getElementById('commentsContainer');
        
        // Toggle comment form visibility
        addCommentBtn.addEventListener('click', () => {
            if (commentForm.style.display === 'block') {
                commentForm.style.display = 'none';
            } else {
                commentForm.style.display = 'block';
                commentText.focus(); // Auto-focus the textarea
            }
        });
        
        // Handle form submission
        submitCommentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const comment = commentText.value.trim();
            
            if (comment) {
                // Create new comment element
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <p>${comment}</p>
                    <small>Posted just now</small>
                `;
                
                // Add to comments container
                commentsContainer.prepend(newComment);
                
                // Reset and hide form
                commentText.value = '';
                commentForm.style.display = 'none';
                
                // Show confirmation (optional)
                alert('Thank you for your feedback!');
            } else {
                alert('Please write your comment before submitting.');
            }
        });
        
        // Close form when clicking outside
        document.addEventListener('click', (e) => {
            if (!commentForm.contains(e.target) && e.target !== addCommentBtn) {
                commentForm.style.display = 'none';
            }
        });

const counters = document.querySelectorAll(".stat-num");

const animateCounters = () => {
    counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 30);
        } else {
        counter.innerText = target;
        }
    };
    updateCount();
    });
};

let triggered = false;
window.addEventListener("scroll", () => {
    const statsSection = document.querySelector(".stats");
    const rect = statsSection.getBoundingClientRect();
    if (!triggered && rect.top < window.innerHeight) {
        animateCounters();
        triggered = true;
    }
});