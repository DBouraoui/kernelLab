<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class GuestController extends Controller
{
    public function home() {
        return Inertia::render('home/index');
    }

    public function blog() {
        return Inertia::render('blog/index');
        //todo faire un flux rss pour les articles
    }

    public function contact() {
        return Inertia::render('contact/index');
    }

    public function about() {
        return Inertia::render('about/index');
    }
}
