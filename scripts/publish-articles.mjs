// Publication automatique des articles Marli sur le site (pages HTML statiques, bonnes pour le SEO).
//
// Deux sources :
//   1. le dashboard (API backend /article/get-articles) — source principale
//   2. des fichiers Markdown dans content/articles/ (optionnel)
//   3. des pages HTML déjà prêtes déposées directement dans public/articles/ (avec leur image .jpg)
// Un article est publié quand sa date de publication est atteinte. Un article modifié dans le
// dashboard est régénéré ; un article supprimé du dashboard est retiré du site.
// Options : --dry-run (ne rien écrire), --force (ignorer les dates), --sitemap (régénérer le sitemap).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DRAFTS = path.join(ROOT, 'content/articles');
const DONE = path.join(ROOT, 'content/publies');
const OUT = path.join(ROOT, 'public/articles');
const INDEX = path.join(OUT, 'articles.json');
const SITEMAP = path.join(ROOT, 'public/sitemap.xml');
const RSS = path.join(ROOT, 'public/rss.xml');
const BIENS_DIR = path.join(ROOT, 'public/biens');
const TEMPLATE = fs.readFileSync(path.join(ROOT, 'scripts/article-template.html'), 'utf8');
const SITE = 'https://marli-immobilier.com';
const API = process.env.MARLI_API_URL || 'https://marli-backend.onrender.com';
const PHONE = '06 88 74 06 21';

const DRY = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');

marked.setOptions({ breaks: true }); // un retour à la ligne dans le dashboard = un retour à la ligne

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const dateFr = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MOIS[m - 1]} ${y}`; };
const isoParis = (d) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(d);
const TODAY = isoParis(new Date());
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70).replace(/-$/, '');
const toList = (v) => (Array.isArray(v) ? v : String(v || '').split(',')).map((x) => String(x).trim()).filter(Boolean);
const plain = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const readJson = (file, fallback) => { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } };
const log = (...a) => console.log(...a);

// Paires question/réponse sous un titre "Questions fréquentes" (## puis ###) -> schéma FAQ Google
function extractFaq(markdown) {
  const faq = []; let inFaq = false, current = null;
  for (const t of marked.lexer(markdown)) {
    if (t.type === 'heading' && t.depth === 2) { inFaq = /questions? fr[ée]quentes|faq/i.test(t.text); current = null; continue; }
    if (!inFaq) continue;
    if (t.type === 'heading' && t.depth === 3) { current = { q: t.text, a: '' }; faq.push(current); continue; }
    if (current && t.type !== 'space') current.a += ' ' + plain(marked.parser([t]));
  }
  return faq.filter((f) => f.a.trim());
}

function buildHtml(a) {
  const bodyHtml = marked.parse(a.markdown);
  const words = plain(bodyHtml).split(' ').length;
  const keywords = toList(a.motsCles);
  const tags = toList(a.tags).length ? toList(a.tags) : keywords.slice(0, 6);
  const faq = extractFaq(a.markdown);
  const jsonld = [{
    '@context': 'https://schema.org', '@type': 'Article',
    headline: a.titre, description: a.description, image: `${SITE}/articles/${a.slug}.jpg`,
    datePublished: a.dateISO, dateModified: a.dateModif || a.dateISO, url: `${SITE}/articles/${a.slug}.html`,
    author: { '@type': 'Person', name: 'Néné Mar', url: `${SITE}/a-propos` },
    publisher: { '@type': 'Organization', name: 'Marli Immobilier', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/favicon.ico` } },
    keywords: keywords.join(', '),
  }];
  if (faq.length) jsonld.push({ '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.trim() } })) });

  return TEMPLATE
    .replaceAll('{{TITLE}}', esc(a.titre))
    .replaceAll('{{DESCRIPTION}}', esc(a.description))
    .replaceAll('{{KEYWORDS}}', esc(keywords.join(', ')))
    .replaceAll('{{SLUG}}', a.slug)
    .replaceAll('{{CATEGORY}}', esc(a.categorie || 'Immobilier · Besançon'))
    .replaceAll('{{EXCERPT}}', esc(a.extrait || a.description))
    .replaceAll('{{DATE_FR}}', dateFr(a.dateISO))
    .replaceAll('{{READ_TIME}}', String(Math.max(1, Math.round(words / 220))))
    .replaceAll('{{COVER}}', `<img class="article-cover" src="/articles/${a.slug}.jpg" alt="${esc(a.titre)}" width="1600">`)
    .replaceAll('{{CONTENT}}', bodyHtml)
    .replaceAll('{{CTA_TITLE}}', esc(a.ctaTitre || 'Un projet immobilier à Besançon ou dans le Doubs ?'))
    .replaceAll('{{CTA_TEXT}}', esc(a.ctaTexte || 'Parlons-en, sans engagement et avec sincérité.'))
    .replaceAll('{{TAGS}}', tags.map((t) => `                    <a href="${SITE}/nous-contacter" class="tag">${esc(t)}</a>`).join('\n'))
    .replaceAll('{{PHONE}}', PHONE)
    .replace('{{JSONLD}}', JSON.stringify(jsonld.length === 1 ? jsonld[0] : jsonld, null, 2));
}

async function writeImage(source, slug) {
  let input = source;
  if (/^https?:\/\//.test(source)) {
    const url = source.includes('res.cloudinary.com') && !/\/upload\/[^/]*w_/.test(source)
      ? source.replace('/upload/', '/upload/c_limit,w_1600/') : source;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`image inaccessible (${r.status})`);
    input = Buffer.from(await r.arrayBuffer());
  }
  await sharp(input).rotate().resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, `${slug}.jpg`));
}

