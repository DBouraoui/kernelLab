FROM php:8.4-fpm

# 1. Installation des dépendances système + Node.js
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libzip-dev libicu-dev \
    zip unzip git curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Extensions PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd zip bcmath pcntl intl

# 3. Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# 4. Copie des fichiers de dépendances uniquement (Optimisation cache)
COPY composer.json composer.lock package.json package-lock.json ./

# 5. Installation propre des dépendances
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist
RUN npm ci

# 6. Copie du reste du code source
# C'est ici que Wayfinder aura accès aux fichiers PHP pour générer ses types
COPY . .

# 7. Génération de l'autoloader PHP (nécessaire pour que Wayfinder fonctionne)
RUN composer dump-autoload --optimize --no-dev

# 8. BUILD DES ASSETS (Node + PHP sont présents ici)
# Wayfinder va pouvoir appeler PHP pour générer les routes/actions
RUN npm run build

# 9. Nettoyage (On vire les node_modules pour alléger l'image finale)
RUN rm -rf node_modules

# 10. Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/public
