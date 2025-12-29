<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index() {
        return Inertia::render('dashboard/add-post');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => ['required', 'string', 'min:2', 'max:255'],
            'description' => ['required', 'string', 'min:2', 'max:255'],
            'content' => ['required', 'string'],
            'tags' => ['required', 'array', 'min:1'],
        ]);

        Post::create([
            'title'       => $validated['title'],
            'description' => $validated['description'],
            'slug'        => Str::slug($validated['title']),
            'content'     => $validated['content'],
            'tags'        => $validated['tags'],
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('dashboard')->with('success', 'Article créé !');
    }
}
