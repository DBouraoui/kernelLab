import {  ExternalLink, Terminal, Globe, LayoutIcon, Code2, Cpu, Rocket } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectType } from '@/types';
import { Link } from '@inertiajs/react';

const CATEGORY_UI: Record<string, { gradient: string, icon: any }> = {
    devops: { gradient: "from-orange-500 to-red-600", icon: Terminal },
    web: { gradient: "from-blue-600 to-cyan-500", icon: LayoutIcon },
    cloud: { gradient: "from-indigo-600 to-purple-500", icon: Globe },
    saas: { gradient: "from-emerald-500 to-teal-600", icon: Rocket },
    mobile: { gradient: "from-pink-500 to-rose-600", icon: Cpu },
};

export default function ProjectsSection({ projects }: { projects: ProjectType[] | Record<string, ProjectType> }) {

    const projectsArray = Array.isArray(projects)
        ? projects
        : Object.values(projects || {});

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] bg-blue-500/5 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] bg-orange-500/5 blur-[100px] rounded-full" />

            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Projets <span className="text-muted-foreground font-light">Mis en avant</span>
                        </h2>
                        <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-orange-500 mt-4 rounded-full" />
                    </div>
                    <Link href="/projects">
                        <Button variant="outline" className="rounded-full gap-2 border-2">
                            Voir le portfolio
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsArray.length > 0 ? projectsArray.map((project) => {
                        const ui = CATEGORY_UI[project.category] || { gradient: "from-gray-500 to-gray-700", icon: Code2 };
                        const Icon = ui.icon;

                        return (
                            <div
                                key={project.id}
                                className="group relative flex flex-col justify-between p-8 rounded-[2.5rem] border bg-card/50 hover:border-transparent transition-all duration-500"
                            >
                                <div className={`absolute inset-0 rounded-[2.5rem] p-[2px] bg-gradient-to-br ${ui.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 shadow-xl shadow-primary/10`} />
                                <div className="absolute inset-0 rounded-[2.5rem] bg-card -z-10" />

                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${ui.gradient} shadow-lg shadow-primary/20`}>
                                            <Icon className="h-5 w-5 text-white" />
                                        </div>
                                        <Badge variant="outline" className="capitalize border-none bg-muted/50 text-[10px] font-bold">
                                            {project.category}
                                        </Badge>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-1 transition-transform">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                                        {project.description_short}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.stack?.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="bg-muted/80 font-semibold text-[10px] uppercase tracking-wider">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all text-primary"
                                    >
                                        Découvrir l'étude de cas
                                        <ExternalLink className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        );
                    }) : (
                        <p className="text-muted-foreground italic col-span-full text-center">Aucun projet mis en avant pour le moment.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
