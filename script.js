/* ============================================
   AITI BIZTEK — Premium Aerospace Website
   script.js
   ============================================
   Features:
   - GSAP Animations & ScrollTrigger
   - Intersection Observer for reveal
   - Counter animations
   - Navbar scroll behavior
   - Mobile menu
   - Custom cursor
   - Particle system
   - Smooth scroll
   - Form handling
   ============================================ */

'use strict';

/* ============================================
   GSAP & ScrollTrigger Registration
   ============================================ */
gsap.registerPlugin(ScrollTrigger);

/* ============================================
   PRELOADER
   ============================================ */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

    // Short delay for dramatic effect
    setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.style.overflow = '';

        // Initialize all animations after preloader
        initHeroAnimations();
        initScrollAnimations();
        initParticles();
        initResearchStars();
    }, 800);
});

// Prevent scroll during preload
document.body.style.overflow = 'hidden';

/* ============================================
   CUSTOM CURSOR
   ============================================ */
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (window.innerWidth > 1024) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth outline follow
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.12;
        outlineY += (mouseY - outlineY) * 0.12;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .tech-card, .solution-card, .product-card, .case-card, .news-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

/* ============================================
   NAVBAR
   ============================================ */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const mobileOverlay = document.getElementById('mobileMenuOverlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');

// Scroll behavior — sticky navbar
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background on scroll
    if (scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 600) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    // Active nav link based on scroll position
    updateActiveNav();
});
const mobileCTA = document.querySelector(".mobile-cta-btn");

if (mobileCTA) {
    mobileCTA.addEventListener("click", () => {

        navToggle.classList.remove("active");
        mobileOverlay.classList.remove("active");
        document.body.style.overflow = "";

    });
}
// Update active navigation link
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Back to top
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   HERO ANIMATIONS (GSAP)
   ============================================ */
function initHeroAnimations() {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Navbar slide down
    heroTl.from('#navbar', {
        y: -100,
        opacity: 0,
        duration: 0.8,
    });

    // Hero badge
    heroTl.from('.hero-badge', {
        y: 30,
        opacity: 0,
        duration: 0.8,
    }, '-=0.3');

    // Hero title
    heroTl.from('.hero-title', {
        y: 40,
        opacity: 0,
        duration: 1,
    }, '-=0.5');

    // Hero description
    heroTl.from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
    }, '-=0.6');

    // Hero buttons — stagger
    // heroTl.from('.hero-buttons .btn', {
    //     y: 30,
    //     opacity: 0,
    //     duration: 0.6,
    //     stagger: 0.15,
    // }, '-=0.5');

    // Hero stats row
    heroTl.from('.hero-stat', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
    }, '-=0.3');

    // Hero visual — scale in
    heroTl.from('#heroVisual', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
    }, '-=1');

    // HUD elements float in
    heroTl.from('.hud-data', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
    }, '-=0.6');

    // Floating elements


    // Scroll indicator
    heroTl.from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 0.6,
    }, '-=0.3');
}

/* ============================================
   SCROLL ANIMATIONS (GSAP ScrollTrigger)
   ============================================ */
function initScrollAnimations() {

    // --- Trusted Section ---
    gsap.from('.trusted-heading', {
        scrollTrigger: {
            trigger: '.trusted-section',
            start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
    });

    // --- About Section ---
    gsap.from('#aboutVisual', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%',
        },
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
    });

    gsap.from('#aboutContent .section-label', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%',
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
    });

    gsap.from('#aboutContent .section-title', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
    });

    gsap.from('#aboutContent .about-text', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 65%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
    });



    // --- Solutions Section ---



    // --- Technology Section ---


    // --- Industries Section ---
    animateSectionHeader('.industries-section');

    // Timeline line draw
    gsap.from('.timeline-line', {
        scrollTrigger: {
            trigger: '#industriesTimeline',
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
        },
        scaleY: 0,
        transformOrigin: 'top center',
    });

    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '#industriesTimeline',
            start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
    });

    // --- Products Section ---


    // --- Research Section ---


    gsap.from('#researchVisual', {
        scrollTrigger: {
            trigger: '.research-section',
            start: 'top 75%',
        },
        x: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power2.out',
    });

    // --- Development Process ---
    animateSectionHeader('.process-section');

    gsap.from('.process-line', {
        scrollTrigger: {
            trigger: '#processTimeline',
            start: 'top 85%',
            end: 'bottom 70%',
            scrub: 1,
        },
        scaleX: 0,
        transformOrigin: 'left center',
    });

    gsap.from('.process-step', {
        scrollTrigger: {
            trigger: '#processTimeline',
            start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
    });

    // --- Why Choose Us ---


    // --- Case Studies ---


    // --- Careers ---



    // --- Contact ---
    gsap.from('#contactInfo', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 75%',
        },
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
    });



    // --- Footer ---
    gsap.from('.footer-col', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
    });

    // --- Parallax decorative shapes ---
    gsap.to('.ds-1', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
        },
        y: -80,
        rotation: 30,
    });

    gsap.to('.ds-2', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
        },
        y: 60,
        rotation: -20,
    });
}

