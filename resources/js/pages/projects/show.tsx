import React from 'react';
import { ProjectType } from '@/types';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Github,
    ExternalLink,
    ArrowLeft,
    Calendar,
    Layers,
    CheckCircle2,
    Code2
} from "lucide-react";
import MarkdownViewer from '@/components/markdown-viewer';

export default function ProjectShow({ project, relatedProjects }: { project: ProjectType, relatedProjects: ProjectType[] }) {

    return (
        <GuestLayout>
            <Head title={`${project.title} — Portfolio`} />

            <div className="min-h-screen bg-background pb-20">
                {/* --- HERO SECTION --- */}
                <div className="relative h-[60vh] w-full overflow-hidden border-b">
                    {project.thumbnail_url ? (
                        <img
                            src={project.thumbnail_url}
                            className="w-full h-full object-cover"
                            alt={project.title}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                            <Code2 className="h-24 w-24 text-white/10" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                        <div className="max-w-7xl mx-auto space-y-4">
                            <Link
                                href="/projects"
                                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux projets
                            </Link>
                            <div className="flex items-center gap-3">
                                <Badge className="bg-primary/10 text-primary border-primary/20 capitalize px-4">
                                    {project.category}
                                </Badge>
                                {project.is_featured && (
                                    <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                                        Projet Majeur
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-4xl">
                                {project.title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT SECTION --- */}
                <div className="max-w-7xl mx-auto px-8 md:px-16 mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Colonne de gauche : Contenu principal (8 colonnes) */}
                        <div className="lg:col-span-8 space-y-12">
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">À propos du projet</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {project.description_short}
                                </p>
                            </section>

                            {/* Rendu du contenu (Markdown ou HTML) */}
                            <MarkdownViewer content={project.content} />
                        </div>

                        {/* Colonne de droite : Sidebar (4 colonnes) */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-24 space-y-6">

                                {/* Liens d'action */}
                                <div className="flex flex-col gap-3 p-6 rounded-3xl bg-card border border-border/50 shadow-sm">
                                    <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-2">Liens directs</h3>
                                    {project.live_url && (
                                        <Button className="w-full justify-between h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20" asChild>
                                            <a href={project.live_url} target="_blank">
                                                Voir le projet <ExternalLink className="h-5 w-5" />
                                            </a>
                                        </Button>
                                    )}
                                    {project.github_url && (
                                        <Button variant="outline" className="w-full justify-between h-12 rounded-xl" asChild>
                                            <a href={project.github_url} target="_blank">
                                                Code Source <Github className="h-5 w-5" />
                                            </a>
                                        </Button>
                                    )}
                                </div>

                                {/* Stack Technique */}
                                <div className="p-6 rounded-3xl bg-muted/30 border border-border/50">
                                    <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                                        <Layers className="h-4 w-4" /> Stack Technique
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.stack.map(tech => (
                                            <div key={tech} className="flex items-center gap-1.5 bg-background border px-3 py-1.5 rounded-lg text-sm font-medium">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Infos projet */}
                                <div className="px-6 space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <Calendar className="h-4 w-4" /> Publié le
                                        </span>
                                        <span className="font-medium">
                                            {new Date(project.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <Code2 className="h-4 w-4" /> Statut
                                        </span>
                                        <Badge variant="secondary" className="rounded-md uppercase text-[10px]">
                                            {project.status}
                                        </Badge>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
