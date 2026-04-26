/* ============================================================
   DHANABAHADUR MUKTAN — PORTFOLIO SCRIPTS
   Features: Typed text, scroll reveal, navbar, skill bars,
             counter animation, project filter, dark/light mode,
             back-to-top, contact form, active nav link
   ============================================================ */

'use strict';

/* ========== DOM READY ========== */
document.addEventListener('DOMContentLoaded', () => {
  // Render dynamic components FIRST so other inits can find the DOM elements
  renderProjects();
  renderSkills();

  initTheme();
  initNavbar();
  initTypedText();
  initScrollReveal();
  initSkillBars();
  initCounters();
  initContactForm();
  initBackToTop();
  initActiveNavLink();
  initHeroCanvas();
  initCVModal();
});

/* ========== CV DOWNLOAD MODAL ========== */
function initCVModal() {
  const cvBtn     = document.getElementById('cvBtn');
  const backdrop  = document.getElementById('cvModalBackdrop');
  const closeBtn  = document.getElementById('cvModalClose');
  const cancelBtn = document.getElementById('cvCancelBtn');
  const downloadBtn = document.getElementById('cvDownloadBtn');

  function openModal() {
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus the download button for accessibility
    setTimeout(() => downloadBtn.focus(), 50);
  }

  function closeModal() {
    backdrop.classList.add('closing');
    setTimeout(() => {
      backdrop.classList.remove('active', 'closing');
      document.body.style.overflow = '';
      cvBtn.focus();
    }, 280);
  }

  cvBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) closeModal();
  });

  // Close modal after download is triggered
  downloadBtn.addEventListener('click', () => {
    setTimeout(closeModal, 300);
  });
}

/* ========== THEME TOGGLE ========== */
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const icon   = document.getElementById('themeIcon');
  const html   = document.documentElement;

  // Load saved preference
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateThemeIcon(saved, icon);
  updateProfilePhoto(saved);          // ← set correct photo on page load

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next, icon);
    updateProfilePhoto(next);          // ← swap photo on every toggle
  });
}

function updateThemeIcon(theme, icon) {
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* Switch profile photo based on active theme */
function updateProfilePhoto(theme) {
  const photo    = document.getElementById('profilePhoto');
  const fallback = document.getElementById('profileFallback');
  if (!photo) return;

  const src = theme === 'dark' ? 'db_moktan_dark.jpg' : 'db_moktan_light.jpg';
  photo.style.display = 'block';       // make sure img is visible when swapping
  if (fallback) fallback.style.display = 'none';

  photo.src = src;                     // swap the image source
  photo.onerror = function () {        // restore fallback if file is missing
    this.style.display = 'none';
    if (fallback) fallback.style.display = 'flex';
  };
}

/* ========== NAVBAR ========== */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const links     = navLinks.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

/* ========== TYPED TEXT ANIMATION ========== */
function initTypedText() {
  const el    = document.getElementById('typedText');
  const words = [
    'Lecturer',
    'BITM Incharge',
    'ML Engineer',
    'NLP Researcher',
    'Data Scientist',
    'Python Developer',
    'Educator & Mentor',
  ];

  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed   = 90;
  const deleteSpeed = 50;
  const pauseTime   = 1800;

  function type() {
    const currentWord = words[wordIdx];

    if (!isDeleting) {
      el.textContent = currentWord.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentWord.length) {
        isDeleting = true;
        setTimeout(type, pauseTime);
        return;
      }
    } else {
      el.textContent = currentWord.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    }
    setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
  }

  type();
}

