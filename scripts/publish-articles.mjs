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

function updateSitemap(index) {
  let xml = fs.readFileSync(SITEMAP, 'utf8');
  xml = xml.replace(/\s*<url>\s*<loc>[^<]*\/articles\/[^<]*<\/loc>[\s\S]*?<\/url>/g, '');
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
if (!DRY && (total || process.argv.includes('--sitemap'))) {
  fs.writeFileSync(INDEX, JSON.stringify(index, null, 2) + '\n');
  fs.writeFileSync(SITEMAP, updateSitemap(index));
}
// Le flux RSS est (re)créé s'il manque ou si la liste a changé
if (!DRY && (total || !fs.existsSync(RSS) || process.argv.includes('--sitemap'))) fs.writeFileSync(RSS, buildRss(index));
log(`${total} changement(s)${DRY ? ' (aperçu, rien écrit)' : ''}.`);
