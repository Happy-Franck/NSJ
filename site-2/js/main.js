/* ============================================================
   NSJ MULTISERVICE — Site 2 — main.js
   ============================================================ */

// Initialize Lucide Icons
lucide.createIcons();

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
    mobileMenu.classList.add('open');
    menuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeMenu() {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));


// ===== NAVBAR SCROLL =====
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('border-b', 'border-white/10');
        nav.classList.remove('border-white/5');
    } else {
        nav.classList.add('border-white/5');
        nav.classList.remove('border-white/10');
    }
});


// ===== SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => fadeObserver.observe(el));


// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const duration = 2000;
            const start = performance.now();

            function updateCounter(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased);
                if (progress < 1) requestAnimationFrame(updateCounter);
                else el.textContent = target;
            }
            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));


// ===== BEFORE/AFTER SLIDER =====
document.querySelectorAll('.before-after-container').forEach(container => {
    const beforeImg = container.querySelector('.before-img');
    const sliderLine = container.querySelector('.slider-line');
    const sliderHandle = container.querySelector('.slider-handle');
    let isDragging = false;

    function updateSlider(x) {
        const rect = container.getBoundingClientRect();
        let pos = (x - rect.left) / rect.width;
        pos = Math.max(0.02, Math.min(0.98, pos));
        const pct = pos * 100;
        beforeImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        sliderLine.style.left = pct + '%';
        sliderHandle.style.left = pct + '%';
    }

    container.addEventListener('mousedown', (e) => { isDragging = true; updateSlider(e.clientX); });
    container.addEventListener('touchstart', (e) => { isDragging = true; updateSlider(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mousemove', (e) => { if (isDragging) updateSlider(e.clientX); });
    window.addEventListener('touchmove', (e) => { if (isDragging) updateSlider(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });
});


// ===== GALLERY FILTERS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('active', 'bg-brand-500', 'text-white', 'border-brand-500');
            b.classList.add('bg-dark-50', 'text-neutral-400', 'border-white/10');
        });
        btn.classList.add('active', 'bg-brand-500', 'text-white', 'border-brand-500');
        btn.classList.remove('bg-dark-50', 'text-neutral-400', 'border-white/10');

        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden-item');
                item.classList.add('visible-item');
                item.style.display = '';
            } else {
                item.classList.add('hidden-item');
                item.classList.remove('visible-item');
                setTimeout(() => { item.style.display = 'none'; }, 400);
            }
        });
    });
});


// ===== REVIEW CAROUSEL =====
const carousel = document.getElementById('reviewCarousel');
const reviewCards = document.querySelectorAll('.review-card');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const dotsContainer = document.getElementById('carouselDots');
let currentSlide = 0;
let autoplayInterval;

function getVisibleCards() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

function getTotalSlides() {
    return Math.max(1, reviewCards.length - getVisibleCards());
}

function updateCarousel() {
    const cardWidth = 100 / getVisibleCards();
    carousel.style.transform = `translateX(-${currentSlide * cardWidth}%)`;
    updateDots();
}

function updateDots() {
    const total = getTotalSlides();
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= total; i++) {
        const dot = document.createElement('button');
        dot.className = `w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-brand-500 w-6' : 'bg-neutral-600 hover:bg-neutral-500'}`;
        dot.addEventListener('click', () => { currentSlide = i; updateCarousel(); resetAutoplay(); });
        dotsContainer.appendChild(dot);
    }
}

function nextSlide() {
    currentSlide = currentSlide >= getTotalSlides() ? 0 : currentSlide + 1;
    updateCarousel();
}

function prevSlide() {
    currentSlide = currentSlide <= 0 ? getTotalSlides() : currentSlide - 1;
    updateCarousel();
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
}

prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });

window.addEventListener('resize', () => {
    if (currentSlide > getTotalSlides()) currentSlide = getTotalSlides();
    updateCarousel();
});

updateCarousel();
resetAutoplay();


// ===== FORM SUBMISSION =====
const devisForm = document.getElementById('devisForm');
const toast = document.getElementById('toast');

devisForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Afficher le toast de confirmation
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 4000 );

    // TODO (backend) : brancher l'envoi réel (Formspree, EmailJS ou API). Voir README.
    devisForm.reset();
});


// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});


// ===== LIGHTBOX (agrandissement au double-clic) =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.before-after-container').forEach(container => {
    container.addEventListener('dblclick', () => {
        const afterSrc = container.querySelector('.after-img').src;
        lightboxImg.src = afterSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});
