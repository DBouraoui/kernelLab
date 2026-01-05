# -----------------------------------------------------------------------------
# Étape 1 : Builder (Contient PHP + Node pour compiler les assets)
# -----------------------------------------------------------------------------
FROM dunglas/frankenphp:latest AS builder

# 1. On installe les extensions PHP (nécessaires pour "php artisan")
RUN install-php-extensions \
    pdo_mysql \
    intl \
    zip \
    opcache \
    gd \
    bcmath \
    pcntl

# 2. On installe Node.js et NPM dans cette image PHP
# (FrankenPHP est souvent basé sur Debian ou Alpine, cette commande marche pour Debian/Ubuntu qui est le défaut)
RUN apt-get update && apt-get install -y nodejs npm

WORKDIR /app

# C'est CRUCIAL car le plugin Vite a besoin du dossier "vendor" pour lancer "php artisan"
COPY composer.json composer.lock ./

# 4. On installe les dépendances JS (NPM)
COPY package.json package-lock.json ./
RUN npm ci

# 5. On copie tout le code source
COPY . .

RUN mkdir -p storage/framework/cache/data \
             storage/framework/sessions \
             storage/framework/testing \
             storage/framework/views \
             storage/app/public \
             bootstrap/cache

# On donne les droits (très important)
RUN chmod -R 775 storage bootstrap/cache

# On génère une clé temporaire pour que Laravel ne refuse pas de démarrer
RUN echo "APP_KEY=base64:$(openssl rand -base64 32)" > .env

# 6. On lance le build (Maintenant "php" existe ici, donc wayfinder va marcher !)
RUN npm install
RUN npm run build

RUN rm .env
# -----------------------------------------------------------------------------
# Étape 2 : Image Finale de Production (Propre et légère)
# -----------------------------------------------------------------------------
FROM dunglas/frankenphp

# Installation des extensions pour le runtime
RUN install-php-extensions \
    pdo_mysql \
    intl \
    zip \
    opcache \
    gd \
    bcmath \
    pcntl

ENV SERVER_NAME=:80

# Configuration PHP Prod
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

WORKDIR /app

# On copie le code source
COPY . /app

# On écrase le dossier vendor avec celui généré proprement dans le builder
COPY --from=builder /app/vendor /app/vendor

# On récupère les assets compilés (JS/CSS/Manifest) du builder
COPY --from=builder /app/public/build /app/public/build

# Permissions finales
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache
