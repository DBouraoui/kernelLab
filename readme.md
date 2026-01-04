### dev 

docker compose up -d --wait --build 

cela lance la création des container:
kernallab : php
database : mysql8.0
phpmyadmin

une fois cela créer en developpement la base de donnée laravel est créer d'office avec l'utilsiateur "user" grace au fichier .sql présent dans
./database/mysql-init

une fois les container lancer on doit se renre dans le container kernellab pour lancer la commande suivante chmod +x ./deploy.sh puis ./deploy.sh cela créer toute les migration et les tables et également cela seed la db (DEV uniquement !) avec un utilisateur admin.

