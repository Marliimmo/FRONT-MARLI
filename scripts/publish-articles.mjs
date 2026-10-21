// Publication automatique des articles Marli.
// Lit content/articles/*.md, publie ceux dont la date est atteinte :
// génère public/articles/<slug>.html + <slug>.jpg, met à jour articles.json et sitemap.xml,
// puis déplace le brouillon dans content/publies/.
// Options : --dry-run (ne rien écrire), --force (ignorer la date).
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
const TEMPLATE = fs.readFileSync(path.join(ROOT, 'scripts/article-template.html'), 'utf8');
const SITE = 'https://marli-immobilier.com';
const PHONE = '06 88 74 06 21'; // numéro affiché en bas des articles

const DRY = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const dateFr = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MOIS[m - 1]} ${y}`; };
const todayParis = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
const toList = (v) => (Array.isArray(v) ? v : String(v || '').split(',')).map((x) => String(x).trim()).filter(Boolean);
const plain = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

// Extrait les paires question/réponse sous un titre "Questions fréquentes" (## puis ###).
function extractFaq(markdown) {
  const tokens = marked.lexer(markdown);
  const faq = [];
  let inFaq = false, current = null;
  for (const t of tokens) {
    if (t.type === 'heading' && t.depth === 2) { inFaq = /questions? fr[ée]quentes|faq/i.test(t.text); current = null; continue; }
    if (!inFaq) continue;
    if (t.type === 'heading' && t.depth === 3) { current = { q: t.text, a: '' }; faq.push(current); continue; }
    if (current && t.type !== 'space') current.a += ' ' + plain(marked.parser([t]));
  }
  return faq.filter((f) => f.a.trim());
}

function readJson(file, fallback) { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } }

function updateSitemap(index) {
  let xml = fs.readFileSync(SITEMAP, 'utf8');
  // On retire toutes les entrées d'articles puis on les régénère depuis articles.json.
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

async function publish(file, index) {
  const raw = fs.readFileSync(path.join(DRAFTS, file), 'utf8');
  const { data: fm, content } = matter(raw);
  const required = ['titre', 'description', 'date', 'image'];
  const missing = required.filter((k) => !fm[k]);
  if (missing.length) { console.log(`✗ ${file} : champ(s) manquant(s) ${missing.join(', ')}`); return null; }

  const dateISO = fm.date instanceof Date ? fm.date.toISOString().slice(0, 10) : String(fm.date);
  if (!FORCE && dateISO > todayParis()) { console.log(`… ${file} : programmé pour le ${dateISO}`); return null; }

  const slug = fm.slug ? slugify(fm.slug) : slugify(fm.titre);
  if (index.some((a) => a.link === `/articles/${slug}.html`)) { console.log(`✗ ${file} : le slug "${slug}" existe déjà`); return null; }

  const imgSrc = path.join(DRAFTS, fm.image);
  if (!fs.existsSync(imgSrc)) { console.log(`✗ ${file} : image introuvable (${fm.image})`); return null; }

  const bodyHtml = marked.parse(content);
  const words = plain(bodyHtml).split(' ').length;
  const keywords = toList(fm.mots_cles);
  const tags = toList(fm.tags).length ? toList(fm.tags) : keywords.slice(0, 6);
  const faq = extractFaq(content);

  const jsonld = [{
    '@context': 'https://schema.org', '@type': 'Article',
    headline: fm.titre, description: fm.description,
    image: `${SITE}/articles/${slug}.jpg`,
    datePublished: dateISO, dateModified: dateISO,
    url: `${SITE}/articles/${slug}.html`,
    author: { '@type': 'Person', name: 'Néné Mar', url: `${SITE}/a-propos` },
    publisher: { '@type': 'Organization', name: 'Marli Immobilier', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/favicon.ico` } },
    keywords: keywords.join(', '),
  }];
  if (faq.length) jsonld.push({ '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.trim() } })) });

  const html = TEMPLATE
    .replaceAll('{{TITLE}}', esc(fm.titre))
    .replaceAll('{{DESCRIPTION}}', esc(fm.description))
    .replaceAll('{{KEYWORDS}}', esc(keywords.join(', ')))
    .replaceAll('{{SLUG}}', slug)
    .replaceAll('{{CATEGORY}}', esc(fm.categorie || 'Immobilier · Besançon'))
    .replaceAll('{{EXCERPT}}', esc(fm.extrait || fm.description))
    .replaceAll('{{DATE_FR}}', dateFr(dateISO))
    .replaceAll('{{READ_TIME}}', String(Math.max(1, Math.round(words / 220))))
    .replaceAll('{{COVER}}', `<img class="article-cover" src="/articles/${slug}.jpg" alt="${esc(fm.titre)}" width="1600">`)
    .replaceAll('{{CONTENT}}', bodyHtml)
    .replaceAll('{{CTA_TITLE}}', esc(fm.cta_titre || 'Un projet immobilier à Besançon ou dans le Doubs ?'))
    .replaceAll('{{CTA_TEXT}}', esc(fm.cta_texte || 'Parlons-en, sans engagement et avec sincérité.'))
    .replaceAll('{{TAGS}}', tags.map((t) => `                    <a href="${SITE}/nous-contacter" class="tag">${esc(t)}</a>`).join('\n'))
    .replaceAll('{{PHONE}}', PHONE)
    .replace('{{JSONLD}}', JSON.stringify(jsonld.length === 1 ? jsonld[0] : jsonld, null, 2));

  const entry = { id: Date.now(), title: fm.titre, excerpt: fm.extrait || fm.description,
    date: dateFr(dateISO), dateISO, urlImage: `/articles/${slug}.jpg`, link: `/articles/${slug}.html` };

  if (DRY) { console.log(`✓ [aperçu] ${file} → /articles/${slug}.html (${words} mots, ${faq.length} Q/R)`); return entry; }

  await sharp(imgSrc).rotate().resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, `${slug}.jpg`));
  fs.writeFileSync(path.join(OUT, `${slug}.html`), html);
  fs.mkdirSync(DONE, { recursive: true });
  fs.renameSync(path.join(DRAFTS, file), path.join(DONE, file));
  fs.renameSync(imgSrc, path.join(DONE, path.basename(fm.image)));
  console.log(`✓ publié : ${file} → /articles/${slug}.html`);
  return entry;
}

const index = readJson(INDEX, []);
const drafts = fs.existsSync(DRAFTS) ? fs.readdirSync(DRAFTS).filter((f) => f.endsWith('.md') && !f.startsWith('_')) : [];
const added = [];
for (const f of drafts.sort()) { const e = await publish(f, [...index, ...added]); if (e) added.push(e); }

if (process.argv.includes('--sitemap') && !DRY) fs.writeFileSync(SITEMAP, updateSitemap(index));

if (added.length && !DRY) {
  const next = [...added, ...index].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
  fs.writeFileSync(INDEX, JSON.stringify(next, null, 2) + '\n');
  fs.writeFileSync(SITEMAP, updateSitemap(next));
}
console.log(`${added.length} article(s) ${DRY ? 'publiable(s)' : 'publié(s)'}.`);
