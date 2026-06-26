# NSJ Multiservice — Site vitrine

Site one-page moderne, premium et optimisé (HTML / CSS / JavaScript, sans framework).
Charte : **Noir · Orange · Blanc**. Objectif : générer des demandes de devis (téléphone, WhatsApp, formulaire).

## Structure

```
site/
├── index.html          # Toutes les sections de la page
├── css/style.css       # Styles + responsive
├── js/main.js          # Services, galerie avant/après, avis, formulaire
├── assets/img/         # Images (favicon fourni, à compléter)
├── robots.txt
└── sitemap.xml
```

## ▶️ Tester en local

Ouvrez `index.html` dans un navigateur, ou lancez un serveur local :

```bash
cd site
python3 -m http.server 8000
# puis http://localhost:8000
```

## ✅ À PERSONNALISER (important)

Tous les éléments ci-dessous sont des **placeholders** — remplacez-les avant la mise en ligne.

### 1. Coordonnées (téléphone, email, WhatsApp)
Recherchez et remplacez dans `index.html` **et** le bloc Schema.org en haut de page :

| Placeholder | À remplacer par |
|---|---|
| `00 00 00 00 00` | Votre numéro affiché |
| `tel:+33000000000` | `tel:+33XXXXXXXXX` (format international) |
| `contact@nsj-multiservice.fr` | Votre email réel |
| `wa.me/33000000000` | `wa.me/33XXXXXXXXX` (n° WhatsApp sans le 0, ex : 33612345678) |
| `https://www.nsj-multiservice.fr/` | Votre nom de domaine réel (canonical, OG, sitemap, robots) |

> Le bouton WhatsApp flottant et la carte contact utilisent déjà le message pré-rempli demandé.

### 2. Images
- **Hero / À propos / Galerie** : actuellement des photos Unsplash de démonstration (URLs dans `css/style.css` et `js/main.js`).
  Remplacez-les par vos vraies photos avant/après en déposant les fichiers dans `assets/img/` et en mettant à jour les URLs.
- Ajoutez `assets/img/og-image.jpg` (1200×630) pour le partage sur les réseaux sociaux.
- Galerie avant/après : éditez le tableau `gallery` dans `js/main.js` (chaque entrée a `before`, `after`, `title`, `cat`).

### 3. Avis Google
Les avis du carrousel sont des exemples (tableau `reviews` dans `js/main.js`).
Pour afficher de **vrais avis Google**, deux options :
- Copier vos meilleurs avis dans le tableau `reviews` (simple, recommandé pour démarrer).
- Intégrer un widget tiers (Elfsight, Trustindex…) ou l'API Google Places (nécessite une clé API).

### 4. Formulaire de devis (envoi réel)
Le formulaire valide les champs mais **n'envoie rien pour l'instant** (voir le `TODO` dans `js/main.js`).
Branchez un service sans serveur, par ex. **Formspree** :
1. Créez un formulaire sur https://formspree.io
2. Dans `index.html`, ajoutez sur la balise `<form>` : `action="https://formspree.io/f/VOTRE_ID" method="POST"`
3. Dans `js/main.js`, remplacez le bloc `TODO` par un `fetch()` POST, ou laissez le navigateur soumettre nativement.

Alternatives : EmailJS, Netlify Forms (ajouter `netlify` sur la balise form si hébergé chez Netlify).

## 🚀 Déploiement (SSL gratuit inclus)

| Hébergeur | Méthode | SSL |
|---|---|---|
| **Netlify** | Glisser-déposer le dossier `site/` sur app.netlify.com | ✔ auto |
| **Vercel** | `vercel` dans le dossier | ✔ auto |
| **GitHub Pages** | Pousser le repo, activer Pages | ✔ auto |
| **OVH / hébergement classique** | FTP du contenu de `site/` vers `www/` | ✔ via Let's Encrypt |

## 📊 Analytics & Search Console

- **Google Analytics 4** : collez votre snippet `gtag.js` juste avant `</head>` dans `index.html`.
- **Search Console** : ajoutez la balise `<meta name="google-site-verification" ...>` dans `<head>`, puis soumettez `sitemap.xml`.

## ⚡ Performance / SEO (déjà en place)

- Page unique légère, CSS/JS séparés, images en `loading="lazy"`.
- Polices Google avec `preconnect` + `display=swap`.
- Métadonnées SEO, Open Graph, données structurées `LocalBusiness`, `robots.txt`, `sitemap.xml`.
- Référencement local (Chaville, Viroflay, Versailles, Le Chesnay-Rocquencourt, Boulogne-Billancourt, Paris, Hauts-de-Seine, Yvelines) intégré dans les contenus et le footer.
- Responsive mobile / tablette / ordinateur, accessibilité (`prefers-reduced-motion`, labels ARIA).
