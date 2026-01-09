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

# 3. Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Installation de Node.js (Version stable pour Vite/Inertia)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app

# Gestion des droits pour Laravel
RUN chown -R www-data:www-data /app
