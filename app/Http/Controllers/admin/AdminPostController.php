<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminPostController extends Controller
{
    public function list()
    {
        $posts = Post::orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/posts/list', compact('posts'));
    }

    public function create()
    {
        return Inertia::render('admin/posts/create');
    }

    public function delete(int $id)
    {
        $post = Post::findOrFail($id);

        if (!empty($post->image) && is_array($post->image)) {
            foreach ($post->image as $url) {
                $path = Str::after($url, '/storage/');

                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }
        }

        $post->delete();

        return redirect()
            ->route('admin.post.list')
            ->with('success', 'Article supprimé avec succès');
    }

    /**
     * @param Request $request
     * @param int $id
     * @return RedirectResponse
     */
    public function update(Request $request, int $id)
    {
        $post = Post::findOrFail($id);

        $post->update([
            'title' => $request->title,
            'description' => $request->description,
            'content' => $request->content,
        ]);

        return redirect()
            ->route('admin.post.list')
            ->with('success', 'Article modifié avec succès');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => ['required', 'string', 'min:2', 'max:255'],
            'description' => ['required', 'string', 'min:2', 'max:255'],
            'content' => ['required', 'string'],
            'tags' => ['required', 'array', 'min:1'],
            'image' => 'nullable|array',
            'reading_time' => ['required', 'numeric', 'min:0'],
            'status' => ['required', 'in:draft,published,archived'],
        ]);

        Post::create([
            'title'       => $validated['title'],
            'description' => $validated['description'],
            'slug'        => Str::slug($validated['title']),
            'content'     => $validated['content'],
            'tags'        => $validated['tags'],
            'image'       => $validated['image'],
            'reading_time' => $validated['reading_time'],
            'status'      => $validated['status'],
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

    public function uploadThumbnail(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:3072'
        ]);

        if ($request->hasFile('image')) {
            // On stocke dans un dossier spécifique pour les couvertures
            $path = $request->file('image')->store('posts/thumbnails', 'public');
            $url = Storage::url($path);

            return response()->json(['url' => $url]);
        }

        return response()->json(['error' => 'No image provided'], 400);
    }

    public function deleteThumbnail(Request $request)
    {
        $url = $request->url;

        $path = Str::after($url, '/storage/');

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            return response()->json(['message' => 'Thumbnail supprimé du serveur']);
        }

        return response()->json(['message' => 'Fichier introuvable'], 404);
    }
}
