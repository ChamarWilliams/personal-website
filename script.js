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

// Smooth scroll for navigation links (skip #all-projects which is JS-only)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#all-projects') return; // handled separately

        e.preventDefault();
        const target = document.querySelector(href);
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
        const href = link.getAttribute('href');
        if (href.startsWith('#') && href.slice(1) === current) {
            link.style.color = 'var(--color-accent)';
        }
    });
});

// Article modal logic
const articleModal = document.getElementById('articleModal');
const articleModalClose = document.getElementById('articleModalClose');
const articleCards = document.querySelectorAll('.blog-card');

const articleModalDate = document.getElementById('articleModalDate');
const articleModalTag = document.getElementById('articleModalTag');
const articleModalTitle = document.getElementById('articleModalTitle');
const articleModalBody = document.getElementById('articleModalBody');
const articleModalImage = document.getElementById('articleModalImage');

function openArticleModal(card) {
    if (!articleModal) return;

    articleModalDate.textContent = card.dataset.articleDate || '';
    articleModalTag.textContent = card.dataset.articleTag || '';
    articleModalTitle.textContent = card.dataset.articleTitle || '';

    const bodyText = card.dataset.articleBody || '';
    articleModalBody.innerHTML = bodyText
        .split('\n\n')
        .map(p => `<p>${p}</p>`)
        .join('');

    const imgSrc = card.dataset.articleImage;
    if (imgSrc) {
        articleModalImage.src = imgSrc;
        articleModalImage.style.display = 'block';
    } else {
        articleModalImage.style.display = 'none';
        articleModalImage.removeAttribute('src');
    }

    articleModal.classList.add('open');
}

function closeArticleModal() {
    if (!articleModal) return;
    articleModal.classList.remove('open');
}

articleCards.forEach(card => {
    card.addEventListener('click', () => openArticleModal(card));
});

if (articleModalClose) {
    articleModalClose.addEventListener('click', closeArticleModal);
}

if (articleModal) {
    articleModal.addEventListener('click', (e) => {
        if (e.target === articleModal) {
            closeArticleModal();
        }
    });
}

// All Projects modal
const allProjectsModal = document.getElementById('allProjectsModal');
const allProjectsModalClose = document.getElementById('allProjectsModalClose');

function openAllProjectsModal() {
    if (!allProjectsModal) return;
    allProjectsModal.classList.add('open');
}

function closeAllProjectsModal() {
    if (!allProjectsModal) return;
    allProjectsModal.classList.remove('open');
}

// Open All Projects when clicking nav "Projects"
document.querySelectorAll('.nav-links a[href="#all-projects"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openAllProjectsModal();
        nav.classList.remove('open');
        navOverlay.classList.remove('open');
    });
});

if (allProjectsModalClose) {
    allProjectsModalClose.addEventListener('click', closeAllProjectsModal);
}

if (allProjectsModal) {
    allProjectsModal.addEventListener('click', (e) => {
        if (e.target === allProjectsModal) {
            closeAllProjectsModal();
        }
    });
}

// Project modal logic (single project detail)
const projectModal = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');
let projectCards = document.querySelectorAll('.project-card');

const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalSummary = document.getElementById('projectModalSummary');
const projectModalVideoWrapper = document.getElementById('projectModalVideoWrapper');
const projectModalBody = document.getElementById('projectModalBody');

function openProjectModal(card) {
    if (!projectModal) return;

    const title = card.dataset.projectTitle || '';
    const summary = card.dataset.projectSummary || '';
    const video = card.dataset.projectVideo || '';
    const bodyText = card.dataset.projectBody || '';

    projectModalTitle.textContent = title;
    projectModalSummary.textContent = summary;

    // Reset video wrapper
    projectModalVideoWrapper.innerHTML = '';
    if (video) {
        const iframe = document.createElement('iframe');
        iframe.src = video;
        iframe.title = title || 'Project video';
        iframe.allow =
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        projectModalVideoWrapper.appendChild(iframe);
    }

    projectModalBody.innerHTML = bodyText
        .split('\n\n')
        .map(p => `<p>${p}</p>`)
        .join('');

    // Close All Projects modal if it is open, so the project detail is visible
    closeAllProjectsModal();

    projectModal.classList.add('open');
}

function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');

    // Stop video by clearing iframe
    if (projectModalVideoWrapper) {
        projectModalVideoWrapper.innerHTML = '';
    }
}

// Initial binding for any .project-card already in DOM
projectCards.forEach(card => {
    card.addEventListener('click', () => openProjectModal(card));
});

if (projectModalClose) {
    projectModalClose.addEventListener('click', closeProjectModal);
}

if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
}

// Build Featured Projects from All Projects (data-featured="true")
const allProjectsGrid = document.querySelector('.all-projects-grid');
const featuredProjectsGrid = document.querySelector('.featured-projects-grid');

if (allProjectsGrid && featuredProjectsGrid) {
    const allProjectCards = Array.from(allProjectsGrid.querySelectorAll('.project-card'));
    const featuredCards = allProjectCards.filter(card => card.dataset.featured === 'true');

    // Clear featured container (should be empty already)
    featuredProjectsGrid.innerHTML = '';

    featuredCards.forEach(card => {
        const clone = card.cloneNode(true);
        featuredProjectsGrid.appendChild(clone);
    });

    // If more than 3 featured, enable horizontal scroll
    if (featuredCards.length > 3) {
        featuredProjectsGrid.classList.add('horizontal-scroll');
    }

    // Re-bind project click handlers including new clones
    projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => openProjectModal(card));
    });
}

// Close modals on Esc
document.addEventListener('keydown', (e) => {
    if
