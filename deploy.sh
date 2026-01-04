#!/bin/bash
set -e
echo "🗄️ Création DB si nécessaire..."
php artisan migrate --force --seed

echo "🧹 Optimisation Laravel..."
php artisan optimize
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Deploy terminé"