/**
 * Helper: Animate section headers (label, title, subtitle)
 */
function animateSectionHeader(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;

    const header = section.querySelector('.section-header');
    if (!header) return;

    gsap.from(header.children, {
        scrollTrigger: {
            trigger: header,
            start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
    });
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
let counterAnimated = false;

function startCounterAnimation() {
    if (counterAnimated) return;
    counterAnimated = true;

    const counters = document.querySelectorAll('.stat-number[data-target]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

/* ============================================
   PARTICLE SYSTEM (Hero)
   ============================================ */
function initParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('heroParticles');

    if (!container) return;

    container.appendChild(canvas);
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';

    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width ||
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    const particleCount = window.innerWidth > 768 ? 60 : 30;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Connect nearby particles with lines
    function connectParticles() {
        const maxDist = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const opacity = (1 - dist / maxDist) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

/* ============================================
   RESEARCH SECTION — Stars
   ============================================ */
function initResearchStars() {
    const starsContainer = document.getElementById('researchStars');
    if (!starsContainer) return;

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.background = '#fff';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.5 + 0.1;
        star.style.animation = `starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }
}

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetEl = document.querySelector(targetId);

        if (targetEl) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetEl.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        }
    });
});

/* ============================================
   CONTACT FORM HANDLING
   ============================================ */
const contactFormEl = document.getElementById('contactFormEl');

if (contactFormEl) {
    contactFormEl.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Visual feedback
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);

        console.log('Form Data:', data);
    });
}

/* ============================================
   NEWSLETTER FORM
   ============================================ */
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const input = this.querySelector('input');
        const btn = this.querySelector('button');
        const originalIcon = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check"></i>';
        input.value = '';

        setTimeout(() => {
            btn.innerHTML = originalIcon;
        }, 2000);
    });
}

/* ============================================
   MOBILE MENU LINK ANIMATIONS
   ============================================ */
function animateMobileLinks() {
    const links = document.querySelectorAll('.mobile-nav-link');
    links.forEach((link, index) => {
        link.style.transitionDelay = `${0.1 + index * 0.06}s`;
    });
}
animateMobileLinks();

/* ============================================
   INTERSECTION OBSERVER — Lazy Reveal
   ============================================ */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('gs-reveal-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with gs-reveal class
document.querySelectorAll('.gs-reveal').forEach(el => {
    revealObserver.observe(el);
});

/* ============================================
   TILT EFFECT ON SOLUTION CARDS (Desktop)
   ============================================ */
if (window.innerWidth > 1024) {
    const solutionCards = document.querySelectorAll('.solution-card');

    solutionCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

            // Move glow
            const glow = card.querySelector('.solution-card-glow');
            if (glow) {
                glow.style.left = (x - rect.width) + 'px';
                glow.style.top = (y - rect.height) + 'px';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ============================================
   TYPING EFFECT ON HUD VALUES (Optional)
   ============================================ */
function animateHudValues() {
    const hudValues = document.querySelectorAll('.hud-value');

    hudValues.forEach((el, index) => {
        const originalText = el.textContent;
        el.textContent = '';

        setTimeout(() => {
            let charIndex = 0;
            const interval = setInterval(() => {
                el.textContent = originalText.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex >= originalText.length) {
                    clearInterval(interval);
                }
            }, 50);
        }, 2000 + index * 400);
    });
}

// Trigger after hero animation
setTimeout(animateHudValues, 1500);

/* ============================================
   RESIZE HANDLER
   ============================================ */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

/* ============================================
   PERFORMANCE: Reduce animations on low-end
   ============================================ */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(10); // Speed through animations
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        el.style.animation = 'none';
    });
}

console.log('%c🚀 AITI BIZTEK — Engineering the Future of Aerospace Technology',
    'color: #00D9FF; font-size: 16px; font-weight: bold; background: #081221; padding: 10px 20px; border-radius: 8px;');
