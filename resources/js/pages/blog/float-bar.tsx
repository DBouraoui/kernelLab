import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { PostInterface } from '@/types';
import { ArrowUp, Share2, Sparkles, Check } from 'lucide-react'; // Ajout de Check
import { toast } from 'sonner'; // Ou ta lib de notification

export default function FloatBar({ post }: { post: PostInterface }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 300);
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setProgress(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- LOGIQUE DE PARTAGE ---
    const handleShare = async () => {
        const shareData = {
            title: post.title,
            text: post.description,
            url: window.location.href,
        };

        if (navigator.share) {
            // Partage natif (Mobile / Safari)
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log("Erreur de partage ou annulation");
            }
        } else {
            // Fallback : Copier le lien
            try {
                await navigator.clipboard.writeText(window.location.href);
                setIsCopied(true);
                toast.success("Lien copié dans le presse-papier !");

                // Reset l'icône après 2 secondes
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                toast.error("Impossible de copier le lien");
            }
        }
    };

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out transform ${
                isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
            }`}
        >
            <div className="bg-background/60 backdrop-blur-xl border-b border-border/40 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <div className="container max-w-5xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6">

                    {/* Partie Gauche */}
                    <div className="flex items-center gap-4 min-w-0">
                        {post.category && (
                            <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded bg-primary/10 border border-primary/20">
                                <Sparkles className="h-3 w-3 text-primary" />
                                <span className="text-[10px] font-bold uppercase tracking-tighter text-primary">
                                    {post.category}
                                </span>
                            </div>
                        )}
                        <h2 className="text-sm font-bold truncate text-foreground/90 max-w-[200px] sm:max-w-[400px]">
                            {post.title}
                        </h2>
                    </div>

                    {/* Partie Droite */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground rounded-full transition-all"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <ArrowUp className="h-4 w-4" />
                            <span className="text-xs font-semibold">Remonter</span>
                        </Button>

                        <div className="h-6 w-[1px] bg-border/60 hidden sm:block mx-1" />

                        <Button
                            size="sm"
                            onClick={handleShare}
                            className={`rounded-full px-5 shadow-md text-xs font-bold transition-all hover:scale-105 active:scale-95 ${
                                isCopied ? 'bg-green-600 hover:bg-green-600' : 'bg-primary hover:bg-primary/90 shadow-primary/20'
                            }`}
                        >
                            {isCopied ? (
                                <>
                                    <Check className="mr-2 h-3.5 w-3.5" />
                                    Copié !
                                </>
                            ) : (
                                <>
                                    <Share2 className="mr-2 h-3.5 w-3.5" />
                                    Partager
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Barre de progression */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-border/20">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-150 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
