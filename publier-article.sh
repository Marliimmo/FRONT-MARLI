#!/bin/bash
set -e
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}╔══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   MARLI — Publication d'un article   ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════╝${NC}"
echo ""

git pull origin main

echo ""
read -p "Nom du fichier HTML (ex: article-dpe.html) : " NOM_HTML
read -p "Nom de l'image (ex: article_dpe.jpg) : " NOM_IMAGE
read -p "Titre de l'article : " TITRE
read -p "Resume court (1 phrase) : " RESUME
read -p "Date de publication (ex: 2 Mai 2026) : " DATE_ARTICLE

BUREAU="/c/Users/marne/Desktop"

if [ ! -f "$BUREAU/$NOM_HTML" ]; then
    echo -e "${RED}✗ Fichier HTML introuvable sur le bureau${NC}"
    exit 1
fi
if [ ! -f "$BUREAU/$NOM_IMAGE" ]; then
    echo -e "${RED}✗ Image introuvable sur le bureau${NC}"
    exit 1
fi

cp "$BUREAU/$NOM_HTML" "public/articles/$NOM_HTML"
cp "$BUREAU/$NOM_IMAGE" "public/articles/$NOM_IMAGE"
echo -e "${GREEN}✓ Fichiers copies${NC}"

ID=$(date +%s)
sed -i "s|const articles = \[|const articles = [\n    {\n      id: $ID,\n      title: \"$TITRE\",\n      excerpt: \"$RESUME\",\n      date: \"$DATE_ARTICLE\",\n      urlImage: \"/articles/$NOM_IMAGE\",\n      link: \"/articles/$NOM_HTML\"\n    },|" src/pages/Actualite/Actualite.js
echo -e "${GREEN}✓ Actualite.js mis a jour${NC}"

git add "public/articles/$NOM_HTML" "public/articles/$NOM_IMAGE" src/pages/Actualite/Actualite.js
git commit -m "Ajout article : $TITRE"
git push origin main

echo ""
echo -e "${GREEN}✓ Article publie avec succes !${NC}"
echo ""
