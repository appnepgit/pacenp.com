/**
 * PACE Consultant (P). Ltd. — Main JavaScript
 * Navbar scroll, mobile menu, scroll-spy, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initNavbar();
  initLegacyMobileMenu();
  initSmoothScroll();
  initContactForm();
  initProjectFilter();
  initStatsCounter();
  initTestimonialsCarousel();
  initFooter();
  initBackToTop();
  initCookieNotice();
});

/* Fade out loading screen after full page load */
window.addEventListener('load', initPageLoader);

/* ============================================
   AOS — Animate On Scroll
   ============================================ */

function initAOS() {
  if (typeof AOS === 'undefined') return;

  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
  });
}

/* ============================================
   Sticky Navbar
   ============================================ */

/**
 * Initializes the homepage sticky navbar:
 * - Scroll shadow / height reduction
 * - Mobile menu toggle
 * - Active link highlighting via Intersection Observer
 * - Smooth scroll to sections
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');

  if (!navbar || !toggle || !menu) return;

  const navLinks = menu.querySelectorAll('.navbar__link[data-section]');
  const ctaLink = menu.querySelector('.navbar__cta');
  const scrollLinks = menu.querySelectorAll('a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  const SCROLL_THRESHOLD = 80;

  /* --- Scroll effect: add .scrolled after 80px --- */
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* --- Mobile menu toggle --- */
  const openMenu = () => {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  };

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  /* --- Close menu on outside click --- */
  document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target)) {
      closeMenu();
    }
  });

  /* --- Close menu when a nav link is clicked --- */
  scrollLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  /* --- Smooth scroll to section with navbar offset --- */
  scrollLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      const navbarHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* --- Active link highlighting (Intersection Observer) --- */
  if (sections.length && navLinks.length) {
    const setActiveLink = (sectionId) => {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.dataset.section === sectionId);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        /* Pick the most visible intersecting section for active link */
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveLink(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    /* Highlight Home when at top of page */
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY < SCROLL_THRESHOLD) {
          setActiveLink('home');
        }
      },
      { passive: true }
    );
  }

  /* Prevent CTA from receiving active underline styles */
  if (ctaLink) {
    ctaLink.addEventListener('click', closeMenu);
  }
}

/* ============================================
   Legacy mobile menu (other pages)
   ============================================ */

