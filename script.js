const nav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a, .hero-links a, .brand');
const revealItems = document.querySelectorAll('.reveal');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Toggle subtle nav background after the user starts scrolling.
const updateNavBackground = () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
};

updateNavBackground();
window.addEventListener('scroll', updateNavBackground);

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('open');
  });
}

// Close mobile menu when a navigation link is selected.
navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    if (navLinks?.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Fade artworks in as they enter the viewport.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px'
  }
);

revealItems.forEach((item, index) => {
  observer.observe(item);
  // Show the first artwork immediately on page load
  if (index === 0) {
    item.classList.add('visible');
  }
});
