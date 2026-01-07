// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false // Disable on touch devices for native feel
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with delay via GSAP
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Magnetic Buttons Effect
const magnets = document.querySelectorAll('.magnetic-btn, .magnetic-link');

magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', (e) => {
        const rect = magnet.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(magnet, {
            duration: 0.3,
            x: x * 0.3, // Strength of magnet
            y: y * 0.3,
            ease: "power2.out"
        });
        
        // Scale up cursor
        cursorOutline.classList.add('hovered');
    });

    magnet.addEventListener('mouseleave', () => {
        gsap.to(magnet, {
            duration: 0.3,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)"
        });
        cursorOutline.classList.remove('hovered');
    });
});

// HERO ANIMATIONS
const tl = gsap.timeline();

// Staggered Text Reveal
tl.from(".hero-title .word", {
    y: 80,
    opacity: 0,
    duration: 0.6, // Faster
    stagger: 0.05,
    ease: "power4.out"
})
.from(".hero-subtitle", {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out"
}, "-=0.3")
.from(".hero-actions", {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out"
}, "-=0.3")
.from(".image-wrapper", {
    scale: 0.9,
    opacity: 0,
    duration: 1, // Faster
    ease: "power2.out"
}, "-=0.8");

// SCROLL ANIMATIONS

// Generic Reveal Text
const revealElements = document.querySelectorAll('.reveal-text');
revealElements.forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 95%", // Almost immediately visible
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.4, // Very fast
        ease: "power3.out"
    });
});

// Split Text Headers (Simple version without plugin)
const sectionTitles = document.querySelectorAll('.split-text');
sectionTitles.forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 80%"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    });
});

// Cards Stagger
gsap.from(".reveal-card", {
    scrollTrigger: {
        trigger: ".process-steps",
        start: "top 95%"
    },
    y: 30,
    opacity: 0,
    duration: 0.4,
    stagger: 0.05,
    ease: "power3.out"
});

// Project Cards
const projects = document.querySelectorAll('.project-card');
projects.forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 95%"
        },
        y: 30,
        opacity: 0,
        duration: 0.4,
        delay: i * 0.05,
        ease: "power3.out"
    });
});

// Parallax Effect for Hero Image
gsap.to(".image-wrapper img", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 100, // Moves image down slowly
    scale: 1.1
});

// Parallax Effect for Philosophy Section
gsap.to(".philosophy-bg", {
    scrollTrigger: {
        trigger: ".philosophy-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    y: 200, // Move background
    scale: 1.2
});

gsap.to(".philosophy-title", {
    scrollTrigger: {
        trigger: ".philosophy-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
    },
    y: -50 // Move text slightly opposite
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-links a, .mobile-cta');

let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if(isMenuOpen) {
        mobileMenu.classList.add('active');
        // Animate links in
        gsap.fromTo(mobileLinks, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 }
        );
    } else {
        mobileMenu.classList.remove('active');
    }
});

// Close menu when link clicking
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.remove('active');
    });
});
