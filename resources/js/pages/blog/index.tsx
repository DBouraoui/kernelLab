import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, CalendarDays, Sparkles } from 'lucide-react';

// Supposons que tu as un layout public pour ton blog
// Si ce n'est pas le cas, tu peux juste utiliser un div pour commencer.
import GuestLayout from '@/layouts/guest-layout';
import { Button } from '@/components/ui/button'; // Ou crée un PublicLayout si tu préfères

interface Post {
    id: number;
    title: string;
    description: string;
    slug: string; // Pour les URLs propres
    thumbnail: string | null;
    tags: string[];
    reading_time: string;
    created_at: string;
    updated_at: string;
}

interface BlogIndexProps {
    posts: Post[];
    comingSoon: Post[];
    allTags: string[]; // Tous les tags disponibles pour le filtre
}

export default function BlogIndex({ posts, comingSoon, allTags }: BlogIndexProps) {
    // --- Logic pour les filtres et la recherche (à implémenter) ---
    const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredPosts = posts.filter(post => {
        const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
        const matchesSearch = searchQuery
            ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            : true;
        return matchesTag && matchesSearch;
    });

    const latestPost = filteredPosts[0];
    const otherPosts = filteredPosts.slice(1);

    return (
        // Utilise ton layout public ici
        <GuestLayout>
            <Head title="Blog Tech | Votre Nom" />

            <div className="container max-w-5xl mx-auto py-12 px-4">
                {/* HERO SECTION */}
                <section className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                        Le Blog Tech qui démystifie le dev
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Tutoriels, astuces et retours d'expériences sur Laravel, React, Vue.js, et bien plus encore.
                    </p>
                </section>

                {/* FILTRES PAR TAGS */}
                {allTags.length > 0 && (
                    <section className="mb-12 flex flex-wrap justify-center gap-3">
                        <Badge
                            variant={selectedTag === null ? "default" : "secondary"}
                            className="cursor-pointer px-4 py-1.5 text-base"
                            onClick={() => setSelectedTag(null)}
                        >
                            Tout
                        </Badge>
                        {allTags.map(tag => (
                            <Badge
                                key={tag}
                                variant={selectedTag === tag ? "default" : "outline"}
                                className="cursor-pointer px-4 py-1.5 text-base hover:bg-primary hover:text-primary-foreground"
                                onClick={() => setSelectedTag(tag)}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </section>
                )}

                {comingSoon.length > 0 && (
                    <section className="mb-20">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
                            <h2 className="text-2xl font-bold tracking-tight">En cours de rédaction</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {comingSoon.map((draft) => (
                                <div key={draft.id} className="relative group opacity-70 grayscale-[0.5]">
                                    <Card className="border-dashed border-2 bg-muted/20 shadow-none overflow-hidden">
                                        <div className="aspect-video bg-muted/50 flex items-center justify-center overflow-hidden">
                                            {draft.thumbnail ? (
                                                <img
                                                    src={draft.thumbnail}
                                                    className="object-cover w-full h-full blur-[2px]"
                                                    alt="Draft"
                                                />
                                            ) : (
                                                <Sparkles className="h-8 w-8 text-muted-foreground/20" />
                                            )}
                                            <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                                                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-dashed">
                                                    Bientôt disponible
                                                </Badge>
                                            </div>
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="h-5 w-3/4 bg-muted rounded mb-2 animate-pulse" />
                                            <h3 className="font-semibold text-muted-foreground line-clamp-1 italic">
                                                {draft.title}
                                            </h3>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* FEATURED POST (le plus récent) */}
                {latestPost && (
                    <section className="mb-16">
                        <Link href={`/blog/${latestPost.slug}`} className="block group">
                            <Card className="flex flex-col md:flex-row border-none shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-2xl">
                                <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden bg-muted">
                                    {latestPost.thumbnail ? (
                                        <img
                                            src={latestPost.thumbnail}
                                            alt={latestPost.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground/30">
                                            <CalendarDays className="h-16 w-16" />
                                        </div>
                                    )}
                                </div>
                                <CardContent className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {latestPost.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="text-sm">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                                        {latestPost.title}
                                    </h2>
                                    <p className="text-lg text-muted-foreground mb-4 line-clamp-3">
                                        {latestPost.description}
                                    </p>
                                    <div className="flex items-center text-sm text-muted-foreground gap-4 mt-auto">
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="h-4 w-4" />
                                            {new Date(latestPost.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {latestPost.reading_time || '5 min'} min de lecture
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </section>
                )}

                <Separator className="mb-12" />

                {/* AUTRES ARTICLES (GRILLE SIMPLE) */}
                {otherPosts.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold mb-8 text-center">Nos Derniers Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherPosts.map(post => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                                    <Card className="h-full flex flex-col border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl">
                                        <div className="aspect-video overflow-hidden bg-muted">
                                            {post.thumbnail ? (
                                                <img
                                                    src={post.thumbnail}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-muted-foreground/30">
                                                    <CalendarDays className="h-10 w-10" />
                                                </div>
                                            )}
                                        </div>
                                        <CardContent className="p-4 flex-grow flex flex-col">
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {post.tags.slice(0, 2).map(tag => (
                                                    <Badge key={tag} variant="secondary" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                                                {post.description}
                                            </p>
                                            <div className="flex items-center text-xs text-muted-foreground gap-4 mt-auto border-t pt-3">
                                                <span className="flex items-center gap-1">
                                                    <CalendarDays className="h-3 w-3" />
                                                    {new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {post.reading_time || '3 min'}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Aucun article trouvé */}
                {filteredPosts.length === 0 && (
                    <section className="text-center py-20">
                        <h2 className="text-2xl font-bold mb-4">Aucun article trouvé</h2>
                        <p className="text-muted-foreground">Essayez d'ajuster vos filtres ou votre recherche.</p>
                        <Button variant="link" onClick={() => { setSelectedTag(null); setSearchQuery(''); }} className="mt-4">
                            Réinitialiser la recherche
                        </Button>
                    </section>
                )}
            </div>
        </GuestLayout>
    );
}