function initLegacyMobileMenu() {
  const menuToggle = document.querySelector('.site-header .menu-toggle');
  const siteNav = document.querySelector('.site-header .site-nav');

  if (!menuToggle || !siteNav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

/* ============================================
   Smooth scroll (non-navbar anchor links)
   ============================================ */

function initSmoothScroll() {
  const navbar = document.getElementById('navbar');
  const isHome = document.body.dataset.page === 'home';

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    /* Navbar anchor links are handled in initNavbar on the home page */
    if (isHome && link.closest('#navbar-menu')) return;

    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      const offset = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================
   Contact form validation
   ============================================ */

/** Standard email format check */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates Nepal phone numbers.
 * Accepts: +977-98XXXXXXXX, +977 1-XXXXXXX, 9800000000, 01-4XXXXXX, etc.
 * @param {string} phone
 * @returns {boolean}
 */
function isValidNepalPhone(phone) {
  const cleaned = phone.replace(/[\s-]/g, '');
  return /^(\+?977)?(9[78]\d{8}|0?1\d{7,8})$/.test(cleaned);
}

/**
 * Initializes contact form handling.
 * Supports the full homepage form (with subject/phone) and the legacy contact page form.
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const isEnhancedForm = Boolean(form.querySelector('[name="subject"]'));
  const successAlert = document.getElementById('contact-success');
  const errorAlert = document.getElementById('contact-error');
  const legacyMessage = document.getElementById('form-message');

  if (isEnhancedForm) {
    initEnhancedContactForm(form, successAlert, errorAlert);
  } else if (legacyMessage) {
    initLegacyContactForm(form, legacyMessage);
  }
}

/**
 * Homepage contact form — full validation with inline errors.
 * @param {HTMLFormElement} form
 * @param {HTMLElement|null} successAlert
 * @param {HTMLElement|null} errorAlert
 */
function initEnhancedContactForm(form, successAlert, errorAlert) {
  const fields = {
    name: {
      el: form.querySelector('[name="name"]'),
      validate: (v) => {
        if (!v) return 'Full name is required.';
        if (v.length < 3) return 'Name must be at least 3 characters.';
        return '';
      },
    },
    email: {
      el: form.querySelector('[name="email"]'),
      validate: (v) => {
        if (!v) return 'Email address is required.';
        if (!EMAIL_PATTERN.test(v)) return 'Please enter a valid email address.';
        return '';
      },
    },
    phone: {
      el: form.querySelector('[name="phone"]'),
      validate: (v) => {
        if (!v) return 'Phone number is required.';
        if (!isValidNepalPhone(v)) return 'Please enter a valid Nepal phone number (e.g. +977-98XXXXXXXX).';
        return '';
      },
    },
    subject: {
      el: form.querySelector('[name="subject"]'),
      validate: (v) => {
        if (!v) return 'Please select a subject.';
        return '';
      },
    },
    message: {
      el: form.querySelector('[name="message"]'),
      validate: (v) => {
        if (!v) return 'Message is required.';
        if (v.length < 20) return 'Message must be at least 20 characters.';
        return '';
      },
    },
  };

  /** Clear error state for a single field */
  const clearFieldError = (fieldEl) => {
    const wrap = fieldEl?.closest('.contact-field');
    if (!wrap) return;
    wrap.classList.remove('is-invalid');
    const err = wrap.querySelector('.contact-field__error');
    if (err) err.textContent = '';
  };

  /** Show inline error for a single field */
  const setFieldError = (fieldEl, message) => {
    const wrap = fieldEl?.closest('.contact-field');
    if (!wrap) return;
    wrap.classList.add('is-invalid');
    const err = wrap.querySelector('.contact-field__error');
    if (err) err.textContent = message;
  };

  /** Clear all field errors and hide alerts */
  const resetErrors = () => {
    Object.values(fields).forEach(({ el }) => clearFieldError(el));
    if (errorAlert) errorAlert.hidden = true;
    if (successAlert) successAlert.hidden = true;
  };

  /** Validate all fields; returns true if valid */
  const validateForm = () => {
    let isValid = true;

    Object.values(fields).forEach(({ el, validate }) => {
      if (!el) return;
      const value = el.value.trim();
      const error = validate(value);

      if (error) {
        setFieldError(el, error);
        isValid = false;
      } else {
        clearFieldError(el);
      }
    });

    return isValid;
  };

  /* Clear errors as user types */
  Object.values(fields).forEach(({ el }) => {
    el?.addEventListener('input', () => clearFieldError(el));
    el?.addEventListener('change', () => clearFieldError(el));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    resetErrors();

    if (!validateForm()) {
      if (errorAlert) errorAlert.hidden = false;
      return;
    }

    /*
     * Optional EmailJS integration skeleton:
     *
     * emailjs.init('YOUR_PUBLIC_KEY');
     * emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
     *   .then(() => { ... show success ... })
     *   .catch(() => { ... show error ... });
     */

    /* Simulate successful submission */
    form.reset();

    if (successAlert) {
      successAlert.hidden = false;
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

/**
 * Legacy contact page form — basic validation (contact.html).
 * @param {HTMLFormElement} form
 * @param {HTMLElement} formMessage
 */
function initLegacyContactForm(form, formMessage) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = 'Please complete your name, email, and project details.';
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      return;
    }

    formMessage.textContent = 'Thank you for your inquiry. We will be in touch shortly.';
    form.reset();
  });
}

/* ============================================
   Portfolio / Projects filter
   ============================================ */

/**
 * Filterable project grid — toggles cards by data-category
 * with smooth fade transitions and active button state.
 */
function initProjectFilter() {
  const filterBar = document.querySelector('.portfolio-filters');
  const filters = document.querySelectorAll('.portfolio-filter');
  const cards = document.querySelectorAll('.portfolio-card');

  if (!filterBar || !filters.length || !cards.length) return;

  const FADE_MS = 400;

  /**
   * Show or hide a card with fade transition.
   * @param {HTMLElement} card
   * @param {boolean} show
   */
  const toggleCard = (card, show) => {
    if (show) {
      card.style.display = '';
      /* Force reflow before removing hidden class for fade-in */
      void card.offsetWidth;
      card.classList.remove('is-filtered-out');
    } else {
      card.classList.add('is-filtered-out');
      setTimeout(() => {
        if (card.classList.contains('is-filtered-out')) {
          card.style.display = 'none';
        }
      }, FADE_MS);
    }
  };

  /**
   * Apply category filter and update active button.
   * @param {string} category
   * @param {HTMLButtonElement} activeBtn
   */
  const applyFilter = (category, activeBtn) => {
    filters.forEach((btn) => {
      const isActive = btn === activeBtn;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    cards.forEach((card) => {
      const match = category === 'all' || card.dataset.category === category;
      toggleCard(card, match);
    });
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyFilter(btn.dataset.filter, btn);
    });
  });
}

/* ============================================
   Statistics Counter — animated numbers
   ============================================ */

/** Duration of each count-up animation in milliseconds */
const COUNTER_DURATION_MS = 2000;

/**
 * Ease-out cubic — fast start, gradual slowdown toward the target.
 * @param {number} t — progress from 0 to 1
 * @returns {number}
 */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animates a numeric element from 0 to a target value.
 * Uses requestAnimationFrame for smooth, frame-synced updates.
 *
 * @param {HTMLElement} element — element whose textContent is updated
 * @param {number} target — final number to count up to
 * @param {number} duration — animation length in ms
 * @param {() => void} [onComplete] — callback when counting finishes
 */
function animateCounter(element, target, duration, onComplete) {
  const suffix = element.parentElement?.querySelector('.stats-counter__suffix');
  const startTime = performance.now();

  /**
   * Single animation frame — computes eased progress and updates display.
   * @param {number} currentTime — timestamp from requestAnimationFrame
   */
  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const currentValue = Math.round(easedProgress * target);

    element.textContent = String(currentValue);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = String(target);
      if (suffix) suffix.classList.add('is-visible');
      if (onComplete) onComplete();
    }
  };

  requestAnimationFrame(step);
}

