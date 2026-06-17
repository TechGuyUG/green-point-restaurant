// Mobile Navigation
const menuToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("showing");
    document.body.style.overflow = navMenu.classList.contains("showing") ? "hidden" : "";
  });
}

if (navMenu && menuToggle) {
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("showing");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

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
  if (Math.abs(touchEndX - touchStartX) < 50) return;
  if (touchEndX < touchStartX) {
    showNextHeroSlide();
  } else {
    showHeroSlide(heroSlideIndex - 1);
  }
}

function handleTeamSwipe() {
  if (touchEndX < touchStartX - 50) {
    teamSlideIndex = (teamSlideIndex + 1) % totalTeamSlides;
    showTeamSlide(teamSlideIndex);
  } else if (touchEndX > touchStartX + 50) {
    teamSlideIndex = (teamSlideIndex - 1 + totalTeamSlides) % totalTeamSlides;
    showTeamSlide(teamSlideIndex);
  }
}

// Hero Image Slider
let heroSlideIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const heroIndicators = document.querySelector('.hero-indicators');
const heroToggleBtn = document.getElementById('heroToggleBtn');
let heroInterval = null;
let heroPlaying = true;
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function createHeroIndicators() {
  if (!heroIndicators) return;
  heroSlides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero-dot';
    dot.setAttribute('aria-label', `Show slide ${index + 1}`);
    dot.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    dot.dataset.index = index;
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showHeroSlide(index));
    heroIndicators.appendChild(dot);
  });
}

function updateHeroIndicators() {
  if (!heroIndicators) return;
  heroIndicators.querySelectorAll('.hero-dot').forEach(dot => {
    const isActive = parseInt(dot.dataset.index, 10) === heroSlideIndex;
    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function showHeroSlide(index) {
    if (heroSlides.length === 0) return;
    heroSlides[heroSlideIndex].classList.remove('active');
    heroSlideIndex = ((index % heroSlides.length) + heroSlides.length) % heroSlides.length;
    heroSlides[heroSlideIndex].classList.add('active');
    updateHeroIndicators();
}

function showNextHeroSlide() {
    if (heroSlides.length === 0) return;
    showHeroSlide(heroSlideIndex + 1);
}

function startHeroAutoRotate() {
  if (heroInterval) clearInterval(heroInterval);
  heroInterval = setInterval(showNextHeroSlide, 5000);
  heroPlaying = true;
  if (heroToggleBtn) heroToggleBtn.textContent = 'Pause';
  if (heroToggleBtn) heroToggleBtn.setAttribute('aria-label', 'Pause slideshow');
}

function stopHeroAutoRotate() {
  if (heroInterval) clearInterval(heroInterval);
  heroPlaying = false;
  if (heroToggleBtn) heroToggleBtn.textContent = 'Play';
  if (heroToggleBtn) heroToggleBtn.setAttribute('aria-label', 'Play slideshow');
}

if (heroToggleBtn) {
  heroToggleBtn.addEventListener('click', () => {
    heroPlaying ? stopHeroAutoRotate() : startHeroAutoRotate();
  });
}

if (heroSlides.length > 0) {
  createHeroIndicators();
  if (reduceMotionQuery.matches) {
    stopHeroAutoRotate();
  } else {
    startHeroAutoRotate();
  }
}

// Team Carousel with 2 columns
let teamSlideIndex = 0;
const teamSlides = document.querySelector('.team-slides');
const teamDots = document.querySelectorAll('.team .carousel-dot');
const totalTeamSlides = document.querySelectorAll('.team-slide').length;
const teamPrevBtn = document.querySelector('.team-nav.team-prev');
const teamNextBtn = document.querySelector('.team-nav.team-next');
        
function showTeamSlide(index) {
    if (!teamSlides || totalTeamSlides === 0) return;
    teamSlideIndex = ((index % totalTeamSlides) + totalTeamSlides) % totalTeamSlides;
    teamSlides.style.transform = `translateX(-${teamSlideIndex * 100}%)`;          
    teamDots.forEach(dot => dot.classList.remove('active'));
    teamDots.forEach(dot => dot.setAttribute('aria-current', 'false'));
    if (teamDots[teamSlideIndex]) {
      teamDots[teamSlideIndex].classList.add('active');
      teamDots[teamSlideIndex].setAttribute('aria-current', 'true');
    }
}
        
if (teamDots.length > 0) {
    teamDots.forEach(dot => {
        dot.addEventListener('click', () => {
            showTeamSlide(parseInt(dot.dataset.index));
        });
    });
}

if (teamPrevBtn) {
  teamPrevBtn.addEventListener('click', () => showTeamSlide(teamSlideIndex - 1));
}

if (teamNextBtn) {
  teamNextBtn.addEventListener('click', () => showTeamSlide(teamSlideIndex + 1));
}

if (teamSlides && totalTeamSlides > 0) {
  showTeamSlide(0);
    setInterval(() => {
        showTeamSlide(teamSlideIndex + 1);
    }, 5000);
}

const slider = document.getElementById('testimonialSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let testimonialIndex = 0;

function showSlide(i) {
    if (!slider) return;
    const cards = slider.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;

    if (i < 0) testimonialIndex = cards.length - 1;
    else if (i >= cards.length) testimonialIndex = 0;
    else testimonialIndex = i;

    const cardWidth = cards[0].offsetWidth;
    slider.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;
}

if (prevBtn) prevBtn.addEventListener('click', () => showSlide(testimonialIndex - 1));
if (nextBtn) nextBtn.addEventListener('click', () => showSlide(testimonialIndex + 1));
if (slider) setInterval(() => showSlide(testimonialIndex + 1), 6000);

const commentForm = document.getElementById('commentForm');
const showFormBtn = document.getElementById('showFormBtn');
const closeFormBtn = document.getElementById('closeFormBtn');
const submitCommentBtn = document.getElementById('submitComment');

if (showFormBtn && commentForm) {
    showFormBtn.addEventListener('click', () => {
        commentForm.style.display = 'block';
    });
}

if (closeFormBtn && commentForm) {
    closeFormBtn.addEventListener('click', () => {
        commentForm.style.display = 'none';
    });
}

if (submitCommentBtn) {
    submitCommentBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const commentInput = document.getElementById('comment');
        if (!nameInput || !emailInput || !commentInput) return;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const comment = commentInput.value.trim();

        if (!name || !email || !comment) return alert('All fields are required!');

        const hash = md5(email.toLowerCase().trim());
        const gravatar = `https://www.gravatar.com/avatar/${hash}?d=identicon`;

        if (slider) {
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
        }

        nameInput.value = '';
        emailInput.value = '';
        commentInput.value = '';
        if (commentForm) commentForm.style.display = 'none';
    });
}

let triggered = false;
window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (!triggered && rect.top < window.innerHeight) {
        animateCounters();
        triggered = true;
    }
});