/* ========== SCROLL REVEAL ========== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animations for groups
        const siblings = entry.target.parentElement
          ? [...entry.target.parentElement.children].filter(el => el.classList.contains('reveal'))
          : [];
        const siblingIndex = siblings.indexOf(entry.target);
        const delay = siblingIndex * 80;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ========== SKILL BARS ========== */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar     = entry.target;
        const width   = bar.getAttribute('data-width');
        // Small delay for visual delight
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ========== COUNTER ANIMATION ========== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1500;
        const step   = target / (duration / 16);
        let current  = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 16);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* NOTE: Profile photo switching is handled by updateProfilePhoto()
   inside initTheme() above. No duplicate listener needed here. */

  /* ============================================================
   ██████╗  █████╗ ████████╗ █████╗
   ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
   ██║  ██║███████║   ██║   ███████║
   ██║  ██║██╔══██║   ██║   ██╔══██║
   ██████╔╝██║  ██║   ██║   ██║  ██║
   ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝

   ══════════════════════════════════════════════
   PROJECTS DATA — add / edit projects here only
   ══════════════════════════════════════════════
   Each object supports:
     title       {string}   Project name
     subtitle    {string}   Short tagline (optional, shows only on featured)
     desc        {string}   Description paragraph
     icon        {string}   Font Awesome class e.g. "fas fa-seedling"
     category    {string}   Space-separated filter tags: "ml", "web", "research"
     tech        {string[]} Tech stack badges
     github      {string}   GitHub URL  (use "" to hide)
     demo        {string}   Live demo URL (use "" to hide)
     featured    {boolean}  true = spans full width with metrics row
     metrics     {array}    [{val, label}] — only shown when featured:true
   ============================================================ */
const PROJECTS_DATA = [
  {
    title    : 'Crop Yield Prediction System',
    subtitle : 'ML-powered agricultural intelligence for Nepal',
    desc     : 'A comprehensive Machine Learning system that predicts crop yields for major Nepali crops (rice, wheat, maize) based on soil composition, climate data, rainfall patterns, and historical yield data. This research addresses food security challenges specific to Nepal\'s diverse agro-climatic zones.',
    icon     : 'fas fa-seedling',
    category : 'ml research',
    tech     : ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Flask', 'Matplotlib'],
    github   : 'https://github.com/DBMoktan/crop-yield-prediction-nepal-ml',
    demo     : 'https://crop-yield-prediction-in-nepal-ml.streamlit.app/',
    featured : true,
    metrics  : [
      { val: '87.7 %', label: 'Accuracy' },
      { val: '5',     label: 'ML Models' },
      { val: '3',     label: 'Crop Types' },
    ],
  },
  {
    title    : 'Nepali Sentiment Analyzer',
    desc     : 'NLP model for sentiment analysis of Nepali text from social media, using a custom-built Nepali dataset. Addresses the scarcity of South Asian language AI tools.',
    icon     : 'fas fa-comment-dots',
    category : 'ml',
    tech     : ['Python', 'NLTK', 'TensorFlow', 'Keras'],
    github   : '#',
    demo     : '',
    featured : false,
  },
  {
    title    : 'Student Result Management System',
    desc     : 'A full-stack web application for managing student academic records, generating transcripts, and tracking performance trends across semesters.',
    icon     : 'fas fa-graduation-cap',
    category : 'web',
    tech     : ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    github   : '#',
    demo     : '#',
    featured : false,
  },
  {
    title    : 'Disease Risk Prediction Model',
    desc     : 'Machine learning classifier for predicting risk of common diseases (diabetes, hypertension) using patient health indicators, trained on local Nepali healthcare data.',
    icon     : 'fas fa-heartbeat',
    category : 'ml',
    tech     : ['Python', 'Random Forest', 'SVM', 'Seaborn'],
    github   : '#',
    demo     : '',
    featured : false,
  },
  {
    title    : 'Nepali Dataset Repository',
    desc     : 'An open-source repository of curated, cleaned Nepali language and agriculture datasets to support ML research — addressing a critical gap in South Asian AI research.',
    icon     : 'fas fa-database',
    category : 'research',
    tech     : ['Python', 'Pandas', 'Data Curation'],
    github   : '#',
    demo     : '',
    featured : false,
  },
  {
    title    : 'ML Lecture Demo Platform',
    desc     : 'Interactive web-based platform for demonstrating Machine Learning concepts to students — including live model training visualizations, algorithm comparisons, and dataset exploration tools.',
    icon     : 'fas fa-robot',
    category : 'web ml',
    tech     : ['Python', 'Flask', 'Chart.js', 'D3.js'],
    github   : '#',
    demo     : '',
    featured : false,
  },
];

/* ============================================================
   SKILLS DATA — add / edit skills here only
   ══════════════════════════════════════════════════════════
   Four group types:
     "bars"   → items need { name, icon, pct }
     "badges" → items need { name, icon }
     "soft"   → items need { name, icon, desc }
   ============================================================ */
