import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import GuestLayout from '@/layouts/guest-layout';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Share2, Code2, ListTree } from 'lucide-react';
import MarkdownViewer from '@/components/markdown-viewer';
import { PostInterface, UserInterface } from '@/types';
import { contact } from '@/routes';
import FloatBar from '@/pages/blog/float-bar';
import ShowHero from '@/pages/blog/show-hero';
import { toast } from 'sonner';

export default function BlogShow({ post, user }: { post: PostInterface, user: UserInterface }) {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    // --- LOGIQUE DE PARTAGE ---
    const handleShare = async () => {
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
                toast.success("Lien copié !");
            }
        } catch (err) {
            console.error("Erreur de partage :", err);
        }
    };

    // --- EXTRACTION DES TITRES (ToC) ---
    useEffect(() => {
        const articleElement = document.querySelector('article');
        if (!articleElement) return;

        // On cible h2 et h3 pour la table des matières
        const elements = Array.from(articleElement.querySelectorAll('h2, h3'));

        const extractedHeadings = elements.map((el, index) => {
            const text = el.textContent || "";
            const slug = text
                .toLowerCase()
                .trim()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');

            const uniqueId = `${slug}-${index}`;
            el.id = uniqueId; // On injecte l'ID unique dans le DOM

            return {
                id: uniqueId,
                text: text,
                level: parseInt(el.tagName.replace('H', '')),
            };
        });

        setHeadings(extractedHeadings);
    }, [post.content]);

    // --- DETECTION DU TITRE ACTIF ---
    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -66% 0px' } // Déclenche quand le titre est dans le tiers supérieur
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

            {/* Barre flottante en haut au scroll */}
            <FloatBar post={post} />

            <div className="min-h-screen bg-background pb-20">
                <ShowHero post={post} user={user} />

                <div className="container max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* --- SIDEBAR GAUCHE (SOCIAL) --- */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-32 flex flex-col gap-4 items-center">
                            <Button
                                onClick={handleShare}
                                variant="outline"
                                size="icon"
                                className="rounded-full h-12 w-12 shadow-sm hover:text-primary transition-all"
                            >
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </aside>

                    {/* --- CONTENU PRINCIPAL --- */}
                    <article className="lg:col-span-8 min-w-0">
                        {post.thumbnail && (
                            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 border border-border/50 bg-muted">
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="w-full object-cover max-h-[500px] hover:scale-105 transition-transform duration-1000"
                                />
                            </div>
                        )}

                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <MarkdownViewer content={post.content} />
                        </div>

                        <Separator className="my-12" />

                        <div className="flex flex-wrap gap-2 mb-12">
                            {post.tags?.map(tag => (
                                <Badge key={tag} variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-bold bg-secondary/50 border-none">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </article>

                    {/* --- SIDEBAR DROITE (ToC & PROMO) --- */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32 space-y-10">

                            {/* Table des matières */}
                            {headings.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                                        <ListTree className="h-4 w-4" />
                                        <span className="text-xs font-black uppercase tracking-widest">Sommaire</span>
                                    </div>
                                    <nav className="flex flex-col space-y-0.5 border-l border-border/60">
                                        {headings.map((heading) => (
                                            <a
                                                key={heading.id}
                                                href={`#${heading.id}`}
                                                className={`
                                                    text-sm py-2 px-4 transition-all border-l-2 -ml-[1.5px]
                                                    ${activeId === heading.id
                                                    ? 'border-primary text-primary font-bold bg-primary/5 rounded-r-lg'
                                                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                                                }
                                                    ${heading.level === 3 ? 'pl-8 text-xs' : ''}
                                                `}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const el = document.getElementById(heading.id);
                                                    if (el) {
                                                        const offset = 100;
                                                        window.scrollTo({
                                                            top: el.offsetTop - offset,
                                                            behavior: 'smooth'
                                                        });
                                                    }
                                                }}
                                            >
                                                {heading.text}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            {/* CTA Box */}
                            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 via-background to-background border border-primary/20 shadow-sm relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                                    <Code2 className="h-24 w-24" />
                                </div>
                                <h4 className="font-black text-lg mb-2 relative">Besoin d'un expert ?</h4>
                                <p className="text-sm text-muted-foreground mb-6 relative">
                                    Freelance spécialisé en architectures **Laravel & React**. Discutons de votre projet.
                                </p>
                                <Button className="w-full rounded-xl font-bold group-hover:scale-105 transition-transform" asChild>
                                    <Link href={contact()}>Me contacter</Link>
                                </Button>
                            </div>

                        </div>
                    </aside>
                </div>
            </div>
        </GuestLayout>
    );
}
