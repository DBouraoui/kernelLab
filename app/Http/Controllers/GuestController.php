<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Project;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function home() {

        $posts = Post::published()->latest()->take(4)->get();

        $featuredProjects = Project::published()
            ->where('is_featured', true)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('home/index', [
            'posts' => $posts,
            'projects' => $featuredProjects,
        ]);
    }
    public function contact() {
        return Inertia::render('contact/index');
    }

    public function about() {
        return Inertia::render('about/index');
    }
}
