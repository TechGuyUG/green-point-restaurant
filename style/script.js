// Mobile menu toggle
document.querySelector('.burger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Hero Image Slider
let heroSlideIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slide');

function showNextHeroSlide() {
    heroSlides[heroSlideIndex].classList.remove('active');
    heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
    heroSlides[heroSlideIndex].classList.add('active');
}

setInterval(showNextHeroSlide, 5000);

// Previous JavaScript remains the same

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