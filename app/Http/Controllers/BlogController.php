<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index() {
        // Articles publiés (visibles normalement)
        $posts = Post::where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->get();

        // Articles en brouillon (pour la section "En cours")
        $comingSoon = Post::where('status', 'draft')
            ->orderBy('updated_at', 'desc')
            ->take(3) // On en montre juste quelques-uns
            ->get();

        $allTags = Post::where('status', 'published')
            ->pluck('tags')
            ->flatten()
            ->unique()
            ->values()
            ->all();

        return Inertia::render('blog/index', [
            'posts' => $posts,
            'comingSoon' => $comingSoon,
            'allTags' => $allTags,
        ]);
    }

    public function show(string $slug)
    {
        $post = Post::where('slug', $slug)
            ->where('status', 'published')
            ->where('published_at', '<=', now()) // On ne montre pas le futur
            ->firstOrFail();

        return Inertia::render('blog/show', [
            'post' => $post,
            'user'=>$post->user,
        ]);
    }
}
