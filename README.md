# Excellent Training - Green Building

Une application web complète pour la gestion des sessions de formation, des formateurs et des participants, développée avec **Spring Boot** (Backend) et **React** (Frontend).

## ✨ Fonctionnalités Principales

*   **Authentification & Sécurité** : Sécurisation via JWT (JSON Web Tokens) avec une gestion fine des droits basée sur les rôles (`ADMINISTRATEUR`, `RESPONSABLE`, `SIMPLE_UTILISATEUR`).
*   **Tableau de Bord (Dashboard)** : Vue d'ensemble avec statistiques interactives (répartition des rôles utilisateurs, formations par domaine, etc.).
*   **Gestion des Profils (Libre-service)** : Les utilisateurs peuvent consulter et mettre à jour de manière autonome leurs informations personnelles (nom d'utilisateur, adresse email, mot de passe).
*   **Administration des Utilisateurs** : Les administrateurs peuvent créer de nouveaux comptes et gérer les rôles d'accès. Les mots de passe des nouveaux utilisateurs sont générés aléatoirement et envoyés automatiquement par email.
*   **Gestion des Formations & Participants** : Suivi complet des sessions de formation, attribution des formateurs et des participants, gestion des domaines de formation.
*   **Architecture Moderne** : Interface utilisateur réactive et premium avec React, Tailwind CSS et shadcn/ui. Backend robuste en Java Spring Boot couplé à une base de données PostgreSQL.

---

## 🚀 Comment lancer le projet

### Option 1 : Avec Docker (Recommandé)
Le projet inclut une configuration `docker-compose.yml` permettant de lancer facilement la base de données PostgreSQL et le backend Spring Boot.

**1. Lancer la Base de Données et le Backend :**
```bash
# À la racine du projet
docker-compose up --build -d
```
> Le backend Spring Boot démarrera sur `http://localhost:8080` et la base de données PostgreSQL sur le port `5432`.

**2. Lancer le Frontend :**
Puisque le frontend est généralement lancé en mode développement pour profiter du Hot Module Replacement, lancez-le en local :
```bash
cd frontend
npm install
npm run dev
```
> L'application sera accessible sur `http://localhost:5173`.

---

### Option 2 : Sans Docker (Mode Développement Local complet)

Si vous préférez tout installer manuellement, voici la marche à suivre.

**Prérequis :**
*   Java 17+ et Maven
*   Node.js (v18+) et npm
*   Une instance PostgreSQL locale en cours d'exécution.

**1. Configuration de la base de données :**
*   Créez une base de données PostgreSQL locale nommée `formation_db`.
*   Configurez un fichier `.env` dans le dossier `backend` (ou ajustez le fichier `application.yml` ou `application-dev.yml`) pour y insérer vos identifiants PostgreSQL et la clé JWT :
```env
DB_URL=jdbc:postgresql://localhost:5432/formation_db
DB_USERNAME=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
JWT_SECRET=votre_secret_jwt_tres_long_et_securise
```

**2. Lancement du Backend (Spring Boot) :**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**3. Lancement du Frontend (React) :**
```bash
cd frontend
npm install
npm run dev
```

---

## 🛠 Technologies Utilisées

*   **Frontend** : React 18, TypeScript, Tailwind CSS, composants shadcn/ui, Lucide Icons, React Hook Form, TanStack Query (React Query), Recharts.
*   **Backend** : Java 17, Spring Boot 3 (Web, Security, Data JPA, Mail, Validation), PostgreSQL, JWT (JSON Web Tokens).
*   **Infrastructure** : Docker, Docker Compose.
