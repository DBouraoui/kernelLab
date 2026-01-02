<?php

use App\Http\Controllers\admin\AdminContactController;
use App\Http\Controllers\admin\AdminPostController;
use App\Http\Controllers\admin\AdminProjectController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GuestController;
use Illuminate\Support\Facades\Route;

// --- Routes Publiques (Guest) ---
Route::controller(GuestController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/about', 'about')->name('about');
});

Route::controller(BlogController::class)->group(function () {
    Route::get('/blog', 'index')->name('blog');
});

// --- Routes Contact ---
Route::controller(ContactController::class)->group(function () {
    Route::get('/contact', 'index')->name('contact');
    Route::post('/contact', 'store')->name('contact.store');
});

// --- Routes Protégées (Auth) ---
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Groupe spécifique pour les Posts avec préfixe d'URL et de Nom
    Route::prefix('dashboard')->group(function () {

        Route::controller(AdminPostController::class)->group(function () {
            Route::get('/post/view', 'list')->name('admin.post.list');
            Route::get('/post/add', 'create')->name('admin.post.create');
            Route::get('/post/edit/{id}', 'edit')->name('admin.post.edit');

            Route::patch('/post/{id}', 'update')->name('admin.post.update');
            Route::post('/store', 'store')->name('admin.post.store');
            Route::delete('/post/{id}', 'delete')->name('admin.post.delete');

            Route::post('/upload-images', 'uploadImages');
            Route::post('/upload-thumbnail', 'uploadThumbnail');
            Route::post('/delete-thumbnail', 'deleteThumbnail');
            Route::post('/delete-image', 'deleteImage');
        });

        Route::controller(AdminContactController::class)->group(function () {
            Route::get('/contact', 'index')->name('admin.contact');
            Route::delete('/contact/{id}', 'destroy')->name('admin.contact.delete');
        });

        Route::controller(AdminProjectController::class)->group(function () {
           Route::get('/project', 'index')->name('admin.project.index');
            Route::get('/project/add', 'create')->name('admin.project.create');
            Route::get('/project/{id}/edit', 'edit')->name('admin.project.edit');
            Route::post('/project', 'store')->name('admin.project.store');
            Route::put('/project/{id}', 'update')->name('admin.project.update');
            Route::delete('/project/{id}', 'destroy')->name('admin.project.delete');
            Route::patch('/project/{id}/toggle-featured', 'toggleFeatured')->name('admin.project.toggleFeatured');
        });
    });
});

require __DIR__.'/settings.php';
