FROM php:8.4-fpm

# 1. Installation des dépendances système (Ajout de libicu-dev pour intl)
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libicu-dev \
    zip \
    unzip \
    git \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Configuration et installation des extensions PHP
# On configure GD puis on installe tout d'un coup
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-configure intl \
    && docker-php-ext-install \
    pdo_mysql \
    gd \
    zip \
    bcmath \
    pcntl \
    intl

# 3. Installation de Composer et Node.js
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app

# 4. Copie des fichiers de dépendances (pour optimiser le cache Docker)
COPY composer.json composer.lock package.json package-lock.json ./

# 5. Installation des dépendances PHP et JS
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist
RUN npm ci

# 6. Copie du reste du code source
COPY . .

# 7. Génération de l'autoloader et Build des assets Inertia/Vite
RUN composer dump-autoload --optimize --no-dev
RUN npm run build

# 8. Nettoyage des fichiers inutiles pour alléger l'image
RUN rm -rf node_modules

# 9. Gestion des permissions (Crucial pour Laravel)
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache
