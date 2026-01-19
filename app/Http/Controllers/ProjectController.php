<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function list()
    {
        $projects = Project::published()->latest()->get();

        return Inertia::render('projects/index',[
            'projects' => $projects,
        ]);
    }

    public function show($slug)
    {
        // On récupère le projet ou 404
        $project = Project::published()
            ->where('slug', $slug)
            ->firstOrFail();

        // Idem pour les projets similaires : ils doivent être publiés
        $relatedProjects = Project::published()
            ->where('category', $project->category)
            ->where('id', '!=', $project->id)
            ->take(2)
            ->get();

        return Inertia::render('projects/show',[
            'project' => $project,
            'relatedProjects' => $relatedProjects
        ]);
    }
}
