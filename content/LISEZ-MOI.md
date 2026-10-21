# Publier un article sur marli-immobilier.com

Trois façons, au choix. Dans les trois cas, l'article apparaît sur la page Actualités,
dans le sitemap, avec son image optimisée, sans toucher au code.

## 1. Depuis le dashboard (Mes articles)
Titre, résumé, contenu, image, date de publication. Mise en ligne dans l'heure suivant la date.

## 2. Page HTML rédigée avec Claude, poussée sur Git (comme avant)
Déposer dans `public/articles/` :
- `mon-article.html` : la page complète
- `mon-article.jpg` : l'image, **même nom** que la page

Puis : `git add public/articles && git commit -m "Article : ..." && git push`

La page est ajoutée automatiquement à la liste (plus besoin de modifier Actualites.js ni le sitemap).
Le script lit dans la page : le titre (`<h1>`), le résumé (`<meta name="description">`)
et la date (`"datePublished"` du bloc JSON-LD ; une date future programme l'article).
Pour garder la même mise en page que les autres articles, demander à Claude de suivre
le gabarit `scripts/article-template.html`.

## 3. Fichier Markdown
Copier `content/articles/_exemple.md` (sans le « _ »), y joindre l'image, pousser.