/**
 * Watches the stats section and triggers counter animations once
 * when it enters the viewport (Intersection Observer).
 */
function initStatsCounter() {
  const section = document.querySelector('.stats-counter');
  if (!section) return;

  const numbers = section.querySelectorAll('.stats-counter__number[data-target]');
  if (!numbers.length) return;

  let hasAnimated = false;

  const startCounters = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    numbers.forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      if (Number.isNaN(target)) return;
      animateCounter(el, target, COUNTER_DURATION_MS);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounters();
          observer.unobserve(section);
        }
      });
    },
    {
      threshold: 0.25,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  observer.observe(section);
}

/* ============================================
   Testimonials Carousel
   ============================================ */

/** Auto-advance interval in milliseconds */
const TESTIMONIAL_AUTO_MS = 5000;

/** Minimum horizontal swipe distance (px) to trigger slide change */
const TESTIMONIAL_SWIPE_THRESHOLD = 50;

/**
 * Initializes the testimonials carousel with fade transitions,
 * auto-play, dot/arrow navigation, keyboard, and touch swipe.
 */
function initTestimonialsCarousel() {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.testimonial-slide');
  const dots = carousel.querySelectorAll('.testimonials-dot');
  const prevBtn = carousel.querySelector('.testimonials-arrow--prev');
  const nextBtn = carousel.querySelector('.testimonials-arrow--next');
  const viewport = carousel.querySelector('.testimonials-viewport');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoTimer = null;
  let touchStartX = 0;
  let touchEndX = 0;

  /**
   * Navigate to a slide by index (wraps around).
   * @param {number} index
   */
  const goToSlide = (index) => {
    const total = slides.length;
    currentIndex = ((index % total) + total) % total;

    slides.forEach((slide, i) => {
      const isActive = i === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    dots.forEach((dot, i) => {
      const isActive = i === currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  };

  /** Advance to next slide */
  const nextSlide = () => goToSlide(currentIndex + 1);

  /** Go to previous slide */
  const prevSlide = () => goToSlide(currentIndex - 1);

  /**
   * Starts (or restarts) the auto-advance timer.
   * Called after every manual navigation to reset the 5s countdown.
   */
  const startAutoPlay = () => {
    stopAutoPlay();
    autoTimer = window.setInterval(nextSlide, TESTIMONIAL_AUTO_MS);
  };

  /** Clears the auto-advance interval */
  const stopAutoPlay = () => {
    if (autoTimer !== null) {
      window.clearInterval(autoTimer);
      autoTimer = null;
    }
  };

  /**
   * Manual navigation — updates slide and resets auto-play timer.
   * @param {number} index
   */
  const navigateTo = (index) => {
    goToSlide(index);
    startAutoPlay();
  };

  /* --- Arrow buttons --- */
  prevBtn?.addEventListener('click', () => navigateTo(currentIndex - 1));
  nextBtn?.addEventListener('click', () => navigateTo(currentIndex + 1));

  /* --- Dot indicators --- */
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = parseInt(dot.dataset.slideTo, 10);
      if (!Number.isNaN(target)) navigateTo(target);
    });
  });

  /* --- Keyboard support (left / right arrows) --- */
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      navigateTo(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      navigateTo(currentIndex + 1);
    }
  });

  /* Make carousel focusable for keyboard users */
  carousel.setAttribute('tabindex', '0');

  /* --- Touch / swipe support --- */
  viewport?.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  viewport?.addEventListener(
    'touchend',
    (event) => {
      touchEndX = event.changedTouches[0].screenX;
      const deltaX = touchEndX - touchStartX;

      if (Math.abs(deltaX) < TESTIMONIAL_SWIPE_THRESHOLD) return;

      if (deltaX < 0) {
        navigateTo(currentIndex + 1);
      } else {
        navigateTo(currentIndex - 1);
      }
    },
    { passive: true }
  );

  /* Pause auto-play when user hovers (desktop) */
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  /* Pause when tab is hidden, resume when visible */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  /* Initial state + start auto-play */
  goToSlide(0);
  startAutoPlay();
}

