FROM dunglas/frankenphp:latest

# -----------------------------------------------------------------------------
# PHP extensions nécessaires au runtime Laravel
# -----------------------------------------------------------------------------
RUN install-php-extensions \
    pdo_mysql \
    intl \
    zip \
    opcache \
    gd \
    bcmath \
    pcntl

# -----------------------------------------------------------------------------
# Config PHP prod
# -----------------------------------------------------------------------------
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

ENV SERVER_NAME=:80
WORKDIR /app

# -----------------------------------------------------------------------------
# Copier uniquement les fichiers nécessaires en premier (cache Docker)
# -----------------------------------------------------------------------------
COPY composer.json composer.lock ./

# Installer les dépendances PHP (SANS dev)
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --prefer-dist

# -----------------------------------------------------------------------------
# Copier le reste du projet (assets déjà buildés inclus)
# -----------------------------------------------------------------------------
COPY . .

# -----------------------------------------------------------------------------
# Dossiers Laravel obligatoires
# -----------------------------------------------------------------------------
RUN mkdir -p storage/framework/cache/data \
             storage/framework/sessions \
             storage/framework/views \
             storage/app/public \
             bootstrap/cache

# Permissions
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache \
 && chmod -R 775 /app/storage /app/bootstrap/cache

# -----------------------------------------------------------------------------
# Optimisations Laravel (safe en prod)
# -----------------------------------------------------------------------------
RUN php artisan config:clear \
 && php artisan route:clear \
 && php artisan view:clear

# (OPTIONNEL mais recommandé si APP_KEY présent au runtime)
# RUN php artisan config:cache \
#  && php artisan route:cache \
#  && php artisan view:cache
