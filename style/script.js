// ============================================================
// GREEN POINT RESTAURANT — Main Script (Fully Fixed)
// ============================================================

// --- Mobile Navigation ---
const menuToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("showing");
    document.body.style.overflow = navMenu.classList.contains("showing") ? "hidden" : "";
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("showing");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

// --- Team Carousel Layout ---
function updateTeamCarousel() {
  document.querySelectorAll('.team-slide').forEach(slide => {
    slide.style.gridTemplateColumns = window.innerWidth <= 768 ? '1fr' : 'repeat(2, 1fr)';
  });
}
updateTeamCarousel();
window.addEventListener('resize', updateTeamCarousel);

// --- Touch Support ---
let touchStartX = 0;
let touchEndX = 0;

const heroSliderEl = document.querySelector('.hero-slides');
if (heroSliderEl) {
  heroSliderEl.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, false);
  heroSliderEl.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) showNextHeroSlide();
    else if (touchEndX > touchStartX + 50) showPrevHeroSlide();
  }, false);
}

const teamCarouselEl = document.querySelector('.team-slides');
if (teamCarouselEl) {
  teamCarouselEl.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, false);
  teamCarouselEl.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) { teamSlideIndex = (teamSlideIndex + 1) % totalTeamSlides; showTeamSlide(teamSlideIndex); }
    else if (touchEndX > touchStartX + 50) { teamSlideIndex = (teamSlideIndex - 1 + totalTeamSlides) % totalTeamSlides; showTeamSlide(teamSlideIndex); }
  }, false);
}

// --- Hero Slider ---
let heroSlideIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
let heroAutoplay = true;
let heroTimer;

function showHeroSlide(index) {
  heroSlides.forEach(s => s.classList.remove('active'));
  heroDots.forEach(d => d.classList.remove('active'));
  heroSlideIndex = (index + heroSlides.length) % heroSlides.length;
  if (heroSlides[heroSlideIndex]) heroSlides[heroSlideIndex].classList.add('active');
  if (heroDots[heroSlideIndex]) heroDots[heroSlideIndex].classList.add('active');
}

function showNextHeroSlide() { showHeroSlide(heroSlideIndex + 1); }
function showPrevHeroSlide() { showHeroSlide(heroSlideIndex - 1); }

function startHeroAutoplay() {
  heroTimer = setInterval(() => { if (heroAutoplay) showNextHeroSlide(); }, 5000);
}

if (heroSlides.length > 0) {
  // Dot clicks
  heroDots.forEach((dot, i) => dot.addEventListener('click', () => { showHeroSlide(i); }));
  // Arrow buttons
  const prevHero = document.getElementById('heroPrev');
  const nextHero = document.getElementById('heroNext');
  const pauseBtn = document.getElementById('heroPause');
  if (prevHero) prevHero.addEventListener('click', () => { showPrevHeroSlide(); });
  if (nextHero) nextHero.addEventListener('click', () => { showNextHeroSlide(); });
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      heroAutoplay = !heroAutoplay;
      pauseBtn.textContent = heroAutoplay ? '⏸' : '▶';
      pauseBtn.setAttribute('aria-label', heroAutoplay ? 'Pause slideshow' : 'Play slideshow');
    });
  }
  startHeroAutoplay();
}

// --- Team Carousel ---
let teamSlideIndex = 0;
const teamSlidesWrapper = document.querySelector('.team-slides');
const teamDots = document.querySelectorAll('.team .carousel-dot');
const totalTeamSlides = document.querySelectorAll('.team-slide').length;

function showTeamSlide(index) {
  teamSlideIndex = (index + totalTeamSlides) % totalTeamSlides;
  if (teamSlidesWrapper) teamSlidesWrapper.style.transform = `translateX(-${teamSlideIndex * 100}%)`;
  teamDots.forEach(dot => dot.classList.remove('active'));
  if (teamDots[teamSlideIndex]) teamDots[teamSlideIndex].classList.add('active');
}

teamDots.forEach(dot => {
  dot.addEventListener('click', () => showTeamSlide(parseInt(dot.dataset.index)));
});

// Team nav arrows
const teamPrev = document.getElementById('teamPrev');
const teamNext = document.getElementById('teamNext');
if (teamPrev) teamPrev.addEventListener('click', () => showTeamSlide(teamSlideIndex - 1));
if (teamNext) teamNext.addEventListener('click', () => showTeamSlide(teamSlideIndex + 1));

if (totalTeamSlides > 0) {
  setInterval(() => showTeamSlide(teamSlideIndex + 1), 5000);
}

// --- Animated Counters ---
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const isFloat = target % 1 !== 0;
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
    }, 30);
  });
}

let counterTriggered = false;
const statsSection = document.querySelector(".stats");
if (statsSection) {
  window.addEventListener("scroll", () => {
    const rect = statsSection.getBoundingClientRect();
    if (!counterTriggered && rect.top < window.innerHeight) {
      animateCounters();
      counterTriggered = true;
    }
  });
}

// --- Feedback Textarea Submit (footer) ---
document.querySelectorAll('.footer-section textarea').forEach(ta => {
  const btn = document.createElement('button');
  btn.textContent = 'Send Feedback';
  btn.className = 'feedback-submit-btn';
  btn.style.cssText = 'margin-top:8px;padding:6px 14px;background:#FF6016;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.85rem;';
  ta.parentNode.insertBefore(btn, ta.nextSibling);
  btn.addEventListener('click', () => {
    if (ta.value.trim()) {
      btn.textContent = 'Thanks for your feedback!';
      btn.style.background = '#1D503A';
      ta.value = '';
      setTimeout(() => { btn.textContent = 'Send Feedback'; btn.style.background = '#FF6016'; }, 3000);
    }
  });
});

// --- Newsletter Signup ---
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMsg = document.getElementById('newsletterMsg');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value.trim();
    if (!email) return;
    const btn = newsletterForm.querySelector('button');
    btn.textContent = 'Subscribing...';
    btn.disabled = true;

    // Save to Google Sheets
    try {
      await fetch('https://script.google.com/macros/s/AKfycbxqXPG0dLvwSCWYFJzoJnGPyv4dNIdXlaSc8SpZMrEswL08p2s4u2m-HUG71VSVK04J/exec', {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email, timestamp: new Date().toISOString() })
      });
    } catch(err) {}

    newsletterMsg.textContent = '🎉 You\'re subscribed! Watch your inbox for weekly specials.';
    newsletterMsg.style.color = 'var(--light-green)';
    newsletterForm.reset();
    btn.textContent = 'Subscribe';
    btn.disabled = false;
  });
}
