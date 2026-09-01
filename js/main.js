// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const full = item.getAttribute('data-full');
    const alt = item.querySelector('img').getAttribute('alt');
    lightboxImg.src = full;
    lightboxImg.alt = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// About section image slideshow
const aboutSlideshow = document.getElementById('aboutSlideshow');
if (aboutSlideshow) {
  const slides = Array.from(aboutSlideshow.querySelectorAll('img'));
  let current = 0;
  if (slides.length > 1) {
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 4500);
  }
}

// Reviews carousel
const reviewsTrack = document.getElementById('reviewsTrack');
const reviewPrev = document.getElementById('reviewPrev');
const reviewNext = document.getElementById('reviewNext');

if (reviewsTrack && reviewPrev && reviewNext) {
  const scrollByCard = (dir) => {
    const card = reviewsTrack.querySelector('.review-card');
    const amount = card ? card.getBoundingClientRect().width + 24 : 300;
    // RTL: "next" moves visually left, which is a negative scrollLeft delta in RTL scroll containers.
    reviewsTrack.scrollBy({ left: dir * -amount, behavior: 'smooth' });
  };
  reviewNext.addEventListener('click', () => scrollByCard(1));
  reviewPrev.addEventListener('click', () => scrollByCard(-1));
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
