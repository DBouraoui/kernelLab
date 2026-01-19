<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * Les attributs assignables en masse.
     */
    protected $fillable = [
        'title',
        'slug',
        'category',
        'description_short',
        'content',
        'thumbnail_url',
        'stack',
        'github_url',
        'live_url',
        'is_featured',
        'status',
    ];

    /**
     * Boot du modèle pour générer le slug automatiquement si vide.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug)) {
                $slug = \Illuminate\Support\Str::slug($project->title);
                $originalSlug = $slug;
                $count = 1;

                // On boucle tant qu'un projet possède déjà ce slug
                while (static::where('slug', $slug)->exists()) {
                    $slug = "{$originalSlug}-{$count}";
                    $count++;
                }

                $project->slug = $slug;
            }
        });
    }

    /**
     * Cast des attributs pour Inertia/React.
     */
    protected function casts(): array
    {
        return [
            'stack' => 'array',        // Transforme le JSON en tableau PHP (et vice-versa)
            'is_featured' => 'boolean', // Assure qu'on reçoit true/false et pas 1/0
            'created_at' => 'datetime:d M Y', // Formatage propre pour le frontend
        ];
    }

    /**
     * Scope pour récupérer uniquement les projets publiés.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->where('created_at', '<=', now());
    }

    /**
     * Scope pour les projets mis en avant.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
