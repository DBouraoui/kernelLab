<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    public function create() {
        return Inertia::render('posts/create');
    }
    public function list()
    {
        // Utiliser orderBy au lieu de sortByDesc pour meilleures performances
        $posts = Post::orderBy('created_at', 'desc')->get();

        return Inertia::render('posts/list', compact('posts'));
    }


    public function delete(int $id)
    {
        $post = Post::findOrFail($id);

        $post->delete();

        return redirect()
            ->route('post.list')
            ->with('success', 'Article supprimé avec succès');
    }
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => ['required', 'string', 'min:2', 'max:255'],
            'description' => ['required', 'string', 'min:2', 'max:255'],
            'content' => ['required', 'string'],
            'tags' => ['required', 'array', 'min:1'],
            'image' => 'nullable|array',
        ]);

        Post::create([
            'title'       => $validated['title'],
            'description' => $validated['description'],
            'slug'        => Str::slug($validated['title']),
            'content'     => $validated['content'],
            'tags'        => $validated['tags'],
            'image'       => $validated['image'],
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('dashboard')->with('success', 'Article créé !');
    }

    public function uploadImages(Request $request)
    {
        $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        $urls = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // On stocke dans storage/app/public/posts
                $path = $image->store('posts', 'public');
                // On génère l'URL publique
                $urls[] = Storage::url($path);
            }
        }

        return response()->json(['urls' => $urls]);
    }

    public function deleteImage(Request $request)
    {
        $url = $request->url;
        $path = Str::after($url, '/storage/');

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            return response()->json(['message' => 'Fichier supprimé']);
        }

        return response()->json(['message' => 'Fichier introuvable'], 404);
    }
}
