<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminContactController extends Controller
{
//todo crud pour les messages et envoie par email automatique a chaque message recus
    public function index() {

        $contacts = Contact::all()->sortByDesc('created_at');

        return Inertia::render('admin/contact/index', compact('contacts'));
    }

    public function destroy(int $id) {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return redirect()->route('admin.contact')->with('success');
    }
}