/* ============================================
   Footer — newsletter & copyright year
   ============================================ */

/**
 * Initializes footer utilities: copyright year auto-update
 * and newsletter email validation.
 */
function initFooter() {
  updateCopyrightYear();
  initNewsletterForm();
}

/** Sets the copyright year span to the current calendar year */
function updateCopyrightYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

/**
 * Newsletter signup — validates email and shows feedback message.
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const messageEl = document.getElementById('newsletter-message');

  if (!form || !messageEl) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = form.querySelector('[name="email"]');
    const email = emailInput?.value.trim() ?? '';

    messageEl.hidden = false;
    messageEl.classList.remove('is-success', 'is-error');

    if (!email) {
      messageEl.textContent = 'Please enter your email address.';
      messageEl.classList.add('is-error');
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      messageEl.textContent = 'Please enter a valid email address.';
      messageEl.classList.add('is-error');
      return;
    }

    messageEl.textContent = 'Thank you for subscribing! You will receive our latest updates.';
    messageEl.classList.add('is-success');
    form.reset();
  });
}

/* ============================================
   Back to Top button
   ============================================ */

/** Scroll distance (px) before showing the back-to-top button */
const BACK_TO_TOP_THRESHOLD = 300;

/**
 * Shows/hides back-to-top button based on scroll position;
 * smooth scrolls to top on click.
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const toggleVisibility = () => {
    const show = window.scrollY > BACK_TO_TOP_THRESHOLD;
    btn.hidden = !show;
    btn.classList.toggle('is-visible', show);
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility, { passive: true });
}

/* ============================================
   Page loader — fade out on window load
   ============================================ */

/**
 * Hides the full-page loader overlay after all assets load,
 * then removes it from the DOM after the fade transition.
 */
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  loader.classList.add('is-hidden');
  loader.setAttribute('aria-hidden', 'true');

  loader.addEventListener(
    'transitionend',
    () => {
      loader.remove();
    },
    { once: true }
  );
}

/* ============================================
   Cookie consent banner
   ============================================ */

const COOKIE_CONSENT_KEY = 'pace_cookie_accepted';

/**
 * Shows cookie banner unless already accepted; saves preference to localStorage.
 */
function initCookieNotice() {
  const notice = document.getElementById('cookie-notice');
  const acceptBtn = document.getElementById('cookie-accept');

  if (!notice || !acceptBtn) return;

  try {
    if (localStorage.getItem(COOKIE_CONSENT_KEY) === 'true') {
      notice.remove();
      return;
    }
  } catch {
    /* localStorage unavailable (private browsing) — show banner */
  }

  notice.hidden = false;

  acceptBtn.addEventListener('click', () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    } catch {
      /* ignore storage errors */
    }
    notice.classList.add('is-dismissed');
    notice.addEventListener(
      'transitionend',
      () => notice.remove(),
      { once: true }
    );
  });
}
