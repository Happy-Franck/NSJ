/* ===== NSJ Multiservice — scripts partagés ===== */
lucide.createIcons();

// Thème clair / sombre
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        try { localStorage.setItem('nsj-theme', isDark ? 'dark' : 'light'); } catch (e) {}
    });
}

// Mobile menu (présent sur toutes les pages)
const mobBtn = document.getElementById('mobBtn'),
      mobClose = document.getElementById('mobClose'),
      mobMenu = document.getElementById('mobMenu'),
      mobOverlay = document.getElementById('mobOverlay');
if (mobMenu) {
    const openMob = () => { mobMenu.classList.add('open'); mobOverlay.classList.remove('hidden'); document.body.style.overflow = 'hidden'; };
    const closeMob = () => { mobMenu.classList.remove('open'); mobOverlay.classList.add('hidden'); document.body.style.overflow = ''; };
    if (mobBtn) mobBtn.onclick = openMob;
    if (mobClose) mobClose.onclick = closeMob;
    if (mobOverlay) mobOverlay.onclick = closeMob;
    document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeMob));
}

// Scroll reveal
const srEls = document.querySelectorAll('.sr');
if (srEls.length) {
    const srObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); srObs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    srEls.forEach(el => srObs.observe(el));
}

// Process line animation
const pLine = document.getElementById('processLine');
if (pLine) {
    const pObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { pLine.style.transition = 'width 2s cubic-bezier(0.16,1,0.3,1)'; pLine.style.width = '100%'; pObs.unobserve(e.target); } });
    }, { threshold: 0.3 });
    pObs.observe(pLine.parentElement);
}

// Before/After sliders
document.querySelectorAll('.ba-wrap').forEach(wrap => {
    const before = wrap.querySelector('.ba-before'),
          line = wrap.querySelector('.ba-line'),
          handle = wrap.querySelector('.ba-handle');
    let drag = false;
    function upd(x) {
        const r = wrap.getBoundingClientRect();
        let p = (x - r.left) / r.width;
        p = Math.max(0.02, Math.min(0.98, p));
        const v = p * 100;
        before.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
        line.style.left = v + '%';
        handle.style.left = v + '%';
    }
    wrap.addEventListener('mousedown', e => { drag = true; upd(e.clientX); });
    wrap.addEventListener('touchstart', e => { drag = true; upd(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mousemove', e => { if (drag) upd(e.clientX); });
    window.addEventListener('touchmove', e => { if (drag) upd(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mouseup', () => drag = false);
    window.addEventListener('touchend', () => drag = false);
});

// Gallery filters
const gfBtns = document.querySelectorAll('.gf-btn'),
      gcards = document.querySelectorAll('.gallery-card');
gfBtns.forEach(btn => {
    btn.onclick = () => {
        gfBtns.forEach(b => { b.classList.remove('active', 'bg-ink-900', 'text-white', 'border-ink-900'); b.classList.add('bg-white', 'text-ink-600', 'border-ink-200'); });
        btn.classList.add('active', 'bg-ink-900', 'text-white', 'border-ink-900'); btn.classList.remove('bg-white', 'text-ink-600', 'border-ink-200');
        const f = btn.dataset.f;
        gcards.forEach(c => {
            if (f === 'all' || c.dataset.cat === f) { c.classList.remove('g-hide'); c.classList.add('g-show'); c.style.display = ''; }
            else { c.classList.add('g-hide'); c.classList.remove('g-show'); setTimeout(() => { if (c.classList.contains('g-hide')) c.style.display = 'none'; }, 500); }
        });
    };
});

// Reviews carousel
const rTrack = document.getElementById('revTrack');
if (rTrack) {
    const rSlides = document.querySelectorAll('.rev-slide'),
          rPrev = document.getElementById('revPrev'),
          rNext = document.getElementById('revNext'),
          rDots = document.getElementById('revDots');
    let rCur = 0, rAuto;
    const rVis = () => window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const rMax = () => Math.max(0, rSlides.length - rVis());
    function rUpd() {
        rTrack.style.transform = `translateX(-${rCur * (100 / rVis())}%)`;
        rDots.innerHTML = '';
        for (let i = 0; i <= rMax(); i++) {
            const d = document.createElement('button');
            d.className = `w-2 h-2 rounded-full transition-all ${i === rCur ? 'bg-brand-500 w-6' : 'bg-ink-200 hover:bg-ink-300'}`;
            d.onclick = () => { rCur = i; rUpd(); rReset(); };
            rDots.appendChild(d);
        }
    }
    const rNextF = () => { rCur = rCur >= rMax() ? 0 : rCur + 1; rUpd(); };
    const rPrevF = () => { rCur = rCur <= 0 ? rMax() : rCur - 1; rUpd(); };
    const rReset = () => { clearInterval(rAuto); rAuto = setInterval(rNextF, 5000); };
    if (rPrev) rPrev.onclick = () => { rPrevF(); rReset(); };
    if (rNext) rNext.onclick = () => { rNextF(); rReset(); };
    window.addEventListener('resize', () => { if (rCur > rMax()) rCur = rMax(); rUpd(); });
    rUpd(); rReset();
}

// Formulaire de devis
const devisForm = document.getElementById('devisForm');
if (devisForm) {
    devisForm.onsubmit = function (e) {
        e.preventDefault();
        const t = document.getElementById('toast');
        if (t) { t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 4000); }
        this.reset();
    };
}

// Lightbox (galerie)
const lb = document.getElementById('lb');
if (lb) {
    const lbImg = document.getElementById('lbImg'),
          lbClose = document.getElementById('lbClose');
    document.querySelectorAll('.ba-wrap').forEach(w => {
        w.addEventListener('dblclick', () => { lbImg.src = w.querySelector('.ba-after').src; lb.classList.add('on'); document.body.style.overflow = 'hidden'; });
    });
    if (lbClose) lbClose.onclick = () => { lb.classList.remove('on'); document.body.style.overflow = ''; };
    lb.onclick = e => { if (e.target === lb) { lb.classList.remove('on'); document.body.style.overflow = ''; } };
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('on')) { lb.classList.remove('on'); document.body.style.overflow = ''; } });
}

// Smooth scroll (ancres internes uniquement)
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const h = this.getAttribute('href');
        if (h === '#') return;
        const t = document.querySelector(h);
        if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }
    });
});
