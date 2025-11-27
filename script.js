// Nav toggle functionality
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const navOverlay = document.getElementById('navOverlay');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navOverlay.classList.toggle('open');
});

navOverlay.addEventListener('click', () => {
    nav.classList.remove('open');
    navOverlay.classList.remove('open');
});

// Close nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        navOverlay.classList.remove('open');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.project-card, .blog-card, .skill-item').forEach(el => {
    observer.observe(el);
});

// Active nav link highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--color-accent)';
        }
    });
});

(function () {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    let isScrolling = false;

    function getCurrentSectionIndex() {
        const scrollPos = window.scrollY;
        let closestIndex = 0;
        let closestDist = Infinity;

        sections.forEach((sec, index) => {
            const rect = sec.getBoundingClientRect();
            const offsetTop = rect.top + window.scrollY;
            const dist = Math.abs(offsetTop - scrollPos);
            if (dist < closestDist) {
                closestDist = dist;
                closestIndex = index;
            }
        });
        return closestIndex;
    }

    window.addEventListener('wheel', (e) => {
        // Only trigger for main vertical scroll, ignore if already animating
        if (isScrolling) return;

        const delta = e.deltaY;
        if (delta === 0) return;

        e.preventDefault();

        const currentIndex = getCurrentSectionIndex();
        let targetIndex = currentIndex + (delta > 0 ? 1 : -1);

        // Clamp to valid range
        if (targetIndex < 0) targetIndex = 0;
        if (targetIndex >= sections.length) targetIndex = sections.length - 1;

        const targetSection = sections[targetIndex];
        if (!targetSection) return;

        isScrolling = true;
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Unlock after animation
        setTimeout(() => {
            isScrolling = false;
        }, 800); // adjust if you change scroll-behavior speed
    }, { passive: false });
})();
