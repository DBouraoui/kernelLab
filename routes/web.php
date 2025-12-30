<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;


Route::get('/', [GuestController::class, 'home'])->name('home');
Route::get('/blog', [GuestController::class, 'blog'])->name('blog');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


    Route::get('/dashboard/post/view', [PostController::class, 'list'])->name('post.list');
    Route::get('/dashboard/post/add', [PostController::class, 'create'])->name('post.create');
    Route::patch('/dashboard/post/{id}', [PostController::class, 'update'])->name('post.update');
    Route::post('/dashboard/store', [PostController::class, 'store'])->name('post.store');
    Route::delete('/dashboard/post/{id}', [PostController::class, 'delete'])->name('post.delete');
    Route::post('/dashboard/upload-images', [PostController::class, 'uploadImages']);
    Route::post('/dashboard/delete-image', [PostController::class, 'deleteImage']);
});

require __DIR__.'/settings.php';
