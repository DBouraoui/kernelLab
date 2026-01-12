import { Head, router, useForm } from '@inertiajs/react';
import React from 'react';
import GuestLayout from '@/layouts/guest-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, CheckCircle2, Zap, ShieldCheck, Sparkles, BellRing } from 'lucide-react';
import { toast } from 'sonner';
import { home } from '@/routes';

export default function NewsletterPage() {
    const { data, setData, post, processing, reset, recentlySuccessful, errors } = useForm({
        email: '',
        honeyPot: ''
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/newsletter', {
            onSuccess: () => {
            toast.success('Félicitation vous êtes bien inscrit à la newsletter !');
            },
            onError: () => {
                toast.error('Une erreur est survenue, veullez réésayer plus tard' )
            },
            onFinish : ()=>{
                reset();
                //@ts-ignore
                router.push(home().url)
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Newsletter — Veille Tech & Laravel" />

            <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-background">

                {/* --- ELEMENTS DE DECORATION THEMES --- */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Glow dynamique : bleu en light, indigo profond en dark */}
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] dark:bg-primary/10" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] dark:bg-purple-900/10" />

                    {/* Grid Pattern Shadcn Style */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>

                <div className="container relative z-10 mx-auto px-4 py-16">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                        {/* --- COLONNE GAUCHE : TEXTE --- */}
                        <div className="flex flex-col space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center justify-center lg:justify-start">
                                <Badge variant="secondary" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase">
                                    <BellRing className="mr-2 h-3.5 w-3.5 animate-pulse" />
                                    1 mail par semaine. 0 bullshit.
                                </Badge>
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[0.9]">
                                    Level up ton code <br />
                                    <span className="text-muted-foreground/50 italic font-serif">chaque mardi.</span>
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                    Rejoins le cercle des développeurs qui ne se contentent pas de copier-coller.
                                    Astuces Laravel, pattern React et secrets DevOps.
                                </p>
                            </div>

                            {/* Formulaire stylisé InputGroup */}
                            <form onSubmit={submit} className="relative group max-w-md mx-auto lg:mx-0">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-card border shadow-2xl">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="email"
                                            placeholder="ton@email.com"
                                            className="border-none bg-transparent shadow-none focus-visible:ring-0 pl-10 h-11"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            required
                                        />
                                        <Input
                                            value={data.honeyPot}
                                            name="honeyPot"
                                            className="hidden"
                                            onChange={e => setData('honeyPot', e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        disabled={processing}
                                        className="h-11 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                                    >
                                        {recentlySuccessful ? (
                                            <CheckCircle2 className="h-5 w-5" />
                                        ) : (
                                            "S'inscrire"
                                        )}
                                    </Button>
                                </div>
                                {errors.email && <p className="text-destructive text-xs mt-2 font-medium">{errors.email}</p>}
                            </form>

                            <div className="flex items-center justify-center lg:justify-start gap-6 text-muted-foreground/60">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span className="text-xs font-medium">Privacy focused</span>
                                </div>
                                <Separator orientation="vertical" className="h-4" />
                                <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4" />
                                    <span className="text-xs font-medium">No spam</span>
                                </div>
                            </div>
                        </div>

                        {/* --- COLONNE DROITE : MOCKUP THEMED --- */}
                        <div className="relative perspective-1000 hidden md:block">
                            <Card className="border-border/50 bg-card/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-700">
                                {/* Chrome Bar */}
                                <div className="h-12 border-b border-border/50 bg-muted/50 flex items-center px-6 gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-border" />
                                        <div className="w-3 h-3 rounded-full bg-border" />
                                        <div className="w-3 h-3 rounded-full bg-border" />
                                    </div>
                                    <div className="flex-1 text-center">
                                        <span className="text-[10px] text-muted-foreground font-mono bg-background px-4 py-1 rounded-full border border-border/40">
                                            newsletter_preview.html
                                        </span>
                                    </div>
                                </div>

                                <CardContent className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <div className="h-8 w-48 bg-primary/10 rounded-lg animate-pulse" />
                                        <div className="h-4 w-full bg-muted rounded-full" />
                                        <div className="h-4 w-5/6 bg-muted rounded-full" />
                                    </div>

                                    {/* Code Block Preview */}
                                    <div className="rounded-xl bg-slate-950 p-4 font-mono text-[10px] text-blue-400 border border-white/5">
                                        <p><span className="text-purple-400">public function</span> <span className="text-yellow-400">handle</span>()</p>
                                        <p className="pl-4">{"{"}</p>
                                        <p className="pl-8 text-slate-500">// Ta pépite de code hebdomadaire</p>
                                        <p className="pl-8"><span className="text-purple-400">return</span> <span className="text-green-400">"Success"</span>;</p>
                                        <p className="pl-4">{"}"}</p>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <div className="flex gap-4">
                                            <div className="h-12 w-12 rounded-xl bg-muted shrink-0" />
                                            <div className="space-y-2 flex-1">
                                                <div className="h-4 w-1/2 bg-muted rounded-full" />
                                                <div className="h-3 w-full bg-muted/50 rounded-full" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <div className="w-full h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                                            <span className="text-xs font-bold text-primary italic">Lire l'édition complète</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Floating Tooltip */}
                            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-bounce transition-all">
                                <Sparkles className="h-3 w-3" />
                                Nouveau contenu !
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
