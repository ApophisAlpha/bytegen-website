// ByteGen - main.js
// Mobile navigation and interactive features

(function() {
    'use strict';

    // ==================== //
    // Mobile Navigation    //
    // ==================== //
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile nav when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile nav on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ==================== //
    // Navbar Scroll Effect //
    // ==================== //
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add shadow when scrolled
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ==================== //
    // Smooth Scroll        //
    // ==================== //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== //
    // Form Submission      //
    // ==================== //
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            const formAction = this.getAttribute('action');
            
            // If using Formspree or similar, let it handle normally
            // But show a nicer UX if we can
            if (formAction && formAction.includes('formspree.io')) {
                // Check if it's the placeholder
                if (formAction.includes('YOUR_FORM_ID')) {
                    e.preventDefault();
                    alert('Contact form not yet configured. Please email directly at david@bytegen.net');
                    return;
                }
            }
            
            // Add loading state to button
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Reset after form submits (for non-AJAX submissions)
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // ==================== //
    // Intersection Observer //
    // ==================== //
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    document.querySelectorAll('.service-card, .service-detail-card, .industry-item, .stat-item, .timeline-item, .why-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeInObserver.observe(el);
    });

    // Add visible state styles
    const style = document.createElement('style');
    style.textContent = `
        .service-card.visible,
        .service-detail-card.visible,
        .industry-item.visible,
        .stat-item.visible,
        .timeline-item.visible,
        .why-card.visible,
        .faq-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ==================== //
    // Data Viz Animation   //
    // ==================== //
    // Re-trigger bar animation when hero comes into view
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        const vizBars = heroVisual.querySelectorAll('.viz-bar');
        
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    vizBars.forEach(bar => {
                        bar.style.animation = 'none';
                        bar.offsetHeight; // Trigger reflow
                        bar.style.animation = null;
                    });
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroVisual);
    }

    // ==================== //
    // Console Easter Egg   //
    // ==================== //
    console.log('%c◈ ByteGen', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #6366f1, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%cLooking under the hood? Nice.', 'color: #9898a8;');
    console.log('%cInterested in working together? → david@bytegen.net', 'color: #6366f1;');

})();
