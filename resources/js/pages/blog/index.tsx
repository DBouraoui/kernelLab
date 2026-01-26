import React, { useMemo } from 'react';
import { BlogIndexProps } from '@/types';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { Hash, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FeaturedPost } from '@/pages/blog/featuredPost';
import { PostCard } from '@/pages/blog/postCard';
import { Separator } from '@radix-ui/react-select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function BlogIndex({ posts, comingSoon, allTags }: BlogIndexProps) {
    const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
            const matchesSearch = searchQuery
                ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                : true;
            return matchesTag && matchesSearch;
        });
    }, [posts, selectedTag, searchQuery]);

    const publishedPosts = useMemo(() => {
        const now = new Date();
        return filteredPosts.filter(post => {
            const publishDate = new Date(post.published_at);
            return publishDate <= now;
        });
    }, [filteredPosts]);

    const latestPost = !selectedTag && !searchQuery ? publishedPosts[0] : null;
    const gridPosts = latestPost
        ? filteredPosts.filter(p => p.id !== latestPost.id)
        : filteredPosts;

    // todo faire les posts similaire en fonction des tags du post
    // todo ajouter le nombre de vue a l'articles
    return (
        <GuestLayout>
            <Head title="Blog Tech | Articles & Tutoriels" />

            <div className="min-h-screen bg-background pb-20">
                <div className="container max-w-6xl mx-auto px-4 sm:px-6 pt-12 md:pt-20">

                    {/* --- HERO SECTION --- */}
                    <section className="text-center mb-16 space-y-6">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            ✨ Nouveau contenu chaque semaine
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                            Explorez l'univers <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Dev & Tech</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Des articles approfondis, des tutoriels pratiques et des réflexions sur l'écosystème Laravel, React et l'architecture logicielle.
                        </p>
                    </section>

                    {/* --- FILTER BAR (MODERNE) --- */}
                    <section className="sticky top-4 z-30 mb-12">
                        <div className="bg-background/80 backdrop-blur-xl border border-border/50 shadow-sm rounded-2xl p-2 flex flex-col md:flex-row gap-4 items-center">
                            {/* Search Input */}
                            <div className="relative w-full md:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher un article..."
                                    className="pl-9 bg-muted/50 border-transparent focus:bg-background transition-all rounded-xl"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Divider on desktop */}
                            <div className="hidden md:block w-px h-8 bg-border/50 mx-2" />

                            {/* Tags Scrollable */}
                            <div className="flex-1 w-full overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                                <div className="flex gap-2">
                                    <Button
                                        variant={selectedTag === null ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setSelectedTag(null)}
                                        className="rounded-lg font-medium"
                                    >
                                        Tous
                                    </Button>
                                    {allTags.map(tag => (
                                        <Button
                                            key={tag}
                                            variant={selectedTag === tag ? "secondary" : "ghost"}
                                            size="sm"
                                            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                            className={`rounded-lg whitespace-nowrap ${selectedTag === tag ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200' : 'text-muted-foreground'}`}
                                        >
                                            <Hash className="h-3 w-3 mr-1 opacity-50" />
                                            {tag}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- FEATURED POST --- */}
                    {latestPost && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <FeaturedPost post={latestPost} />
                        </div>
                    )}

                    {/* --- POST GRID --- */}
                    {gridPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {gridPosts.map((post, idx) => (
                                <div key={post.id} className="animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards" style={{ animationDelay: `${idx * 100}ms` }}>
                                    <PostCard post={post} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed">
                            <Search className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold">Aucun résultat</h3>
                            <p className="text-muted-foreground">Essayez une autre recherche ou un autre filtre.</p>
                            <Button variant="link" onClick={() => { setSelectedTag(null); setSearchQuery(''); }}>
                                Tout effacer
                            </Button>
                        </div>
                    )}

                    <Separator className="my-16" />

                    {/* --- COMING SOON SECTION (Brouillons) --- */}
                    {comingSoon.length > 0 && (
                        <section className="bg-muted/30 border border-dashed border-border rounded-3xl p-8 md:p-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                                        <span className="relative flex h-3 w-3">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                                        </span>
                                        Dans les tuyaux...
                                    </h2>
                                    <p className="text-muted-foreground mt-1">
                                        Un petit aperçu des articles en cours de rédaction.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {comingSoon.map((draft) => (
                                    <div key={draft.id} className="group relative opacity-60 hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                                            <Badge variant="outline" className="bg-background/80 backdrop-blur text-xs font-mono uppercase tracking-widest border-dashed">
                                                Bientôt
                                            </Badge>
                                        </div>
                                        <Card className="h-full border-muted-foreground/10 bg-background/50 grayscale group-hover:grayscale-0 transition-all duration-500 shadow-none">
                                            <div className="aspect-video bg-muted overflow-hidden rounded-t-xl">
                                                {draft.thumbnail && (
                                                    <img src={draft.thumbnail} className="w-full h-full object-cover blur-[1px] group-hover:blur-0 transition-all" alt="draft" />
                                                )}
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold line-clamp-1">{draft.title}</h3>
                                                <p className="text-xs text-muted-foreground mt-2">Prévu prochainement</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
