import React, { useState, useMemo } from 'react';
import { ProjectType } from '@/types';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink, Code2, Rocket } from "lucide-react";

// On réutilise ton mapping catégorie pour la cohérence
const CATEGORY_STYLES: Record<string, string> = {
    devops: "from-blue-600 to-cyan-500 shadow-blue-500/20",
    web: "from-purple-600 to-pink-500 shadow-purple-500/20",
    mobile: "from-orange-500 to-yellow-500 shadow-orange-500/20",
    opensource: "from-emerald-600 to-teal-500 shadow-emerald-500/20",
    saas: "from-indigo-600 to-blue-500 shadow-indigo-500/20",
    cloud: "from-sky-500 to-blue-700 shadow-sky-500/20"
};

export default function ProjectsPage({ projects }: { projects: ProjectType[] }) {
    const [filter, setFilter] = useState<string>('all');
    console.log(projects);

    // Récupérer toutes les stacks uniques pour le filtrage
    const allStacks = useMemo(() => {
        const stacks = projects.flatMap(p => p.stack);
        return Array.from(new Set(stacks)).sort();
    }, [projects]);

    const filteredProjects = projects.filter(p =>
        filter === 'all' || p.category === filter || p.stack.includes(filter)
    );

    return (
        <GuestLayout>
            <Head title="Portfolio — Mes réalisations techniques" />

            <div className="min-h-screen bg-background py-20 px-4">
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* --- HEADER --- */}
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <Badge variant="outline" className="px-4 py-1 border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-tighter">
                            Showcase
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                            Mes <span className="text-muted-foreground">Projets</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Une sélection de mes travaux en développement Full-Stack, architectures Cloud et outils Open Source.
                        </p>
                    </div>

                    {/* --- FILTRES --- */}
                    <div className="flex flex-wrap justify-center gap-2 pb-8 border-b border-border/50">
                        <Button
                            variant={filter === 'all' ? 'default' : 'outline'}
                            onClick={() => setFilter('all')}
                            className="rounded-full"
                        >
                            Tous
                        </Button>
                        {['devops', 'web', 'mobile', 'saas'].map((cat) => (
                            <Button
                                key={cat}
                                variant={filter === cat ? 'default' : 'outline'}
                                onClick={() => setFilter(cat)}
                                className="rounded-full capitalize"
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {/* --- GRID AVEC FALLBACK --- */}
                    {filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project) => (
                                <Card key={project.id} className="group relative border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[2rem]">

                                    {/* Image / Preview area */}
                                    <div className="relative aspect-video overflow-hidden">
                                        {project.thumbnail_url ? (
                                            <img src={project.thumbnail_url} alt={project.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${CATEGORY_STYLES[project.category]} opacity-20 flex items-center justify-center`}>
                                                <Code2 className="h-12 w-12 text-foreground/40" />
                                            </div>
                                        )}

                                        {/* Overlay de liens au hover */}
                                        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                            {project.github_url && (
                                                <Button size="icon" variant="outline" className="rounded-full bg-background" asChild>
                                                    <a href={project.github_url} target="_blank"><Github className="h-5 w-5" /></a>
                                                </Button>
                                            )}
                                            {project.live_url && (
                                                <Button size="icon" className="rounded-full" asChild>
                                                    <a href={project.live_url} target="_blank"><ExternalLink className="h-5 w-5" /></a>
                                                </Button>
                                            )}
                                            <Button variant="secondary" className="rounded-full" asChild>
                                                <Link href={`/projects/${project.slug}`}>Détails</Link>
                                            </Button>
                                        </div>

                                        {project.is_featured && (
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-yellow-500 text-black font-bold border-0 flex gap-1 items-center shadow-lg">
                                                    <Rocket className="h-3 w-3" /> Featured
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    <CardContent className="p-8 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <Badge variant="outline" className={`border-2 bg-gradient-to-r ${CATEGORY_STYLES[project.category]} text-white font-bold px-3 py-0.5 rounded-full text-[10px] uppercase tracking-wider`}>
                                                {project.category}
                                            </Badge>
                                        </div>

                                        <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-muted-foreground text-sm line-clamp-2 italic">
                                            {project.description_short}
                                        </p>

                                        {/* Stack Tags */}
                                        <div className="flex flex-wrap gap-1.5 pt-4">
                                            {project.stack.map(tech => (
                                                <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        // --- MINI FALLBACK ---
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="bg-muted/50 p-6 rounded-full mb-4">
                                <Code2 className="h-10 w-10 text-muted-foreground/50" />
                            </div>
                            <h2 className="text-2xl font-bold">Aucun projet pour le moment</h2>
                            <p className="text-muted-foreground mt-2">La documentation de mes réalisations est en cours.</p>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
