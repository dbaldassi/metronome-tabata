# Utilise une image Node.js officielle comme base
FROM node:20-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers nécessaires dans le conteneur
COPY package*.json ./
COPY public ./public

# Installe les dépendances (si vous utilisez un serveur Node.js)
RUN npm install

# Copie le fichier de serveur (si nécessaire)
COPY src ./src

# Expose le port 3000 (ou tout autre port utilisé par votre serveur)
EXPOSE 3000

# Commande pour démarrer le serveur
CMD ["node", "src/server.js"]