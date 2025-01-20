# Backend du Questionnaire

Ce projet est le backend pour une application de questionnaire. Il utilise Node.js, Express, Sequelize et MySQL.

## Prérequis

- Node.js (version 14 ou supérieure)
- MySQL
- npm (gestionnaire de paquets Node.js)

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/questionnaire-backend.git
   cd questionnaire-backend
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez la base de données MySQL :

   - Assurez-vous que MySQL est installé et en cours d'exécution.
   - Créez une base de données nommée questionnaire :

   ```bash
   CREATE DATABASE questionnaire;
   ```

   - Créez un utilisateur MySQL et accordez-lui les privilèges nécessaires :

   ```bash
   CREATE USER 'user'@'localhost' IDENTIFIED BY 'Testquiz1@';
   GRANT ALL PRIVILEGES ON questionnaire.* TO 'user'@'localhost';
   FLUSH PRIVILEGES;
   ``` 

4. Démarrez le serveur :

   ```bash
   npm start
   ```

Développement
Pour démarrer le serveur en mode développement avec nodemon :

```bash
npm run dev
```

Informations supplémentaires :

root (sans le passwword) ou user (avec le password qu'on avait mis)

```bash
mysql -u user -p
```