const SKILLS_DATA = [
  {
    title : 'Programming Languages',
    icon  : 'fas fa-code',
    type  : 'bars',
    items : [
      { name: 'Python',      icon: 'fab fa-python',   pct: 92 },
      { name: 'SQL',         icon: 'fas fa-database',  pct: 85 },
      { name: 'Java',        icon: 'fab fa-java',      pct: 75 },
      { name: 'JavaScript',  icon: 'fab fa-js',        pct: 70 },
      { name: 'C / C++',     icon: 'fas fa-terminal',  pct: 65 },
    ],
  },
  {
    title : 'ML & Data Science',
    icon  : 'fas fa-brain',
    type  : 'bars',
    items : [
      { name: 'Scikit-learn',        icon: '', pct: 90 },
      { name: 'Pandas / NumPy',      icon: '', pct: 88 },
      { name: 'TensorFlow / Keras',  icon: '', pct: 78 },
      { name: 'Matplotlib / Seaborn',icon: '', pct: 85 },
      { name: 'XGBoost / LightGBM', icon: '', pct: 82 },
    ],
  },
  {
    title : 'Tools & Technologies',
    icon  : 'fas fa-tools',
    type  : 'badges',
    items : [
      { name: 'Git / GitHub',  icon: 'fab fa-git-alt' },
      { name: 'Flask',         icon: 'fas fa-flask' },
      { name: 'Docker',        icon: 'fab fa-docker' },
      { name: 'MySQL',         icon: 'fas fa-database' },
      { name: 'PostgreSQL',    icon: 'fas fa-server' },
      { name: 'Linux',         icon: 'fab fa-linux' },
      { name: 'Jupyter',       icon: 'fas fa-book' },
      { name: 'HTML / CSS',    icon: 'fas fa-globe' },
      { name: 'PHP',           icon: 'fab fa-php' },
      { name: 'Power BI',      icon: 'fas fa-chart-pie' },
      { name: 'Google Colab',  icon: 'fab fa-google' },
      { name: 'REST APIs',     icon: 'fas fa-network-wired' },
    ],
  },
  {
    title : 'Teaching & Soft Skills',
    icon  : 'fas fa-chalkboard-teacher',
    type  : 'soft',
    items : [
      { name: 'Curriculum Development', icon: 'fas fa-users',     desc: 'Designing modern, industry-aligned IT courses' },
      { name: 'Research & Analysis',    icon: 'fas fa-lightbulb', desc: 'Rigorous academic research and publication' },
      { name: 'Academic Communication', icon: 'fas fa-comments',  desc: 'Technical writing and academic presentation' },
      { name: 'Project Management',     icon: 'fas fa-sitemap',   desc: 'Supervising student projects and research teams' },
    ],
  },
];

/* ── Render Skills ─────────────────────────────────────────── */
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  grid.innerHTML = SKILLS_DATA.map(group => {
    let body = '';

    if (group.type === 'bars') {
      body = `<div class="skill-bars">
        ${group.items.map(item => `
          <div class="skill-bar-item">
            <div class="skill-bar-label">
              <span>${item.icon ? `<i class="${item.icon}"></i>` : ''} ${item.name}</span>
              <span class="skill-pct">${item.pct}%</span>
            </div>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" data-width="${item.pct}"></div>
            </div>
          </div>`).join('')}
      </div>`;

    } else if (group.type === 'badges') {
      body = `<div class="skill-badges">
        ${group.items.map(item => `
          <div class="skill-badge">
            ${item.icon ? `<i class="${item.icon}"></i>` : ''}
            ${item.name}
          </div>`).join('')}
      </div>`;

    } else if (group.type === 'soft') {
      body = `<div class="soft-skills">
        ${group.items.map(item => `
          <div class="soft-skill">
            <div class="soft-skill-icon"><i class="${item.icon}"></i></div>
            <div>
              <h5>${item.name}</h5>
              <p>${item.desc}</p>
            </div>
          </div>`).join('')}
      </div>`;
    }

    return `
      <div class="skill-group reveal">
        <div class="skill-group-header">
          <div class="skill-group-icon"><i class="${group.icon}"></i></div>
          <h3>${group.title}</h3>
        </div>
        ${body}
      </div>`;
  }).join('');
}

