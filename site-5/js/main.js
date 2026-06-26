/* ============================================================
   NSJ MULTISERVICE — Site 5 — main.js
   ============================================================ */
(function () {
  'use strict';

  /* ---------- THEME TOGGLE ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    if (themeToggle) themeToggle.setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'light' ? '#ffffff' : '#0b0b0d');
  }
  applyTheme(root.getAttribute('data-theme') || 'dark');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('nsj-theme', next); } catch (e) {}
    });
  }

  /* ---------- Icônes SVG (Lucide-style, stroke uniforme) ---------- */
  const I = {
    concierge: '<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/><circle cx="12" cy="11" r="1.5"/>',
    clean: '<path d="M19 3l-7 7M14 3h5v5M9.5 12.5L5 21l-2-2 8.5-4.5M8 13l3 3"/>',
    extreme: '<path d="M12 2l2.5 5 5.5.8-4 3.9 1 5.5L12 19l-5 2.6 1-5.5-4-3.9 5.5-.8z"/><path d="M5 22h14"/>',
    debarras: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6"/>',
    reno: '<path d="M3 21h18M5 21v-9l7-6 7 6v9M9 21v-5h6v5"/><path d="M14 3l3 3-2 2"/>',
    serrurerie: '<circle cx="9" cy="9" r="5"/><path d="M12.5 12.5L21 21M17 17l2-2 2 2-2 2zM9 9h.01"/>',
    transport: '<path d="M1 11h13v6H1zM14 8h4l3 3v6h-7z"/><circle cx="5" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    bricolage: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z"/>',
    verts: '<path d="M12 22V12M12 12c0-5 3-8 8-8 0 5-3 8-8 8zM12 14c0-4-2.5-6.5-6.5-6.5C5.5 11.5 8 14 12 14z"/>',
    derat: '<path d="M3 12c0-3 2-5 5-5 4 0 6 3 10 3M8 7a2 2 0 1 0 0-.01M18 10l3-2M18 10l3 2M2 14c2 4 6 6 10 6 5 0 9-3 9-7"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 6 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 20l1.3-4a8.4 8.4 0 0 1-.8-3.6 8.5 8.5 0 0 1 17 0z"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function svg(p, w) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.7) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; }

  /* ---------- Services (bento : 2 cartes "wide") ---------- */
  const services = [
    { icon: 'clean', title: 'Entretien & Nettoyage', text: 'Nettoyage régulier ou ponctuel de vos locaux, parties communes et logements.', wide: true },
    { icon: 'extreme', title: 'Nettoyage Extrême', text: 'Remise en état des situations difficiles : insalubrité, après sinistre, Diogène.' },
    { icon: 'concierge', title: 'Conciergerie', text: 'Gestion et services sur-mesure pour faciliter votre quotidien.' },
    { icon: 'debarras', title: 'Débarras', text: 'Débarras complet de maisons, appartements, caves et locaux.' },
    { icon: 'reno', title: 'Rénovation Tous Corps d\'État', text: 'Travaux complets, de la peinture au gros œuvre, coordonnés par nos soins.', wide: true },
    { icon: 'serrurerie', title: 'Serrurerie', text: 'Ouverture, dépannage et sécurisation de vos serrures et accès.' },
    { icon: 'transport', title: 'Transport', text: 'Transport de marchandises et transport accompagné, en sécurité.' },
    { icon: 'bricolage', title: 'Bricolage', text: 'Petits et grands travaux : montage, fixation, réparations.' },
    { icon: 'verts', title: 'Espaces Verts', text: 'Tonte, taille, élagage et aménagement de vos extérieurs.' },
    { icon: 'derat', title: 'Dératisation & Désinsectisation', text: 'Traitement et prévention contre nuisibles et insectes.' }
  ];
  const grid = document.getElementById('servicesGrid');
  if (grid) grid.innerHTML = services.map(function (s, i) {
    return '<article class="service' + (s.wide ? ' service--wide' : '') + '" data-reveal style="transition-delay:' + (i % 4) * 60 + 'ms">' +
      '<div class="service__ic">' + svg(I[s.icon]) + '</div>' +
      '<h3>' + s.title + '</h3><p>' + s.text + '</p>' +
      '<a href="#devis">Demander un devis ' + svg(I.arrow, 2) + '</a></article>';
  }).join('');

  /* ---------- Pourquoi ---------- */
  const why = [
    { icon: 'bolt', title: 'Réactivité', text: 'Une prise en charge rapide, au service de vos délais.' },
    { icon: 'shield', title: 'Professionnalisme', text: 'Des équipes qualifiées et un travail soigné.' },
    { icon: 'clock', title: 'Devis gratuit sous 24h', text: 'Une réponse claire, transparente et sans engagement.' },
    { icon: 'heart', title: 'Satisfaction client', text: 'Votre satisfaction est notre priorité absolue.' }
  ];
  const whyGrid = document.getElementById('whyGrid');
  if (whyGrid) whyGrid.innerHTML = why.map(function (w, i) {
    return '<div class="why__item" data-reveal style="transition-delay:' + (i % 4) * 60 + 'ms">' +
      '<div class="why__ic">' + svg(w.icon === 'shield' ? I.shield : I[w.icon]) + '</div>' +
      '<h3>' + w.title + '</h3><p>' + w.text + '</p></div>';
  }).join('');

  /* ---------- Perks (devis) ---------- */
  const perks = document.getElementById('perks');
  if (perks) perks.innerHTML = [
    [I.clock, 'Réponse sous 24h'],
    [I.shield, 'Devis 100 % gratuit'],
    [I.heart, 'Sans engagement']
  ].map(function (p) { return '<li>' + svg(p[0]) + p[1] + '</li>'; }).join('');

  /* ---------- Contact ---------- */
  const contactGrid = document.getElementById('contactGrid');
  if (contactGrid) contactGrid.innerHTML =
    '<a href="tel:+33000000000" class="contact__card"><div class="contact__ic">' + svg(I.phone) + '</div><h3>Téléphone</h3><p>00 00 00 00 00</p></a>' +
    '<a href="mailto:contact@nsj-multiservice.fr" class="contact__card"><div class="contact__ic">' + svg(I.mail) + '</div><h3>Email</h3><p>contact@nsj-multiservice.fr</p></a>' +
    '<a href="https://wa.me/33000000000?text=Bonjour,%20je%20souhaite%20obtenir%20un%20devis%20pour%20une%20prestation%20NSJ%20Multiservice." target="_blank" rel="noopener" class="contact__card"><div class="contact__ic">' + svg(I.chat) + '</div><h3>WhatsApp</h3><p>Discutons directement</p></a>' +
    '<div class="contact__card contact__card--static"><div class="contact__ic">' + svg(I.pin) + '</div><h3>Zone d\'intervention</h3><p>Île-de-France</p></div>' +
    '<div class="contact__card contact__card--static"><div class="contact__ic">' + svg(I.clock) + '</div><h3>Horaires</h3><p>Lun – Sam · 08h–20h</p></div>';

  /* ---------- Galerie avant/après ---------- */
  const gallery = [
    { cat: 'nettoyage', title: 'Appartement insalubre', before: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80', after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    { cat: 'renovation', title: 'Rénovation cuisine', before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80', after: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80' },
    { cat: 'debarras', title: 'Débarras de local', before: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80', after: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80' },
    { cat: 'espaces-verts', title: 'Entretien de jardin', before: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80', after: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=800&q=80' },
    { cat: 'nettoyage', title: 'Remise en état SDB', before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', after: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80' },
    { cat: 'renovation', title: 'Rénovation bureaux', before: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', after: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80' }
  ];
  const catLabel = { nettoyage: 'Nettoyage', debarras: 'Débarras', renovation: 'Rénovation', 'espaces-verts': 'Espaces verts' };
  const galleryEl = document.getElementById('gallery');
  if (galleryEl) galleryEl.innerHTML = gallery.map(function (g) {
    return '<div class="ba-card" data-cat="' + g.cat + '" data-reveal>' +
      '<div class="ba">' +
      '<img class="ba__img ba__after" src="' + g.after + '" alt="' + g.title + ' après" loading="lazy">' +
      '<img class="ba__img ba__before" src="' + g.before + '" alt="' + g.title + ' avant" loading="lazy">' +
      '<span class="ba__label ba__label--before">Avant</span><span class="ba__label ba__label--after">Après</span>' +
      '<button class="ba__zoom" type="button" aria-label="Agrandir la photo" data-zoom="' + g.after + '">⤢</button>' +
      '<div class="ba__handle"></div></div>' +
      '<div class="ba-card__meta"><span class="ba-card__title">' + g.title + '</span><span class="ba-card__cat">' + catLabel[g.cat] + '</span></div>' +
      '</div>';
  }).join('');

  document.querySelectorAll('.ba').forEach(function (ba) {
    const before = ba.querySelector('.ba__before');
    const handle = ba.querySelector('.ba__handle');
    let dragging = false;
    function setPos(x) {
      const r = ba.getBoundingClientRect();
      let p = ((x - r.left) / r.width) * 100; p = Math.max(0, Math.min(100, p));
      before.style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)'; handle.style.left = p + '%';
    }
    const move = function (e) { if (!dragging) return; const x = e.touches ? e.touches[0].clientX : e.clientX; setPos(x); if (e.touches) e.preventDefault(); };
    ba.addEventListener('mousedown', function (e) { dragging = true; setPos(e.clientX); });
    ba.addEventListener('touchstart', function (e) { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mouseup', function () { dragging = false; });
    window.addEventListener('touchend', function () { dragging = false; });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: false });
  });

  const filters = document.getElementById('filters');
  if (filters) filters.addEventListener('click', function (e) {
    const btn = e.target.closest('.filter'); if (!btn) return;
    filters.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.ba-card').forEach(function (c) { c.classList.toggle('is-hidden', !(f === 'all' || c.dataset.cat === f)); });
  });

  /* ---------- Lightbox ---------- */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  document.addEventListener('click', function (e) {
    const z = e.target.closest('[data-zoom]');
    if (z) { lbImg.src = z.dataset.zoom; lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); return; }
    if (e.target === lb || e.target.closest('#lbClose')) { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); } });

  /* ---------- Avis ---------- */
  const reviews = [
    { stars: 5, text: 'Intervention rapide et travail impeccable pour le nettoyage de notre immeuble. Je recommande vivement.', name: 'Sophie M.', meta: 'Syndic · Boulogne-Billancourt' },
    { stars: 5, text: "Débarras complet d'un appartement en une journée, équipe sérieuse et soignée. Un vrai gain de temps.", name: 'Karim B.', meta: 'Particulier · Versailles' },
    { stars: 5, text: 'Rénovation de notre cuisine du début à la fin avec un seul interlocuteur. Professionnel et à l\'écoute.', name: 'Élodie R.', meta: 'Particulier · Chaville' },
    { stars: 5, text: 'Réactivité exemplaire pour une serrurerie en urgence. Devis clair et tarif honnête. Merci !', name: 'Agence Horizon', meta: 'Agence immobilière · Paris' },
    { stars: 5, text: 'Entretien régulier de nos espaces verts, toujours nickel. Une équipe fiable.', name: 'Association Lien', meta: 'Association · Yvelines' }
  ];
  const track = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carDots');
  if (track) {
    let current = 0, timer = null;
    track.innerHTML = reviews.map(function (r) {
      const ini = r.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
      return '<div class="review"><div class="review__inner"><div class="review__stars">' + '★'.repeat(r.stars) + '</div>' +
        '<p class="review__text">“' + r.text + '”</p><div class="review__author"><span class="review__avatar">' + ini + '</span>' +
        '<div style="text-align:left"><div class="review__name">' + r.name + '</div><div class="review__meta">' + r.meta + '</div></div></div></div></div>';
    }).join('');
    dotsWrap.innerHTML = reviews.map(function (_, i) { return '<button type="button" aria-label="Avis ' + (i + 1) + '"></button>'; }).join('');
    const dots = dotsWrap.querySelectorAll('button');
    function go(i) { current = (i + reviews.length) % reviews.length; track.style.transform = 'translateX(-' + current * 100 + '%)'; dots.forEach(function (d, k) { d.classList.toggle('is-active', k === current); }); }
    function auto() { timer = setInterval(function () { go(current + 1); }, 5000); }
    function reset() { clearInterval(timer); auto(); }
    document.getElementById('carNext').addEventListener('click', function () { go(current + 1); reset(); });
    document.getElementById('carPrev').addEventListener('click', function () { go(current - 1); reset(); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); reset(); }); });
    go(0); auto();
  }

  /* ---------- Compteurs bento ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const cObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      const el = en.target, target = parseInt(el.dataset.count, 10), suffix = el.dataset.suffix || '', start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / 1400, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step); cObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(function (c) { cObs.observe(c); });

  /* ---------- Header scroll ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', function () { header.classList.toggle('is-scrolled', window.scrollY > 20); }, { passive: true });

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', function () {
    const open = nav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('is-open'); navToggle.classList.remove('is-open'); navToggle.setAttribute('aria-expanded', 'false'); });
  });

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } }); }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });

  /* ---------- Fichiers ---------- */
  const photos = document.getElementById('photos');
  const fileInfo = document.getElementById('fileInfo');
  if (photos) photos.addEventListener('change', function () {
    const n = photos.files.length;
    fileInfo.textContent = n ? n + ' fichier(s) sélectionné(s)' : 'JPG, PNG — plusieurs fichiers possibles';
  });

  /* ---------- Formulaire ---------- */
  const form = document.getElementById('quoteForm');
  const note = document.getElementById('formNote');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true, firstBad = null;
    ['nom', 'prenom', 'telephone', 'email', 'prestation'].forEach(function (id) {
      const f = document.getElementById(id); const ok = f.value.trim() !== ''; f.classList.toggle('is-error', !ok); if (!ok && !firstBad) firstBad = f; if (!ok) valid = false;
    });
    const email = document.getElementById('email');
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.classList.add('is-error'); valid = false; if (!firstBad) firstBad = email; }
    if (!valid) { note.textContent = 'Merci de remplir correctement les champs obligatoires.'; note.className = 'note is-error'; if (firstBad) firstBad.focus(); return; }
    // TODO (backend) : brancher l'envoi réel (Formspree, EmailJS ou API). Voir README.
    note.textContent = 'Merci ! Votre demande a bien été prise en compte. Nous vous répondons sous 24h.'; note.className = 'note is-success';
    form.reset(); if (fileInfo) fileInfo.textContent = 'JPG, PNG — plusieurs fichiers possibles';
  });

  const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
})();
