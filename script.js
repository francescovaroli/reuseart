const nav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a, .hero-links a, .brand');
const revealItems = document.querySelectorAll('.reveal');
const yearEl = document.getElementById('year');
const langToggle = document.getElementById('lang-toggle');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ── Translations ────────────────────────────────────────────────────────────
const translations = {
  en: {
    'nav-gallery': 'Gallery',
    'nav-contact': 'Contact',
    'hero-subtitle': 'Recreating my favourite places in Zurich, through my favourite pieces of art.',
    'art1-meta': 'Collage · 2024 · 50 × 70 cm',
    'art1-desc': "A late swim in the Limmat, when few people are still around, and the colors of the sunset fill the sky. This is how summer feels to me, the dreamlike evenings that should never end. It's this emotion that I tried to capture using an old beautiful calendar of Klimt's masterpieces. After months of cutting, gluing, and rearranging, the Fir Forest had turned into a river while Mäda Primavesi's dress into white clouds. At last, Unterer Letten emerged.",
    'art2-meta': 'Collage · 2025 · 60 × 50 cm',
    'art2-desc': 'Sitting on the colorful chairs of Nordbrücke with a glass of wine and Wipkingen passing by. Everyone should get to experience the life, community, chaos and joy of this place. Leaving behind the solitude of the museum, the figures painted by Renoir, Van Gogh and many others, headed for a coffee and chat in our neighbourhood. Should we meet at Nordbrücke?',
    'art3-meta': 'Collage · 2025 · 20 × 30 cm',
    'art3-desc': "She is having a sleep in Van Gogh's blue skies, and it doesn't look like she's getting up anytime soon. A rainy Sunday lost in this fluffy quilt is what I would call a good Winter day.",
    'art4-meta': 'Collage · 2026 · 70 × 50 cm',
    'art4-desc': 'This old man is feeling the pressure of the whole city on his shoulders. None is around and yet everything is so crowded. Luckily he found this little corner, where an unexpected kiosk gives shelter to the wandering outcasts.',
    'art5-meta': 'Collage · 2024 · 20 × 15 cm',
    'art5-desc': 'Is there a place between observation and creation? Pablo Picasso, Samuel Buri, and Martin Peter Fluck join forces in this three-pieces collage depicting a simple answer to this impossible question.',
    'footer-newtab': '(opens in new tab)',
    'footer-rights': 'All rights reserved.',
  },
  de: {
    'nav-gallery': 'Galerie',
    'nav-contact': 'Kontakt',
    'hero-subtitle': 'Meine Lieblingsorte in Zürich, neu erschaffen durch meine Lieblingskunstwerke.',
    'art1-meta': 'Collage · 2024 · 50 × 70 cm',
    'art1-desc': 'Ein spätes Bad in der Limmat, wenn kaum noch Menschen da sind und die Farben des Sonnenuntergangs den Himmel füllen. So fühlt sich für mich der Sommer an – diese traumhaften Abende, die nie enden sollten. Genau dieses Gefühl versuchte ich festzuhalten, mit einem alten Kalender voller Klimt-Meisterwerke. Nach monatelangem Schneiden, Kleben und Umordnen war aus dem Tannenwald ein Fluss geworden und aus Mäda Primavesis Kleid weiße Wolken. Und so entstand der Untere Letten.',
    'art2-meta': 'Collage · 2025 · 60 × 50 cm',
    'art2-desc': 'Auf den bunten Stühlen der Nordbrücke sitzen, ein Glas Wein in der Hand, und Wipkingen vorbeiziehen sehen. Dieses Leben, diese Gemeinschaft, das Chaos und die Freude dieses Ortes – das sollte jeder erleben dürfen. Die Figuren von Renoir, Van Gogh und vielen anderen haben die Einsamkeit des Museums hinter sich gelassen und sind für einen Kaffee und ein Gespräch in unser Quartier gekommen. Treffen wir uns an der Nordbrücke?',
    'art3-meta': 'Collage · 2025 · 20 × 30 cm',
    'art3-desc': 'Sie schläft in Van Goghs blauen Himmeln, und es sieht nicht danach aus, als würde sie so bald aufwachen. Ein verregneter Sonntag, verloren in dieser flauschigen Decke – das wäre für mich ein guter Wintertag.',
    'art4-meta': 'Collage · 2026 · 70 × 50 cm',
    'art4-desc': 'Dieser alte Mann trägt den Druck der ganzen Stadt auf seinen Schultern. Niemand ist um ihn herum, und doch ist alles so gedrängt. Zum Glück hat er diese kleine Ecke gefunden, wo ein unerwarteter Kiosk den umherirrenden Außenseitern Zuflucht bietet.',
    'art5-meta': 'Collage · 2024 · 20 × 15 cm',
    'art5-desc': 'Gibt es einen Ort zwischen Beobachtung und Schöpfung? Pablo Picasso, Samuel Buri und Martin Peter Fluck vereinen ihre Kräfte in dieser dreiteiligen Collage und geben eine einfache Antwort auf diese unmögliche Frage.',
    'footer-newtab': '(öffnet in neuem Tab)',
    'footer-rights': 'Alle Rechte vorbehalten.',
  },
};

// ── Language logic ───────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('lang') || 'en';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });

  // Update button label to show the OTHER language (the one you can switch to)
  if (langToggle) {
    langToggle.textContent = lang === 'en' ? 'DE' : 'EN';
    langToggle.setAttribute('aria-label', lang === 'en' ? 'Auf Deutsch wechseln' : 'Switch to English');
  }
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'de' : 'en');
  });
}

// Apply saved/default language on load
applyLanguage(currentLang);

// ── Nav scroll background ────────────────────────────────────────────────────
const updateNavBackground = () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
};

updateNavBackground();
window.addEventListener('scroll', updateNavBackground);

// ── Mobile menu ──────────────────────────────────────────────────────────────
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

// ── Reveal animation ─────────────────────────────────────────────────────────
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

revealItems.forEach((item) => observer.observe(item));
