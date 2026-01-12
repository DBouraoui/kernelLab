<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateUser extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'user:create
        {email : Email de l’utilisateur}
        {--password= : Mot de passe (optionnel, sinon demandé)}';

    /**
     * The console command description.
     */
    protected $description = 'Create a new user from CLI';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $email = $this->argument('email');

        // Mot de passe : option OU prompt sécurisé
        $password = $this->option('password')
            ?? $this->secret('Mot de passe');

        if (! $password) {
            $this->error('Mot de passe requis');
            return self::FAILURE;
        }

        if (User::where('email', $email)->exists()) {
            $this->error("L’utilisateur $email existe déjà");
            return self::FAILURE;
        }

        $user = User::create([
            'name' => 'User',
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $this->info("✅ Utilisateur créé : {$user->email}");

        return self::SUCCESS;
    }
}
