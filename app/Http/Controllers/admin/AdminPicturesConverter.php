<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Str;

class AdminPicturesConverter extends Controller
{
    // Affiche la page
    public function index()
    {
        return Inertia::render('admin/picture-converter/index');
    }

    // Traite la conversion
    public function convert(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:10240',
            'width' => 'nullable|integer|min:100|max:3840', // Optionnel
        ]);

        $file = $request->file('image');
        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        // Lecture de l'image
        $image = Image::read($file);

        // 1. REDIMENSIONNEMENT AUTOMATIQUE (Scale)
        // On fixe une largeur max de 1920px (Full HD) par défaut si rien n'est fourni.
        // La méthode scale() conserve le ratio d'aspect.
        $maxWidth = $request->input('width', 1920);
        if ($image->width() > $maxWidth) {
            $image->scale(width: $maxWidth);
        }

        // 2. ENCODAGE & SUPPRESSION METADATA
        // L'encodeur WebpEncoder supprime par défaut les profils ICC et données EXIF.
        $encoded = $image->encode(new WebpEncoder(quality: 75));

        return response()->streamDownload(function() use ($encoded) {
            echo $encoded;
        }, \Str::slug($filename) . '.webp', [
            'Content-Type' => 'image/webp',
        ]);
    }
}
