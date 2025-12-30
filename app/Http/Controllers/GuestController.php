<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function home() {
        return Inertia::render('welcome');
    }

    public function blog() {
        return Inertia::render('blog');
    }
}
