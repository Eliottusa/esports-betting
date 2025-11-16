# Esports Betting App

Une application web pour parier sur les compétitions e-sportives, avec gestion des utilisateurs et dashboard admin.

## 🔹 Fonctionnalités principales

- Inscription / Connexion sécurisée
- Dashboard Admin (gestion utilisateurs et paris)
- Profil utilisateur avec historique des paris
- Interface responsive et moderne

## 🚀 Installation et lancement

### Prérequis

- Node.js ≥ 18
- npm ≥ 9 ou Yarn ≥ 3
- PocketBase (serveur local ou cloud)

### Installation

1. Cloner le projet :

```bash
git clone <votre-repo>
cd esports-betting-app
```
2. Installer les dépendances : 

```bash
npm install
# ou
yarn
```

3. Configurer les variables d’environnement (.env.local) :

```bash
NEXT_PUBLIC_PB_URL=http://127.0.0.1:8090
PB_ADMIN_EMAIL=votreadmin@mail.com
PB_ADMIN_PASSWORD=motdepasse
```

4. Lancer le serveur :
```bash
npm run dev
# ou
yarn dev
```

5. Accéder à l'application : 

```bash
http://localhost:3000
```