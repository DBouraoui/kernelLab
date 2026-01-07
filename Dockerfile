# -----------------------------------------------------------------------------
# Étape 1 : Builder (Installation de Composer + Node + Build Assets)
# -----------------------------------------------------------------------------
FROM dunglas/frankenphp:latest AS builder

# 1. Installation des extensions PHP et de l'exécutable Composer
RUN install-php-extensions \
    pdo_mysql \
    intl \
    zip \
    opcache \
    gd \
    bcmath \
    pcntl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 2. Installation de Node.js
RUN apt-get update && apt-get install -y nodejs npm

WORKDIR /app

# 3. Installation des dépendances PHP (Indispensable pour que "php artisan" fonctionne)
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# 4. Installation des dépendances JS
COPY package.json package-lock.json ./
RUN npm ci

# 5. Copie du code source et génération de l'autoloader
COPY . .
RUN composer dump-autoload --optimize --no-dev

# 6. Build des assets (Maintenant "php artisan" fonctionnera !)
# On crée un .env temporaire car certaines commandes Laravel/Vite en ont besoin
RUN cp .env.example .env && \
    php artisan key:generate && \
    npm run build

# -----------------------------------------------------------------------------
# Étape 2 : Image Finale
# -----------------------------------------------------------------------------
FROM dunglas/frankenphp

RUN install-php-extensions \
    pcntl \
    pdo_mysql \
    intl \
    zip \
    opcache \
    gd \
    bcmath \

COPY . /app

# On récupère les dossiers cruciaux du builder
COPY --from=builder /app/vendor /app/vendor
COPY --from=builder /app/public/build /app/public/build

# Droits sur les dossiers de cache/stockage
RUN mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache \
    && chown -R www-data:www-data /app/storage /app/bootstrap/cache \
    && chmod -R 775 /app/storage /app/bootstrap/cache

# Nettoyage pour la prod
RUN php artisan config:cache && php artisan route:cache

ENTRYPOINT ["php", "artisan", "octane:frankenphp"]
