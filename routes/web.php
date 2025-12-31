<?php

use App\Http\Controllers\admin\AdminContactController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

// --- Routes Publiques (Guest) ---
Route::controller(GuestController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/blog', 'blog')->name('blog');
    Route::get('/about', 'about')->name('about');
});

// --- Routes Contact ---
Route::controller(ContactController::class)->group(function () {
    Route::get('/contact', 'index')->name('contact');
    Route::post('/contact', 'store')->name('contact.store');
});

// --- Routes Protégées (Auth) ---
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Groupe spécifique pour les Posts avec préfixe d'URL et de Nom
    Route::prefix('dashboard')->group(function () {

        Route::controller(PostController::class)->group(function () {
            Route::get('/post/view', 'list')->name('admin.post.list');
            Route::get('/post/add', 'create')->name('admin.post.create');
            Route::patch('/post/{id}', 'update')->name('admin.post.update');
            Route::post('/store', 'store')->name('admin.post.store');
            Route::delete('/post/{id}', 'delete')->name('admin.post.delete');

            // Routes utilitaires (sans name spécifique dans ton code d'origine)
            Route::post('/upload-images', 'uploadImages');
            Route::post('/delete-image', 'deleteImage');
        });

        Route::controller(AdminContactController::class)->group(function () {
            Route::get('/contact', 'index')->name('admin.contact');
            Route::delete('/contact/{id}', 'destroy')->name('admin.contact.delete');
        });
    });
});

require __DIR__.'/settings.php';
