# NSJ Multiservice — 4 modèles de site au choix

Quatre maquettes complètes du site vitrine NSJ Multiservice, pour que le client choisisse.
Ouvrez **`index.html`** (racine) : c'est la page de comparaison qui mène aux 4 modèles.

| Dossier | Style | Techno |
|---|---|---|
| [`site-1/`](site-1/) | Sombre — premium classique (Poppins/Inter) | HTML + CSS + JS purs |
| [`site-2/`](site-2/) | Sombre — SaaS moderne, compteurs animés | Tailwind (CDN) + Lucide |
| [`site-3/`](site-3/) | Clair / blanc — épuré premium (serif élégant) | HTML + CSS + JS purs |
| [`site-4/`](site-4/) | Orange — impactant, grande typographie | HTML + CSS + JS purs |

Tous les modèles contiennent **les mêmes sections** (hero, 10 services, pourquoi nous, galerie avant/après avec curseur + filtres + agrandissement, avis clients en carrousel, à propos, formulaire de devis avec photos, contact, WhatsApp flottant) et la même base SEO (métadonnées, mots-clés locaux, données structurées `LocalBusiness`).

## ▶️ Tester en local

```bash
cd site
python3 -m http.server 8000
# puis http://localhost:8000  → page de choix des 4 modèles
```

## ⚠️ À personnaliser avant mise en ligne (pour le modèle retenu)

Ce sont des **placeholders**, à remplacer dans le dossier du modèle choisi :

1. **Coordonnées** — chercher/remplacer dans `index.html` (et le bloc Schema.org) :
   - `00 00 00 00 00`, `tel:+33000000000` (site-2 : `+33600000000`)
   - `contact@nsj-multiservice.fr`
   - `wa.me/33000000000` (site-2 : `33600000000`) → votre n° WhatsApp (format `33XXXXXXXXX`)
   - `https://www.nsj-multiservice.fr/` → votre domaine réel
2. **Images** — actuellement des photos Unsplash de démonstration (nettoyage / rénovation / jardin).
   Remplacez les URLs par vos vraies photos avant/après (dans `index.html`, le tableau `gallery` de `js/main.js`, et le hero dans le CSS/HTML).
3. **Avis Google** — exemples dans `js/main.js` (`reviews`) ou dans le HTML pour site-2 → vos vrais avis.
4. **Formulaire de devis** — il valide les champs mais **n'envoie rien** (voir le `TODO` dans `js/main.js`).
   Branchez **Formspree** (gratuit) : créez un formulaire, ajoutez `action="https://formspree.io/f/VOTRE_ID" method="POST"` sur la balise `<form>`, puis remplacez le bloc TODO par un `fetch()`. Alternatives : EmailJS, Netlify Forms.
5. **Analytics / Search Console** — collez votre snippet GA4 avant `</head>` ; ajoutez la balise de vérification Search Console.

## 🚀 Déploiement (SSL gratuit inclus)

Glissez-déposez le dossier du modèle retenu (ou la racine entière) sur **Netlify** / **Vercel**, ou via FTP chez un hébergeur classique (OVH…). SSL automatique (Let's Encrypt).

> Note : `site-2` charge Tailwind et Lucide via CDN (nécessite une connexion Internet à l'affichage). Les modèles 1, 3 et 4 n'ont aucune dépendance externe hormis les polices Google et les images de démo.

---

Le fichier `z.html` à la racine est la version mono-fichier d'origine ; `site-2/` en est la version décomposée (HTML / CSS / JS séparés) avec des images de nettoyage.
