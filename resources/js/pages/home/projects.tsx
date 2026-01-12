import {
    Github,
    Star,
    ExternalLink,
    Terminal,
    Globe,
    LayoutIcon,
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProjectsSection() {
    const projects = [
        {
            title: "Kube-Fast-Deploy",
            description: "Un moteur de déploiement CI/CD ultra-léger pour Kubernetes. Automatise le Blue-Green deployment sans la complexité de Spinnaker.",
            tags: ["Go", "Kubernetes", "gRPC"],
            stars: "245",
            forks: "32",
            type: "DevOps Tool",
            icon: <Terminal className="h-5 w-5 text-white" />,
            gradient: "from-orange-500 to-red-600",
            link: "#"
        },
        {
            title: "React-Architecture-Kit",
            description: "Un template Clean Architecture pour Next.js 14. Inclus : Type-safe API, module de gestion d'état et tests E2E pré-configurés.",
            tags: ["TypeScript", "Next.js", "Zustand"],
            stars: "189",
            forks: "14",
            type: "Frontend Lib",
            icon: <LayoutIcon className="h-5 w-5 text-white" />,
            gradient: "from-blue-600 to-cyan-500",
            link: "#"
        },
        {
            title: "Cloud-Sizer-Pro",
            description: "Analyseur de coûts d'infrastructure Cloud en temps réel. Supporte AWS et GCP pour identifier les ressources sous-utilisées.",
            tags: ["Python", "AWS", "Terraform"],
            stars: "92",
            forks: "8",
            type: "Cloud Optimization",
            icon: <Globe className="h-5 w-5 text-white" />,
            gradient: "from-indigo-600 to-purple-500",
            link: "#"
        }
    ]

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Rappel de couleur très léger en fond de section pour l'ambiance */}
            <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] bg-blue-500/5 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] bg-orange-500/5 blur-[100px] rounded-full"></div>

            <div className="container px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Projets <span className="text-muted-foreground font-light">Open Source</span>
                        </h2>
                        <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-orange-500 mt-4 rounded-full" />
                    </div>
                    <Button variant="outline" className="rounded-full gap-2 border-2 hover:bg-foreground hover:text-background transition-all">
                        <Github className="h-5 w-5" />
                        GitHub
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.title}
                            className="group relative flex flex-col justify-between p-8 rounded-[2.5rem] border bg-card/50 hover:border-transparent transition-all duration-500"
                        >
                            {/* BORDURE GRADIENT AU HOVER (Effet magique) */}
                            <div className={`absolute inset-0 rounded-[2.5rem] p-[2px] bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 shadow-xl shadow-primary/10`} />
                            <div className="absolute inset-0 rounded-[2.5rem] bg-card -z-10" />

                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    {/* ICON AVEC DEGRADE */}
                                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.gradient} shadow-lg shadow-primary/20`}>
                                        {project.icon}
                                    </div>
                                    <div className="flex gap-3">
                                        <Badge variant="outline" className="gap-1 border-none bg-muted/50">
                                            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                                            {project.stars}
                                        </Badge>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-1 transition-transform">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {project.description}
                                </p>
                            </div>

                            <div>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="bg-muted/80 font-semibold text-[10px] uppercase tracking-wider">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <a
                                    href={project.link}
                                    className={`inline-flex items-center gap-2 text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r ${project.gradient} hover:gap-3 transition-all`}
                                >
                                    View Repository
                                    <ExternalLink className="h-4 w-4 text-orange-500" style={{ color: 'inherit' }} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
