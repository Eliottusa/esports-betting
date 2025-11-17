import json
import requests

# -------------------------------
# CONFIGURATION
# -------------------------------
PB_URL = "http://127.0.0.1:8090/api/collections"  # URL de PocketBase
TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJwYmNfMzE0MjYzNTgyMyIsImV4cCI6MTc2MzQzNTE2MywiaWQiOiJwOTV2YmQ4ZGhsN2UyaDkiLCJyZWZyZXNoYWJsZSI6dHJ1ZSwidHlwZSI6ImF1dGgifQ.v7ibM81A555MWqRwRvuBUjEtYT_FbcuklFB9L_CavPI"  # ton token de superuser

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# -------------------------------
# Charger le fichier JSON
# -------------------------------
with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# -------------------------------
# Fonction pour envoyer les records
# -------------------------------
def send_records(collection, records):
    for record in records:
        response = requests.post(f"{PB_URL}/{collection}/records", json=record, headers=HEADERS)
        if response.status_code in [200, 201]:  # 201 pour created
            print(f"[OK] {collection} -> {record.get('id', '(sans id)')}")
        else:
            print(f"[ERREUR] {collection} -> {record.get('id', '(sans id)')} | {response.status_code} | {response.text}")

# -------------------------------
# Importer toutes les collections
# -------------------------------
collections = ["games", "teams", "players", "team_players", "tournaments", "matches", "users", "bets", "match_odds"]

for col in collections:
    if col in data:
        send_records(col, data[col])

print("Import terminé ✅")