/* ── Render Projects ───────────────────────────────────────── */
function renderProjects() {
  const filtersEl = document.getElementById('projectFilters');
  const gridEl    = document.getElementById('projectsGrid');
  if (!filtersEl || !gridEl) return;

  // Collect unique categories from data
  const cats = ['all'];
  PROJECTS_DATA.forEach(p => {
    p.category.split(' ').forEach(c => { if (!cats.includes(c)) cats.push(c); });
  });

  const catLabels = { all: 'All', ml: 'Machine Learning', web: 'Web Dev', research: 'Research' };

  // Render filter buttons
  filtersEl.innerHTML = cats.map(c =>
    `<button class="filter-btn ${c === 'all' ? 'active' : ''}" data-filter="${c}">
      ${catLabels[c] || c}
    </button>`
  ).join('');

  // Render project cards
  gridEl.innerHTML = PROJECTS_DATA.map(p => {
    const linksHtml = [
      p.github ? `<a href="${p.github}" class="project-link" title="GitHub"><i class="fab fa-github"></i></a>` : '',
      p.demo   ? `<a href="${p.demo}"   class="project-link" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>` : '',
    ].join('');

    const metricsHtml = p.featured && p.metrics
      ? `<div class="project-metrics">
          ${p.metrics.map(m => `
            <div class="metric">
              <span class="metric-val">${m.val}</span>
              <p>${m.label}</p>
            </div>`).join('')}
        </div>`
      : '';

    const subtitleHtml = p.subtitle
      ? `<p class="project-subtitle">${p.subtitle}</p>` : '';

    const featuredLabel = p.featured
      ? `<div class="project-featured-label"><i class="fas fa-star"></i> Featured Project</div>` : '';

    return `
      <div class="project-card ${p.featured ? 'featured' : ''} reveal" data-category="${p.category}">
        ${featuredLabel}
        <div class="project-header">
          <div class="project-icon-wrap"><i class="${p.icon}"></i></div>
          <div class="project-links">${linksHtml}</div>
        </div>
        <h3 class="project-title">${p.title}</h3>
        ${subtitleHtml}
        <p class="project-desc">${p.desc}</p>
        <div class="project-tech">
          ${p.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
        ${metricsHtml}
      </div>`;
  }).join('');

  // Re-attach filter logic
  initProjectFilter();
}

/* ========== PROJECT FILTER (works on dynamically rendered cards) ========== */
function initProjectFilter() {
  const filtersEl = document.getElementById('projectFilters');
  if (!filtersEl) return;

  filtersEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    const cards  = document.querySelectorAll('#projectsGrid .project-card');

    cards.forEach(card => {
      const cat  = card.getAttribute('data-category') || '';
      const show = filter === 'all' || cat.includes(filter);
      card.classList.toggle('hidden', !show);
      if (show) card.style.animation = 'fadeIn 0.4s ease';
    });

    // Fix featured card column span responsively
    const featured = document.querySelector('#projectsGrid .project-card.featured');
    if (featured && !featured.classList.contains('hidden')) {
      if (window.innerWidth <= 768)       featured.style.gridColumn = 'span 1';
      else if (window.innerWidth <= 1024) featured.style.gridColumn = 'span 2';
      else                                featured.style.gridColumn = 'span 3';
    }
  });
}

/* ========== CONTACT FORM ========== */
function initContactForm() {
  const form   = document.getElementById('contactForm');
  const notice = document.getElementById('formNotice');
  const btn    = document.getElementById('submitBtn');
  const originalBtnHTML = btn.innerHTML;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // ── Client-side validation ─────────────────────────────────────────────
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showNotice(notice, '\u26a0\ufe0f Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNotice(notice, '\u26a0\ufe0f Please enter a valid email address.', 'error');
      return;
    }

    // ── Loading state ──────────────────────────────────────────────────────
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled  = true;

    try {
      const response = await fetch('https://formspree.io/f/mreradzl', {
        method  : 'POST',
        body    : new FormData(form),
        headers : { 'Accept': 'application/json' },
      });

      if (response.ok) {
        showNotice(notice, '\u2705 Message sent! I\'ll get back to you within 24\u201348 hours.', 'success');
        form.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        const errMsg = (data.errors && data.errors.map(err => err.message).join(', ')) ||
                       'Something went wrong. Please try again or email me directly.';
        showNotice(notice, `\u26a0\ufe0f ${errMsg}`, 'error');
      }
    } catch (_) {
      showNotice(notice, '\u26a0\ufe0f Network error. Please check your connection and try again.', 'error');
    } finally {
      btn.innerHTML = originalBtnHTML;
      btn.disabled  = false;
      setTimeout(() => { notice.textContent = ''; notice.className = 'form-notice'; }, 8000);
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotice(el, msg, type) {
  el.textContent = msg;
  el.className = `form-notice ${type}`;
}

/* ========== BACK TO TOP ========== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ========== ACTIVE NAV LINK ========== */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
}

/* ========== TIMELINE REVEAL (special handling) ========== */
document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

  timelineItems.forEach(item => observer.observe(item));
});

