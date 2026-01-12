import { Link } from '@inertiajs/react';
import {
    CalendarDays,
    ChevronLeft,
    Clock,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { PostInterface, UserInterface } from '@/types';
import { formatDate } from '@/types/utils';
import { Badge } from '@/components/ui/badge';
import { blog } from '@/routes';

export default function ShowHero({post, user}: {post: PostInterface, user: UserInterface}) {
    return (
        <div className="relative w-full overflow-hidden border-b bg-background pt-24 pb-16 md:pt-32 md:pb-24 rounded-xl">
            {/* --- BACKGROUND LAYER --- */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Cercles de lumière animés */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-black blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-900/5 blur-[100px] rounded-full animate-bounce duration-[10s]" />

                {/* Grille de points avec masque de dégradé */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                <div
                    className="absolute inset-0 opacity-[0.4] dark:opacity-[0.1]"
                    style={{ backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--muted-foreground)) 1px, transparent 0)`, backgroundSize: '32px 32px' }}
                />
            </div>

            <div className="container relative z-10 max-w-5xl mx-auto px-4">
                <div className="flex flex-col space-y-10">

                    {/* --- NAVIGATION & STATUS --- */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <Link href={blog()} className="group inline-flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm group-hover:shadow-primary/20 group-hover:-translate-x-1">
                                <ChevronLeft className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                        Retour aux articles
                    </span>
                        </Link>

                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm">
                            <Clock className="h-3.5 w-3.5 text-blue-500" />
                            <span className="text-[11px] font-bold uppercase tracking-tight">
                        {post.reading_time || '5'} min de lecture
                    </span>
                        </div>
                    </div>

                    {/* --- CORE CONTENT --- */}
                    <div className="max-w-4xl space-y-6">
                        <div className="flex items-center gap-3">
                            {post.category && (
                                <Badge variant="outline" className="px-4 py-1 rounded-lg border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.15em] shadow-sm">
                                    {post.category}
                                </Badge>
                            )}
                            <Separator className="w-12 bg-primary/20" />
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-[900] tracking-tight leading-[0.95] text-foreground">
                            {post.title}
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed max-w-3xl font-medium border-l-2 border-primary/10 pl-6 py-2">
                            {post.description}
                        </p>
                    </div>

                    {/* --- FOOTER HERO (AUTHOR & DATE) --- */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-10">
                        <div className="flex items-center gap-5">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <Avatar className="h-14 w-14 border-2 border-background relative rounded-2xl overflow-hidden shadow-2xl">
                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} />
                                    <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background shadow-sm" />
                            </div>

                            <div className="space-y-0.5">
                                <h4 className="font-bold text-lg leading-none">{user.name}</h4>
                                <p className="text-sm text-muted-foreground font-medium italic">
                                    Dev fullstack & devops
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="flex flex-col items-start md:items-end">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">Date de publication</span>
                                <div className="flex items-center gap-2 font-bold text-sm bg-secondary/30 px-3 py-1.5 rounded-lg border border-border/50">
                                    <CalendarDays className="h-4 w-4 text-primary" />
                                    {formatDate(post.created_at)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
