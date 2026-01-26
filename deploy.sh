#!/bin/bash
set -e

STACK_NAME="kernellab"
VOLUME_NAME="kernellab_public_web"
COMPOSE_FILE="compose.prod.yml"

echo "🧹 Suppression du stack Docker : $STACK_NAME"
docker stack rm "$STACK_NAME"

echo "⏳ Attente de l'arrêt complet des services..."
sleep 10

echo "🗑️ Suppression du volume : $VOLUME_NAME"
docker volume rm "$VOLUME_NAME" || echo "⚠️ Volume déjà supprimé ou inexistant"

echo "⏳ Pause courte avant redéploiement..."
sleep 5

echo "🚀 Déploiement du stack Docker : $STACK_NAME"
docker stack deploy -c "$COMPOSE_FILE" "$STACK_NAME" --with-registry-auth

echo "✅ Déploiement terminé avec succès"