/* ========== SMOOTH SCROLL FOR ANCHOR LINKS ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ========== PARALLAX ORBS (subtle) ========== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (orb1) orb1.style.transform = `translateY(${scrollY * 0.08}px)`;
  if (orb2) orb2.style.transform = `translateY(${-scrollY * 0.05}px)`;
}, { passive: true });

/* ========== CSS FADE-IN ANIMATION KEYFRAME (injected) ========== */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

/* ============================================================
   HERO CANVAS — ANIME.JS NEURAL NETWORK BACKGROUND
   Theme: ML / AI neural graph with gold nodes, glowing edges,
   floating data particles, and pulsing activation waves.
   ============================================================ */
function initHeroCanvas() {
  const canvas  = document.getElementById('heroCanvas');
  if (!canvas || typeof anime === 'undefined') return;
  const ctx     = canvas.getContext('2d');
  const hero    = canvas.closest('.hero');

  /* ── Resize handling ─────────────────────────────── */
  function resize() {
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); buildGraph(); }, { passive: true });

  /* ── Theme-aware colours ─────────────────────────── */
  function getColors() {
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    return {
      nodeFill   : dark ? 'rgba(212,162,78,0.9)'   : 'rgba(184,135,46,0.85)',
      nodeGlow   : dark ? 'rgba(212,162,78,0.25)'  : 'rgba(184,135,46,0.18)',
      edgeLine   : dark ? 'rgba(212,162,78,0.12)'  : 'rgba(184,135,46,0.10)',
      edgePulse  : dark ? 'rgba(212,162,78,0.55)'  : 'rgba(184,135,46,0.50)',
      particle   : dark ? 'rgba(232,191,122,0.95)' : 'rgba(140,100,20,0.85)',
      hubFill    : dark ? 'rgba(212,162,78,1)'     : 'rgba(160,110,20,1)',
      hubGlow    : dark ? 'rgba(212,162,78,0.40)'  : 'rgba(184,135,46,0.30)',
      layerLabel : dark ? 'rgba(212,162,78,0.30)'  : 'rgba(184,135,46,0.22)',
    };
  }

  /* ── Graph configuration ─────────────────────────── */
  // Neural network layers: Input → Hidden 1 → Hidden 2 → Output
  const LAYER_DEFS = [4, 6, 6, 3]; // nodes per layer
  const LAYER_LABELS = ['Input\nLayer', 'Hidden\nLayer 1', 'Hidden\nLayer 2', 'Output\nLayer'];

  let nodes = [];      // { x, y, r, layer, idx, pulseScale, pulseAlpha, glowR }
  let edges = [];      // { from, to, alpha, pulseT, active }
  let particles = [];  // { edge, t, speed, alpha, size }
  let animFrameId;

  /* ── Build graph layout ──────────────────────────── */
  function buildGraph() {
    nodes = [];
    edges = [];
    particles = [];

    const W = canvas.width;
    const H = canvas.height;
    const marginX = W * 0.12;
    const layerCount = LAYER_DEFS.length;
    const layerGapX  = (W - marginX * 2) / (layerCount - 1);

    // Create nodes
    LAYER_DEFS.forEach((count, layerIdx) => {
      const x = marginX + layerIdx * layerGapX;
      const spreadY = H * 0.55;
      const startY  = H * 0.5 - spreadY / 2;
      const gapY    = count > 1 ? spreadY / (count - 1) : 0;

      for (let i = 0; i < count; i++) {
        const y = count === 1 ? H / 2 : startY + i * gapY;
        const isHub = (layerIdx === 0 || layerIdx === layerCount - 1);
        nodes.push({
          x, y,
          r          : isHub ? 7 : 5,
          layer      : layerIdx,
          idx        : i,
          pulseScale : 1,
          pulseAlpha : 0,
          glowR      : isHub ? 18 : 12,
          isHub,
        });
      }
    });

    // Create fully-connected edges between adjacent layers
    let nodeStart = 0;
    for (let l = 0; l < LAYER_DEFS.length - 1; l++) {
      const countA = LAYER_DEFS[l];
      const countB = LAYER_DEFS[l + 1];
      for (let a = 0; a < countA; a++) {
        for (let b = 0; b < countB; b++) {
          edges.push({
            from      : nodeStart + a,
            to        : nodeStart + countA + b,
            alpha     : 0.12 + Math.random() * 0.10,
            pulseT    : Math.random(),
            active    : false,
            baseAlpha : 0.08 + Math.random() * 0.08,
          });
        }
      }
      nodeStart += countA;
    }

    // Seed initial particles
    for (let i = 0; i < 18; i++) {
      spawnParticle();
    }
  }

  /* ── Spawn a data-flow particle ──────────────────── */
  function spawnParticle() {
    const edge = edges[Math.floor(Math.random() * edges.length)];
    particles.push({
      edge,
      t     : Math.random(),
      speed : 0.0015 + Math.random() * 0.0025,
      alpha : 0,
      size  : 2.5 + Math.random() * 2,
      fade  : 'in',
    });
  }

  /* ── Anime.js: node pulse waves ──────────────────── */
  function animatePulseWave() {
    // Pick a random input node and fire an activation wave
    const inputNodes = nodes.filter(n => n.layer === 0);
    const src = inputNodes[Math.floor(Math.random() * inputNodes.length)];

    // Animate concentric ring expansion from src
    const ring = { r: src.r, alpha: 0.7 };
    anime({
      targets  : ring,
      r        : src.glowR * 3.5,
      alpha    : 0,
      duration : 1100,
      easing   : 'easeOutCubic',
      update   : () => {
        // ring drawn in main draw loop via `rings` array
      },
    });
    rings.push(ring);

    // Propagate pulse through layers with delay
    let layerDelay = 0;
    for (let l = 1; l < LAYER_DEFS.length; l++) {
      layerDelay += 260;
      const layerNodes = nodes.filter(n => n.layer === l);
      layerNodes.forEach((node, ni) => {
        anime({
          targets  : node,
          pulseScale: [1, 1.85, 1],
          pulseAlpha: [0, 0.9, 0],
          duration : 600,
          delay    : layerDelay + ni * 40,
          easing   : 'easeInOutSine',
        });
      });
    }
  }

  const rings = []; // active pulse rings

  /* ── Anime.js: edge shimmer loop ─────────────────── */
  function animateEdgeShimmer() {
    // Randomly brighten batches of edges
    const batch = edges.filter(() => Math.random() < 0.15);
    batch.forEach(edge => {
      anime({
        targets  : edge,
        alpha    : [edge.baseAlpha, 0.55, edge.baseAlpha],
        duration : 900 + Math.random() * 600,
        easing   : 'easeInOutSine',
        delay    : Math.random() * 400,
      });
    });
  }

  /* ── Anime.js: floating node drift ───────────────── */
  // Each node drifts slightly in Y to feel alive
  function startNodeDrift() {
    nodes.forEach((node, i) => {
      const baseY = node.y;
      const drift = 5 + Math.random() * 8;
      anime({
        targets  : node,
        y        : [baseY - drift, baseY + drift],
        duration : 2800 + i * 120,
        direction: 'alternate',
        loop     : true,
        easing   : 'easeInOutSine',
        delay    : i * 80,
      });
    });
  }

  /* ── Anime.js: canvas entrance fade-in ───────────── */
  function entranceFade() {
    const obj = { opacity: 0 };
    anime({
      targets  : obj,
      opacity  : 1,
      duration : 1800,
      easing   : 'easeOutQuad',
      update   : () => { canvas.style.opacity = obj.opacity * 0.85; },
    });
  }

  /* ── Draw loop ───────────────────────────────────── */
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const C = getColors();

    // 1. Draw edges
    edges.forEach(edge => {
      const A = nodes[edge.from];
      const B = nodes[edge.to];
      if (!A || !B) return;
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.strokeStyle = C.edgeLine.replace(/[\d.]+\)$/, `${edge.alpha})`);
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // 2. Draw particles travelling along edges
    particles.forEach(p => {
      const A = nodes[p.edge.from];
      const B = nodes[p.edge.to];
      if (!A || !B) return;
      const px = A.x + (B.x - A.x) * p.t;
      const py = A.y + (B.y - A.y) * p.t;

      // Fade in/out at edges of journey
      if (p.t < 0.12)       p.alpha = p.t / 0.12;
      else if (p.t > 0.88)  p.alpha = (1 - p.t) / 0.12;
      else                   p.alpha = 1;

      // Glow
      const grd = ctx.createRadialGradient(px, py, 0, px, py, p.size * 2.5);
      grd.addColorStop(0, C.particle.replace(/[\d.]+\)$/, `${p.alpha * 0.95})`));
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(px, py, p.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(px, py, p.size * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = C.particle.replace(/[\d.]+\)$/, `${p.alpha})`);
      ctx.fill();

      // Advance
      p.t += p.speed;
      if (p.t > 1) {
        p.t     = 0;
        p.edge  = edges[Math.floor(Math.random() * edges.length)];
        p.speed = 0.0015 + Math.random() * 0.0025;
      }
    });

    // 3. Draw nodes
    nodes.forEach(node => {
      // Outer glow
      const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.glowR);
      grd.addColorStop(0, C.nodeGlow);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.glowR, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Pulse ring (anime-driven)
      if (node.pulseAlpha > 0.01) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * node.pulseScale, 0, Math.PI * 2);
        ctx.strokeStyle = C.nodeFill.replace(/[\d.]+\)$/, `${node.pulseAlpha})`);
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      const fill = node.isHub ? C.hubFill : C.nodeFill;
      ctx.fillStyle = fill;
      ctx.fill();

      // Inner highlight
      ctx.beginPath();
      ctx.arc(node.x - node.r * 0.28, node.y - node.r * 0.28, node.r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fill();
    });

    // 4. Draw pulse rings
    for (let i = rings.length - 1; i >= 0; i--) {
      const ring = rings[i];
      if (ring.alpha <= 0.01) { rings.splice(i, 1); continue; }
      // Find the source node (layer 0, first node as approximate center)
      const src = nodes.find(n => n.layer === 0) || nodes[0];
      ctx.beginPath();
      ctx.arc(src.x, src.y, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(212,162,78,${ring.alpha})`;
      ctx.lineWidth   = 1.5;
      ctx.stroke();
    }

    // 5. Layer labels
    LAYER_LABELS.forEach((label, li) => {
      const layerNodes = nodes.filter(n => n.layer === li);
      if (!layerNodes.length) return;
      const x = layerNodes[0].x;
      const topY = Math.min(...layerNodes.map(n => n.y)) - 28;
      ctx.save();
      ctx.font = '600 10px DM Sans, sans-serif';
      ctx.fillStyle = C.layerLabel;
      ctx.textAlign = 'center';
      label.split('\n').forEach((line, lineIdx) => {
        ctx.fillText(line, x, topY + lineIdx * 13);
      });
      ctx.restore();
    });

    animFrameId = requestAnimationFrame(draw);
  }

  /* ── Recurring anime.js timers ───────────────────── */
  function scheduleAnimations() {
    // Pulse wave every 2.4s
    animatePulseWave();
    setInterval(animatePulseWave, 2400);

    // Edge shimmer every 0.9s
    animateEdgeShimmer();
    setInterval(animateEdgeShimmer, 900);

    // Maintain particle count
    setInterval(() => {
      const target = 22;
      while (particles.length < target) spawnParticle();
    }, 350);
  }

  /* ── Re-adapt on theme toggle ────────────────────── */
  document.getElementById('themeToggle').addEventListener('click', () => {
    // Colors are read live each frame; nothing to restart
  });

  /* ── Init ────────────────────────────────────────── */
  buildGraph();
  canvas.style.opacity = '0';
  entranceFade();
  startNodeDrift();
  scheduleAnimations();
  draw();
}
