import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import GuestLayout from '@/layouts/guest-layout';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
    Share2,
} from 'lucide-react';
import MarkdownViewer from '@/components/markdown-viewer';
import { PostInterface, UserInterface } from '@/types';
import { contact } from '@/routes';
import FloatBar from '@/pages/blog/float-bar';
import ShowHero from '@/pages/blog/show-hero';
import { toast } from 'sonner';

export default function BlogShow({ post, user}: { post: PostInterface, user: UserInterface }) {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    const handleShare = async () => {
        // On prépare les données à partager
        const shareData = {
            title: post.title,
            text: post.description,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Le lien de l'article est dans votre presse-papier.");
            }
        } catch (err) {
            console.error("Erreur lors du partage :", err);
        }
    };

    useEffect(() => {
        const regex = /^(#{2,3})\s+(.+)$/gm;
        const found = [];
        let match;
        while ((match = regex.exec(post.content)) !== null) {
            const level = match[1].length; // ## = 2, ### = 3
            const text = match[2];
            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            found.push({ id, text, level });
        }
        setHeadings(found);
    }, [post.content]);

    // Intersection Observer pour surligner le titre actif au scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -60% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    return (
        <GuestLayout>
            <Head title={post.title} />

            <FloatBar post={post}/>

            <div className="min-h-screen bg-background pb-20">
                {/* --- HEADER HERO --- */}
                <ShowHero post={post} user={user} />

                {/* --- MAIN CONTENT & SIDEBAR --- */}
                <div className="container max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Colonne Gauche: Share buttons (Desktop) */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-32 flex flex-col gap-4 items-center">
                            <Button onClick={()=>handleShare()} variant="outline" size="icon" className="rounded-full h-10 w-10 text-muted-foreground hover:text-blue-500" title="Partager">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </aside>

                    {/* Colonne Centrale: Article */}
                    <article className="lg:col-span-8">
                        {post.thumbnail && (
                            <div className="rounded-2xl overflow-hidden shadow-2xl mb-12 border border-border/50">
                                <img src={post.thumbnail} alt={post.title} className="w-full object-cover max-h-[500px]" />
                            </div>
                        )}

                        {/* Le contenu Markdown rendu proprement */}
                        <div className="mb-16">
                            <MarkdownViewer content={post.content} />
                        </div>

                        <Separator className="my-8" />

                        {/* Tags Footer */}
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </article>

                    {/* Colonne Droite: Table des matières (Sticky) */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32 space-y-8">
                            {headings.length > 0 && (
                                <div className="p-6 rounded-xl bg-card border shadow-sm">
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                                        Dans cet article
                                    </h4>
                                    <nav className="flex flex-col space-y-1">
                                        {headings.map((heading) => (
                                            <a
                                                key={heading.id}
                                                href={`#${heading.id}`}
                                                className={`text-sm py-1.5 transition-colors border-l-2 pl-4 ${
                                                    activeId === heading.id
                                                        ? 'border-blue-600 text-blue-600 font-medium'
                                                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                                                } ${heading.level === 3 ? 'ml-2' : ''}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                            >
                                                {heading.text}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            {/* Promo Box / Newsletter pourrait aller ici */}
                            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900">
                                <h4 className="font-bold mb-2">Besoin d'un dev ?</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Je suis disponible pour des missions freelance sur Laravel & React.
                                </p>
                                <Button size="sm" className="w-full">
                                    <Link href={contact()} >Me contacter</Link>
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </GuestLayout>
    );
}