const entryFor = (a) => ({
  id: a.id || Date.now(), title: a.titre, excerpt: a.extrait || a.description,
  date: dateFr(a.dateISO), dateISO: a.dateISO, urlImage: `/articles/${a.slug}.jpg`, link: `/articles/${a.slug}.html`,
  ...(a.sourceId ? { sourceId: a.sourceId, sourceUpdatedAt: a.sourceUpdatedAt } : {}),
});

function uniqueSlug(base, index, ownSourceId) {
  let slug = base || `article-${Date.now()}`, n = 2;
  const taken = (s) => index.some((e) => e.link === `/articles/${s}.html` && (!ownSourceId || e.sourceId !== ownSourceId))
    || (!ownSourceId && fs.existsSync(path.join(OUT, `${s}.html`)));
  while (taken(slug)) slug = `${base}-${n++}`;
  return slug;
}

function updateSitemap(index, biens = null) {
  let xml = fs.readFileSync(SITEMAP, 'utf8');
  xml = xml.replace(/\s*<url>\s*<loc>[^<]*\/articles\/[^<]*<\/loc>[\s\S]*?<\/url>/g, '');
  if (!xml.includes(`${SITE}/honoraires</loc>`)) {
    xml = xml.replace('</urlset>', `  <url>\n    <loc>${SITE}/honoraires</loc>\n    <changefreq>yearly</changefreq>\n    <priority>0.5</priority>\n  </url>\n</urlset>`);
  }
  if (biens) { // fiches des biens (si l'API a répondu ; sinon on garde celles déjà présentes)
    xml = xml.replace(/\s*<url>\s*<loc>[^<]*\/bien\/[^<]*<\/loc>[\s\S]*?<\/url>/g, '');
    const entriesBiens = biens.map((b) => `
  <url>
    <loc>${SITE}/bien/${encodeURIComponent(b.ref)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${b.status === 'vendu' ? '0.4' : '0.8'}</priority>
  </url>`).join('');
    xml = xml.replace('</urlset>', `${entriesBiens}\n</urlset>`);
  }
  const entries = index.map((a) => `
  <url>
    <loc>${SITE}${a.link}</loc>
    <lastmod>${a.dateISO}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');
  return xml.replace('</urlset>', `${entries}\n</urlset>`);
}

// Flux RSS des articles : lu par Metricool (ou tout autre outil) pour préparer les posts
// Google, Facebook et LinkedIn à chaque nouvel article.
function buildRss(index) {
  const x = (t) => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const items = index.slice(0, 30).map((a) => {
    const url = `${SITE}${a.link}`;
    const img = `${SITE}${a.urlImage}`;
    const imgFile = path.join(ROOT, 'public', a.urlImage);
    const size = fs.existsSync(imgFile) ? fs.statSync(imgFile).size : 0;
    return `
    <item>
      <title>${x(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${a.dateISO}T08:00:00+02:00`).toUTCString()}</pubDate>
      <description>${x(a.excerpt)}</description>
      <enclosure url="${img}" length="${size}" type="image/jpeg" />
      <media:content url="${img}" medium="image" type="image/jpeg" />
    </item>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Marli Immobilier · Actualités</title>
    <link>${SITE}/actualite</link>
    <description>Conseils et actualités immobilières à Besançon, dans le Doubs et le Haut-Doubs, par Marli Immobilier.</description>
    <language>fr-fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>
`;
}


// ---------- Fiches des biens en HTML statique
// Les pages React ne sont lisibles qu'en exécutant du JavaScript, ce que ne font pas les robots
// des IA (ChatGPT, Claude, Perplexity...). Une version HTML de chaque fiche et de la liste est
// générée ici ; vercel.json la sert à ces robots aux mêmes adresses (/bien/REF et /acheter).
const PRIX = (n) => (Number(n) ? `${Number(n).toLocaleString('fr-FR').replace(/\u202f/g, ' ')} €` : 'Prix sur demande');
const STATUT = { disponible: 'Disponible', 'sous-compromis': 'Sous compromis', vendu: 'Vendu' };
const photoUrl = (u, w) => (u && u.includes('res.cloudinary.com') && !/\/upload\/[^/]*w_/.test(u) ? u.replace('/upload/', `/upload/f_auto,q_auto,c_limit,w_${w}/`) : u);
const photosDe = (m) => Object.keys(m || {}).filter((k) => /^image_galerie_\d+$/.test(k) && m[k]?.url)
  .sort((a, b) => parseInt(a.split('_').pop(), 10) - parseInt(b.split('_').pop(), 10)).map((k) => m[k].url);
const caracts = (c) => String(c || '').split('#').map((x) => x.trim()).filter(Boolean);
const paragraphes = (t) => String(t || '').split(/\n+/).map((x) => x.trim()).filter(Boolean).map((x) => `<p>${esc(x)}</p>`).join('\n      ');

const STYLE_BIEN = `<style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; background: #fff; line-height: 1.7; }
    .wrap { max-width: 900px; margin: 0 auto; padding: 40px 24px 60px; }
    .top { font-size: 13px; letter-spacing: 1px; text-transform: uppercase; }
    .top a { color: #000; text-decoration: none; }
    h1 { font-family: Georgia, 'Times New Roman', serif; font-size: 34px; line-height: 1.25; margin: 24px 0 8px; }
    .meta { color: #555; font-size: 15px; margin-bottom: 24px; }
    .prix { font-size: 22px; font-weight: 600; margin: 8px 0 24px; }
    .statut { display: inline-block; border: 1px solid #000; padding: 2px 10px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; margin-left: 10px; }
    .photos img { width: 100%; height: auto; display: block; margin: 0 0 12px; }
    h2 { font-family: Georgia, 'Times New Roman', serif; font-size: 24px; margin: 36px 0 12px; }
    ul.carac { padding-left: 20px; }
    .cta { margin: 40px 0; padding: 24px; background: #f5f1ea; }
    .cta a { color: #000; font-weight: 600; }
    .liste a { color: #000; }
    .liste li { margin-bottom: 14px; }
    footer { margin-top: 50px; font-size: 13px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
  </style>`;

function pageBien(b) {
  const url = `${SITE}/bien/${encodeURIComponent(b.ref)}`;
  const photos = photosDe(b._medias);
  const titre = b.title || `Bien ${b.ref}`;
  const desc = `${titre} à ${b.localisation || 'Besançon'}, ${PRIX(b.prix)}. ${caracts(b.caracteristiques).slice(0, 3).join(', ')}. Marli Immobilier, agence immobilière à Besançon.`.slice(0, 300);
  const ld = {
    '@context': 'https://schema.org', '@type': 'RealEstateListing',
    name: titre, url, description: String(b.histoire || desc).slice(0, 1000),
    image: photos.slice(0, 5).map((p) => photoUrl(p, 1200)),
    offers: { '@type': 'Offer', price: Number(b.prix) || undefined, priceCurrency: 'EUR',
      availability: b.status === 'vendu' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock' },
    address: { '@type': 'PostalAddress', addressLocality: b.localisation || 'Besançon', addressCountry: 'FR' },
    broker: { '@type': 'RealEstateAgent', name: 'Marli Immobilier', url: SITE, telephone: '+33688740621' },
  };
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(titre)} · ${esc(b.localisation || '')} | Marli Immobilier</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(titre)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${url}">
  ${photos[0] ? `<meta property="og:image" content="${photoUrl(photos[0], 1200)}">` : ''}
  ${STYLE_BIEN}
  <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
  </script>
</head>
<body>
  <div class="wrap">
    <div class="top"><a href="${SITE}/acheter">← Tous les biens Marli Immobilier</a></div>
    <h1>${esc(titre)}</h1>
    <div class="meta">${esc(b.localisation || '')} · Référence ${esc(b.ref)}<span class="statut">${STATUT[b.status] || esc(b.status || '')}</span></div>
    <div class="prix">${PRIX(b.prix)}</div>
    <div class="photos">
      ${photos.slice(0, 12).map((p, i) => `<img src="${photoUrl(p, 1200)}" alt="${esc(titre)}, vue ${i + 1}" loading="${i ? 'lazy' : 'eager'}">`).join('\n      ')}
    </div>
    <h2>Caractéristiques</h2>
    <ul class="carac">
      ${caracts(b.caracteristiques).map((c) => `<li>${esc(c)}</li>`).join('\n      ')}
    </ul>
    ${b.histoire ? `<h2>L'histoire du lieu</h2>\n      ${paragraphes(b.histoire)}` : ''}
    <div class="cta">Ce bien vous intéresse ? Contactez Néné Mar, Marli Immobilier : 06 88 74 06 21 ou
      <a href="${SITE}/nous-contacter">via le formulaire de contact</a>.</div>
    <footer>Marli Immobilier, passeur d'histoires immobilières · 7 rue Henri Weil, 25000 Besançon · <a href="${SITE}">marli-immobilier.com</a></footer>
  </div>
</body>
</html>
`;
}

function pageListe(biens) {
  const groupe = (st) => biens.filter((b) => b.status === st);
  const li = (b) => `<li><a href="${SITE}/bien/${encodeURIComponent(b.ref)}">${esc(b.title || b.ref)}</a>, ${esc(b.localisation || '')}, ${PRIX(b.prix)}<br>${esc(caracts(b.caracteristiques).slice(0, 4).join(' · '))}</li>`;
  const section = (titre, liste) => (liste.length ? `<h2>${titre}</h2>\n    <ul class="liste">\n      ${liste.map(li).join('\n      ')}\n    </ul>` : '');
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Biens à vendre à Besançon et dans le Doubs | Marli Immobilier</title>
  <meta name="description" content="Maisons, appartements et propriétés à vendre à Besançon, dans le Doubs et le Haut-Doubs, présentés par Marli Immobilier, agence immobilière indépendante à Besançon.">
  <link rel="canonical" href="${SITE}/acheter">
  ${STYLE_BIEN}
</head>
<body>
  <div class="wrap">
    <div class="top"><a href="${SITE}">Marli Immobilier · Besançon</a></div>
    <h1>Biens à vendre avec Marli Immobilier</h1>
    <p>Agence immobilière indépendante à Besançon, Marli Immobilier accompagne la vente de maisons, d'appartements et de propriétés à Besançon, dans le Doubs et le Haut-Doubs. Interlocutrice unique : Néné Mar, 06 88 74 06 21.</p>
    ${section('Disponibles', groupe('disponible'))}
    ${section('Sous compromis', groupe('sous-compromis'))}
    ${section('Vendus récemment', groupe('vendu'))}
    <footer>Marli Immobilier, passeur d'histoires immobilières · 7 rue Henri Weil, 25000 Besançon · <a href="${SITE}">marli-immobilier.com</a></footer>
  </div>
</body>
</html>
`;
}

async function fetchBiens() {
  for (let i = 1; i <= 4; i++) {
    try {
      const r = await fetch(`${API}/bien/all-biens?pageSize=1000`, { signal: AbortSignal.timeout(90_000) });
      if (r.ok) { const d = await r.json(); if (Array.isArray(d?.biens)) return d.biens; }
      log(`API biens : réponse ${r.status} (essai ${i}/4)`);
    } catch (e) { log(`API biens : ${e.message} (essai ${i}/4)`); }
    await new Promise((res) => setTimeout(res, 20_000));
  }
  return null;
}

// Écrit les pages ; renvoie la liste des biens (ou null si l'API est injoignable) et le nombre de fichiers modifiés
async function syncBiens() {
  const biens = await fetchBiens();
  if (!biens) { log('⚠ API injoignable : fiches des biens non régénérées cette fois-ci.'); return { biens: null, changed: 0 }; }
  const publics = biens.filter((b) => b.ref && b.status !== 'non-disponible');
  let changed = 0;
  const ecrire = (file, contenu) => {
    const f = path.join(BIENS_DIR, file);
    if (fs.existsSync(f) && fs.readFileSync(f, 'utf8') === contenu) return;
    if (!DRY) fs.writeFileSync(f, contenu);
    changed++;
  };
  if (!DRY) fs.mkdirSync(BIENS_DIR, { recursive: true });
  // Une fiche = public/biens/<REF>/index.html (servie aux robots IA à l'adresse /bien/<REF>)
  const attendus = new Set(['index.html']);
  for (const b of publics) {
    const dossier = String(b.ref).replace(/[^\w.-]/g, '_');
    attendus.add(dossier);
    if (!DRY) fs.mkdirSync(path.join(BIENS_DIR, dossier), { recursive: true });
    ecrire(path.join(dossier, 'index.html'), pageBien(b));
  }
  ecrire('index.html', pageListe(publics));
  if (fs.existsSync(BIENS_DIR)) for (const f of fs.readdirSync(BIENS_DIR)) {
    if (!attendus.has(f)) { if (!DRY) fs.rmSync(path.join(BIENS_DIR, f), { recursive: true, force: true }); changed++; }
  }
  log(`Fiches des biens : ${publics.length} bien(s), ${changed} fichier(s) modifié(s).`);
  return { biens: publics, changed };
}

// ---------- Source 1 : dashboard
async function fetchDashboardArticles() {
  // Le backend Render peut être en veille : on réessaie le temps qu'il se réveille.
  for (let i = 1; i <= 4; i++) {
    try {
      const r = await fetch(`${API}/article/get-articles`, { signal: AbortSignal.timeout(90_000) });
      if (r.ok) { const data = await r.json(); if (Array.isArray(data)) return data; }
      log(`API articles : réponse ${r.status} (essai ${i}/4)`);
    } catch (e) { log(`API articles : ${e.message} (essai ${i}/4)`); }
    await new Promise((res) => setTimeout(res, 20_000));
  }
  return null; // API injoignable : on ne touche à rien côté dashboard
}

async function syncDashboard(index) {
  const remote = await fetchDashboardArticles();
  if (!remote) { log('⚠ API injoignable : articles du dashboard non synchronisés cette fois-ci.'); return { index, changed: 0 }; }
  let changed = 0;
  const ids = new Set(remote.map((r) => r._id));

  // Articles supprimés dans le dashboard -> retirés du site
  for (const e of index.filter((e) => e.sourceId && !ids.has(e.sourceId))) {
    log(`− retiré (supprimé du dashboard) : ${e.link}`);
    if (!DRY) for (const f of [e.link, e.urlImage]) fs.rmSync(path.join(ROOT, 'public', f), { force: true });
    index = index.filter((x) => x !== e); changed++;
  }

  for (const r of remote) {
    const datePub = isoParis(new Date(r.datePublication || r.createdAt));
    const existing = index.find((e) => e.sourceId === r._id);
    const updatedAt = new Date(r.updatedAt || r.createdAt).toISOString();
    if (!FORCE && datePub > TODAY) {
      if (existing) { // date repoussée dans le futur : on dépublie
        log(`− dépublié (reprogrammé au ${datePub}) : ${existing.link}`);
        if (!DRY) for (const f of [existing.link, existing.urlImage]) fs.rmSync(path.join(ROOT, 'public', f), { force: true });
        index = index.filter((x) => x !== existing); changed++;
      } else log(`… programmé pour le ${datePub} : ${r.title}`);
      continue;
    }
    if (existing && existing.sourceUpdatedAt === updatedAt && existing.dateISO === datePub
      && fs.existsSync(path.join(ROOT, 'public', existing.link))) continue; // déjà à jour

    const slug = existing ? existing.link.replace(/^\/articles\/|\.html$/g, '')
      : uniqueSlug(slugify(r.slug || r.title), index, r._id);
    const a = {
      titre: r.title, description: r.excerpt, extrait: r.excerpt, markdown: r.content,
      dateISO: datePub, dateModif: isoParis(new Date(updatedAt)), categorie: r.categorie, motsCles: r.motsCles,
      slug, sourceId: r._id, sourceUpdatedAt: updatedAt, id: existing?.id,
    };
    try {
      if (!DRY) { await writeImage(r.urlImage, slug); fs.writeFileSync(path.join(OUT, `${slug}.html`), buildHtml(a)); }
      index = [...index.filter((x) => x !== existing), entryFor(a)];
      log(`${existing ? '↻ mis à jour' : '✓ publié'} : ${r.title} → /articles/${slug}.html`); changed++;
    } catch (e) { log(`✗ ${r.title} : ${e.message}`); }
  }
  return { index, changed };
}

// ---------- Source 2 : fichiers Markdown
async function syncMarkdown(index) {
  let changed = 0;
  const files = fs.existsSync(DRAFTS) ? fs.readdirSync(DRAFTS).filter((f) => f.endsWith('.md') && !f.startsWith('_')).sort() : [];
  for (const file of files) {
    const { data: fm, content } = matter(fs.readFileSync(path.join(DRAFTS, file), 'utf8'));
    const missing = ['titre', 'description', 'date', 'image'].filter((k) => !fm[k]);
    if (missing.length) { log(`✗ ${file} : champ(s) manquant(s) ${missing.join(', ')}`); continue; }
    const dateISO = fm.date instanceof Date ? fm.date.toISOString().slice(0, 10) : String(fm.date);
    if (!FORCE && dateISO > TODAY) { log(`… ${file} : programmé pour le ${dateISO}`); continue; }
    const imgSrc = path.join(DRAFTS, fm.image);
    if (!fs.existsSync(imgSrc)) { log(`✗ ${file} : image introuvable (${fm.image})`); continue; }
    const slug = uniqueSlug(slugify(fm.slug || fm.titre), index);
    const a = { titre: fm.titre, description: fm.description, extrait: fm.extrait, markdown: content, dateISO,
      categorie: fm.categorie, motsCles: fm.mots_cles, tags: fm.tags, ctaTitre: fm.cta_titre, ctaTexte: fm.cta_texte, slug };
    if (!DRY) {
      await writeImage(imgSrc, slug);
      fs.writeFileSync(path.join(OUT, `${slug}.html`), buildHtml(a));
      fs.mkdirSync(DONE, { recursive: true });
      fs.renameSync(path.join(DRAFTS, file), path.join(DONE, file));
      fs.renameSync(imgSrc, path.join(DONE, path.basename(fm.image)));
    }
    index = [...index, entryFor(a)]; changed++;
    log(`✓ publié : ${file} → /articles/${slug}.html`);
  }
  return { index, changed };
}

// ---------- Source 3 : pages HTML déposées à la main dans public/articles/
// Toute page .html absente de articles.json y est ajoutée (titre, résumé, date et image lus dans la page).
async function syncHtmlDeposes(index) {
  let changed = 0;
  const pick = (html, re) => { const m = html.match(re); return m ? m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : ''; };
  const decode = (t) => t.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, '’').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  for (const file of fs.readdirSync(OUT).filter((f) => f.endsWith('.html')).sort()) {
    const link = `/articles/${file}`;
    if (index.some((e) => e.link === link)) continue;
    const html = fs.readFileSync(path.join(OUT, file), 'utf8');
    const title = decode(pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) || pick(html, /<meta property="og:title" content="([^"]*)"/i)
      || pick(html, /<title>([\s\S]*?)<\/title>/i).split(' | ')[0]);
    const excerpt = decode(pick(html, /<meta name="description" content="([^"]*)"/i) || pick(html, /<p[^>]*>([\s\S]*?)<\/p>/i)).slice(0, 300);
    const dateISO = pick(html, /"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})/) || TODAY;
    if (!FORCE && dateISO > TODAY) { log(`… ${file} : programmé pour le ${dateISO}`); continue; }
    const slug = file.replace(/\.html$/, '');
    let image = fs.existsSync(path.join(OUT, `${slug}.jpg`)) ? `/articles/${slug}.jpg`
      : (pick(html, /<meta property="og:image" content="https?:\/\/[^/]+(\/articles\/[^"]+)"/i) || '');
    if (!title || !image) { log(`✗ ${file} : titre ou image (${slug}.jpg) introuvable, page ignorée`); continue; }
    // image trop lourde : recompressée (1600 px, qualité 80)
    const imgPath = path.join(ROOT, 'public', image);
    if (!DRY && fs.existsSync(imgPath) && fs.statSync(imgPath).size > 400_000) {
      const buf = await sharp(imgPath).rotate().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      if (buf.length < fs.statSync(imgPath).size) fs.writeFileSync(imgPath, buf);
    }
    index = [...index, { id: Date.now() + changed, title, excerpt, date: dateFr(dateISO), dateISO, urlImage: image, link }];
    log(`✓ ajouté à la liste : ${file} (${dateISO})`); changed++;
  }
  return { index, changed };
}

let index = readJson(INDEX, []);
let total = 0;
for (const sync of [syncDashboard, syncMarkdown, syncHtmlDeposes]) {
  const r = await sync(index); index = r.index; total += r.changed;
}
index.sort((a, b) => b.dateISO.localeCompare(a.dateISO) || (b.id || 0) - (a.id || 0));
const { biens, changed: biensChanged } = await syncBiens();
// La liste des biens n'est comparée qu'aux biens publics actuels : le sitemap n'est réécrit que s'il change
const sitemapAvant = fs.readFileSync(SITEMAP, 'utf8');
const sitemapApres = updateSitemap(index, biens);
if (!DRY && (total || sitemapApres !== sitemapAvant || process.argv.includes('--sitemap'))) {
  fs.writeFileSync(INDEX, JSON.stringify(index, null, 2) + '\n');
  fs.writeFileSync(SITEMAP, sitemapApres);
}
// Le flux RSS est (re)créé s'il manque ou si la liste a changé
if (!DRY && (total || !fs.existsSync(RSS) || process.argv.includes('--sitemap'))) fs.writeFileSync(RSS, buildRss(index));
log(`${total} changement(s) d'articles, ${biensChanged} fichier(s) de biens${DRY ? ' (aperçu, rien écrit)' : ''}.`);
