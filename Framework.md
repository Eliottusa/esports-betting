
---

### **`FRAMEWORK.md`**

```markdown
# Choix Techniques et Justifications

## 1️⃣ Stack et Technologies

| Technologie | Rôle | Justification |
|-------------|------|---------------|
| **Next.js** | Framework frontend + SSR | Rendu côté serveur, structuration des pages, performant, puis personnellement découverte d'une nouvelle facette de js. |
| **React** | Librairie frontend | Interfaces dynamiques et réactives, + beaucoup d'options de modifications. |
| **Tailwind CSS** | CSS Framework | Stylisation rapide et responsive, beaucoup, beaucoup plus pratique et possède plus d'options qu'un css classique. |
| **PocketBase** | Backend léger | Gestion utilisateurs, authentification, API RESTful prête à l’emploi. |
| **TypeScript** | Typage | Sécurité, lisibilité et prévention des bugs. |

## 2️⃣ Architecture des fichiers

/esports-betting-app
│
├─ /app
│ ├─ /admin # Dashboard admin
│ ├─ /login # Page login
│ ├─ /signup # Page signup
│ ├─ /profile # Profil utilisateur
│ └─ layout.tsx # Layout global
│
├─ /components # Composants réutilisables
├─ /lib # Connexion PocketBase et utils
├─ /styles # CSS / Tailwind
└─ package.json


## 3️⃣ Architecture logicielle

[Frontend Next.js/React]
|
| REST API / SDK PocketBase
v
[Backend PocketBase]
|
| Gestion utilisateurs, paris, auth
v
[Base de données intégrée PocketBase]


**Explications :**  
- Le frontend communique via API / SDK PocketBase.  
- PocketBase gère la persistence et les rôles (admin/user).  
- Séparation nette des pages admin/utilisateur pour sécuriser l’accès.

## 4️⃣ Outils

- npm / yarn pour la gestion des packages
- Next.js pour routing et SSR
- Tailwind CSS pour la stylisation
- TypeScript pour typage
