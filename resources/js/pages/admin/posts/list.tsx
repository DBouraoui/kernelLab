import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Plus,
    Search,
    MoreHorizontal,
    FileText,
    Calendar,
    Trash2,
    Edit3,
    ExternalLink,
    Clock,
    EyeOff,
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import admin from '@/routes/admin';
import { PostInterface } from '@/types';

export default function Index({ posts }: { posts: PostInterface[] }) {

    const breadcrumbs = [
        { title: 'Dashboard', href: admin.dashboard.url() },
        { title: 'Articles', href: admin.post.list().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Articles" />

            <div className="max-w-[1400px] mx-auto py-8 px-4 sm:px-6">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
                        <p className="text-muted-foreground">Gérez vos publications et le contenu de votre blog.</p>
                    </div>
                    <Button asChild className="rounded-xl ">
                        <Link href={admin.post.create()} prefetch>
                            <Plus className="mr-2 h-4 w-4" /> Nouvel Article
                        </Link>
                    </Button>
                </div>

                {/* --- BARRE DE RECHERCHE & STATS RAPIDES --- */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher un article..."
                            className="pl-10 bg-background/50 border-muted-foreground/20 rounded-xl"
                            // Ajoute ta logique de recherche ici
                        />
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
                        <FileText className="h-4 w-4" />
                        {posts.length} Articles au total
                    </div>
                </div>

                <Separator className="mb-8" />

                {/* --- GRILLE D'ARTICLES --- */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <Card key={post.id} className="group overflow-hidden border-none shadow-sm bg-card/60 hover:shadow-md transition-all">
                                {/* Thumbnail Preview */}
                                <div className="relative aspect-video overflow-hidden bg-muted">
                                    {post.thumbnail ? (
                                        <img
                                            src={post.thumbnail}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                            alt={post.title}
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            <FileText className="h-10 w-10 opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <Badge
                                            className={`${
                                                post.status === 'published'
                                                    ? 'bg-green-500'
                                                    : post.status === 'archived'
                                                        ? 'bg-red-500'
                                                        : 'bg-yellow-500'
                                            } border-none text-white`}
                                        >
                                            {post.status === 'published' && 'Public'}
                                            {post.status === 'draft' && 'Brouillon'}
                                            {post.status === 'archived' && 'Archivé'}
                                        </Badge>
                                    </div>
                                </div>

                                <CardHeader className="p-4 pb-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <CardTitle className="text-lg font-bold line-clamp-2 leading-snug min-h-[3.5rem]">
                                            {post.title}
                                        </CardTitle>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => router.get(`/dashboard/post/edit/${post.id}`)}>
                                                    <Edit3 className="mr-2 h-4 w-4" /> Modifier
                                                </DropdownMenuItem>
                                                {
                                                    // @ts-ignore
                                                    new Date(post.published_at).getTime() <= Date.now()
                                                        ? (
                                                        <DropdownMenuItem onClick={() => router.get(`/blog/${post.slug}`)}>
                                                            <ExternalLink className="mr-2 h-4 w-4" /> Voir l'article
                                                        </DropdownMenuItem>
                                                    ) : (
                                                        <DropdownMenuItem disabled >
                                                            <EyeOff className="mr-2 h-4 w-4 text-orange-500" /> Article non publier
                                                        </DropdownMenuItem>
                                                    )
                                                }

                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-destructive focus:bg-destructive/10"
                                                    onClick={()=>router.delete('/dashboard/post/'+post.id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-4 pt-0 space-y-4">
                                    {/* Section Catégorie */}
                                    <div className="space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            Catégorie
        </span>
                                        {post.category ? (
                                            <div>
                <span className="text-[10px] font-black uppercase tracking-tighter text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800">
                    {post.category}
                </span>
                                            </div>
                                        ) : (
                                            <p className="text-[10px] italic text-muted-foreground/40">Non classé</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                        {post.description}
                                    </p>

                                    {/* Section Tags */}
                                    <div className="space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            Tags
        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {post.tags && post.tags.length > 0 ? (
                                                post.tags.slice(0, 3).map((tag: string) => (
                                                    <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-muted border border-muted-foreground/10 rounded-md">
                        #{tag}
                    </span>
                                                ))
                                            ) : (
                                                <span className="text-[10px] text-muted-foreground/40 italic">Aucun tag</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Section Date Dynamique */}
                                    <div className="pt-3 border-t border-muted/50">
                                        <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                Planification
            </span>
                                            <div className="flex items-center gap-2">
                                                {post.published_at ? (
                                                    new Date(post.published_at) <= new Date() ? (
                                                        <>
                                                            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                                            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                Publié le {new Date(post.published_at).toLocaleDateString('fr-FR')}
                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                                                            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                                Prévu pour le {new Date(post.published_at).toLocaleDateString('fr-FR')}
                            </span>
                                                        </>
                                                    )
                                                ) : (
                                                    <div className="flex items-center gap-2 text-muted-foreground/40 italic text-xs">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                                                        Date non définie
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="p-4 pt-0 flex items-center justify-between text-[11px] text-muted-foreground border-t border-muted/50 mt-auto">
                                    <div className="flex items-center gap-1 mt-3">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(post.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                    <div className="mt-3 font-medium flex flex-row justify-center items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {post.reading_time || '5 min'} min
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
                        <div className="bg-background p-4 rounded-full shadow-sm mb-4">
                            <FileText className="h-10 w-10 text-muted-foreground/40" />
                        </div>
                        <h3 className="text-lg font-semibold">Aucun article pour le moment</h3>
                        <p className="text-muted-foreground mb-6 text-sm">Commencez à rédiger votre premier contenu technique.</p>
                        <Button asChild variant="outline">
                            <Link href={admin.post.create()}>Créer mon premier article</Link>
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
