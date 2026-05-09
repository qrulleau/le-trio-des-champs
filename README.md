# 🌾 Agriculteur
 
Application web permettant de consulter des informations agricoles et de s'inscrire pour recevoir des notifications SMS 24h/48h avant des dates importantes.
 
## Stack technique
 
| Couche | Technologie |
|--------|-------------|
| Frontend | Angular + Tailwind CSS |
| Backend | AdonisJS (Node.js) |
| Base de données | PostgreSQL |
| Conteneurisation | Docker + Docker Compose |
 
## Prérequis
 
- [Docker](https://docs.docker.com/get-docker/) >= 24
- [Docker Compose](https://docs.docker.com/compose/) >= 2
## Installation et lancement
 
```bash
# Cloner le repo
git clone https://github.com/ton-pseudo/agriculteur.git
cd agriculteur
 
# Copier le fichier d'environnement et remplir les valeurs
cp back/.env.example back/.env
 
# Lancer les conteneurs
docker compose up --build
```
 
L'application est accessible sur :
- **Frontend** → http://localhost:4200
- **API** → http://localhost:3333
## Variables d'environnement
 
Copier `back/.env.example` en `back/.env` et renseigner les valeurs :
 
```env
APP_KEY=        # Générer avec : node ace generate:key
DB_HOST=db      # Nom du service Docker (ne pas modifier)
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_DATABASE=
```
 
## Commandes utiles
 
```bash
# Lancer en arrière-plan
docker compose up -d
 
# Voir les logs
docker compose logs -f
 
# Stopper les conteneurs
docker compose down
 
# Accéder au shell du back
docker compose exec api sh
 
# Lancer les migrations
docker compose exec api node ace migration:run
```
 
## Conventions de commits
 
Ce projet suit la convention [Conventional Commits](https://www.conventionalcommits.org/).
 
```
type(scope): description courte
```
 
### Types
 
| Type | Usage |
|------|-------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `chore` | Tâche technique (config, dépendances...) |
| `docs` | Documentation |
| `refactor` | Réécriture sans changement de comportement |
| `style` | Formatage, indentation |
| `test` | Ajout ou modification de tests |
| `ci` | CI/CD |
 
### Exemples
 
```bash
feat(auth): add user registration endpoint
fix(db): fix connection timeout on startup
chore(docker): setup docker environment
docs: update README setup instructions
```
 
## Structure du projet
 
```
agriculteur/
├── front/                  # Application Angular
│   └── src/
│       └── app/
│           ├── core/       # Services singleton, guards, interceptors
│           ├── shared/     # Composants réutilisables
│           └── features/   # Fonctionnalités (lazy loading)
├── back/                   # API AdonisJS
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── services/
│   ├── database/
│   │   └── migrations/
│   └── start/
│       └── routes.ts
├── docker/
│   ├── front/Dockerfile
│   └── back/Dockerfile
└── docker-compose.yml
```
