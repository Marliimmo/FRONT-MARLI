"""
Suivi de visibilité de Marli Immobilier dans les réponses des IA.
Pose des questions types à Claude (avec recherche web) et, si une clé est fournie,
à Perplexity, puis enregistre si Marli est cité et quelles sources sont utilisées.

Usage :
    pip install requests
    export ANTHROPIC_API_KEY=...        # obligatoire
    export PERPLEXITY_API_KEY=...       # optionnel
    python geo_monitor.py
Résultats ajoutés à monitoring/resultats.csv
"""
import csv, datetime, os, re, requests
from pathlib import Path

MARQUE = re.compile(r"marli", re.I)
DOMAINE = "marli-immobilier.com"

QUESTIONS = [
    "Quelle agence immobilière me conseilles-tu à Besançon ?",
    "Quelles sont les meilleures agences immobilières dans le Doubs ?",
    "Je veux vendre une maison de caractère près de Besançon, quelle agence contacter ?",
    "Agence immobilière en Franche-Comté pour vendre une maison de maître",
    "Quelle agence immobilière pour vendre un appartement à Maîche ?",
    "Agence immobilière indépendante Besançon avis",
    "Qui peut estimer ma maison dans le Haut-Doubs ?",
]

def claude(q):
    r = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={"x-api-key": os.environ["ANTHROPIC_API_KEY"],
                 "anthropic-version": "2023-06-01", "content-type": "application/json"},
        json={"model": "claude-sonnet-5-5", "max_tokens": 1500,
              "tools": [{"type": "web_search_20250305", "name": "web_search", "max_uses": 3}],
              "messages": [{"role": "user", "content": q}]},
        timeout=120)
    r.raise_for_status()
    blocs = r.json()["content"]
    texte = "\n".join(b.get("text", "") for b in blocs if b["type"] == "text")
    urls = []
    for b in blocs:
        if b["type"] == "web_search_tool_result" and isinstance(b.get("content"), list):
            urls += [x.get("url", "") for x in b["content"]]
    return texte, urls

def perplexity(q):
    r = requests.post(
        "https://api.perplexity.ai/chat/completions",
        headers={"Authorization": f"Bearer {os.environ['PERPLEXITY_API_KEY']}"},
        json={"model": "sonar", "messages": [{"role": "user", "content": q}]},
        timeout=120)
    r.raise_for_status()
    d = r.json()
    urls = d.get("citations") or [s.get("url", "") for s in d.get("search_results", [])]
    return d["choices"][0]["message"]["content"], urls

def main():
    moteurs = {"claude": claude}
    if os.environ.get("PERPLEXITY_API_KEY"):
        moteurs["perplexity"] = perplexity
    sortie = Path(__file__).parent / "resultats.csv"
    neuf = not sortie.exists()
    date = datetime.date.today().isoformat()
    total = cites = 0
    with sortie.open("a", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        if neuf:
            w.writerow(["date", "moteur", "question", "marli_cite", "site_en_source", "sources"])
        for nom, fn in moteurs.items():
            for q in QUESTIONS:
                try:
                    texte, urls = fn(q)
                except Exception as e:
                    print(f"[{nom}] erreur : {e}")
                    continue
                cite = bool(MARQUE.search(texte))
                source = any(DOMAINE in u for u in urls)
                total += 1; cites += cite
                w.writerow([date, nom, q, cite, source, " | ".join(urls[:10])])
                print(f"[{nom}] {'OUI' if cite else 'non'}  {q}")
    print(f"\nMarli cité dans {cites}/{total} réponses.")

if __name__ == "__main__":
    main()
