<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminContactController extends Controller
{
    public function index() {
        return Inertia::render('admin/contact/index');
    }
}

//todo crud pour les messages et envoie par email automatique a chaque message recus
