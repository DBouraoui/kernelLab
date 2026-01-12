import { ArrowRight, Clock, CalendarDays, Cloud, Globe, Smartphone, Github, Rocket, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { PostInterface } from '@/types';
import { blog } from '@/routes';
import { formatDate } from '@/types/utils';
import { Link } from '@inertiajs/react'; // Important pour Inertia

// Configuration définie en dehors du composant pour la performance
const CATEGORY_CONFIG: Record<string, { label: string, style: string, icon: any }> = {
    devops: {
        label: "DevOps & Cloud",
        style: "from-blue-600/20 to-cyan-500/20 shadow-blue-500",
        icon: Cloud
    },
    web: {
        label: "Développement Web",
        style: "from-purple-600/20 to-pink-500/20 shadow-purple-500/20",
        icon: Globe
    },
    mobile: {
        label: "Mobile App",
        style: "from-orange-500/20 to-yellow-500/20 shadow-orange-500/20",
        icon: Smartphone
    },
    opensource: {
        label: "Open Source",
        style: "from-emerald-600/20 to-teal-500/20 shadow-emerald-500/20",
        icon: Github
    },
    saas: {
        label: "SaaS Product",
        style: "from-indigo-600/20 to-blue-500/20 shadow-indigo-500/20",
        icon: Rocket
    },
    // Fallback par défaut
    default: {
        label: "Article",
        style: "from-gray-600/20 to-gray-400/20 shadow-gray-500/20",
        icon: Tag
    }
};

export function Articles({ posts }: { posts: PostInterface[] }) {
    // Sécurité : on s'assure que c'est bien un tableau
    const postArray = Array.isArray(posts) ? posts : Object.values(posts);

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            {/* --- AMBIENT GLOW --- */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[500px] w-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 h-[400px] w-[400px] bg-blue-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

            <div className="container px-4 mx-auto">
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <div className="max-w-2xl space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                            <Rocket className="h-3 w-3" />
                            Blog Tech
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            Derniers <span className="text-muted-foreground font-light">Articles</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Analyses approfondies, tutoriels et réflexions sur l'écosystème Laravel, React et DevOps.
                        </p>
                    </div>

                    <Link href={blog().url}>
                        <Button variant="outline" className="rounded-full h-12 px-6 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group">
                            Voir tous les articles
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {/* --- GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postArray.map((article : any) => {
                        const catKey = Array.isArray(article.category) ? article.category[0] : article.category;
                        const config = CATEGORY_CONFIG[catKey?.toLowerCase()] || CATEGORY_CONFIG.default;
                        const Icon = config.icon;

                        return (
                            <Link
                                key={article.id || article.title}
                                href={blog().url + "/" + article.slug}
                                className="group relative flex flex-col h-full rounded-[2rem] bg-card border border-border/50 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
                            >
                                {/* BORDURE GRADIENT DYNAMIQUE AU HOVER */}
                                <div className={`absolute inset-0 rounded-[2rem] p-[2px] bg-gradient-to-br ${config.style} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                                {/* --- IMAGE / COVER --- */}
                                <div className="relative h-56 w-full overflow-hidden bg-muted/30">
                                    {article.image ? (
                                        <img
                                            src={article.thumbnail}
                                            alt={article.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        // Fallback élégant si pas d'image : un gradient avec l'icône géante
                                        <div className={`h-full w-full bg-gradient-to-br ${config.style} opacity-10 flex items-center justify-center group-hover:opacity-20 transition-opacity`}>
                                            <Icon className={`h-24 w-24 text-foreground/20 group-hover:scale-110 transition-transform duration-700`} />
                                        </div>
                                    )}

                                    {/* Badge positionné sur l'image */}
                                    <div className="absolute top-4 left-4">
                                        <Badge
                                            className={`
                                                border-0 bg-background/80 backdrop-blur-md text-foreground
                                                hover:bg-background font-bold px-3 py-1.5 rounded-full text-[10px]
                                                uppercase tracking-wider flex items-center gap-2 shadow-sm
                                            `}
                                        >
                                            <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${config.style}`} />
                                            {config.label}
                                        </Badge>
                                    </div>
                                </div>

                                {/* --- CONTENU --- */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>

                                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-8 flex-1">
                                        {article.description}
                                    </p>

                                    {/* Footer de la carte */}
                                    <div className="pt-6 border-t border-border/40 flex justify-between items-center text-xs font-medium text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="h-3.5 w-3.5" />
                                            {formatDate(article.published_at)}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-secondary/50">
                                            <Clock className="h-3.5 w-3.5" />
                                            {article.reading_time || '5'} min
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
