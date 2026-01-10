import { ArrowRight, Github, Linkedin, Terminal, Server, Code2, Cloud, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from '@inertiajs/react';
import { blog, contact } from '@/routes';

export default function Hero() {
    return (
        <section className="relative w-full py-20 md:py-32 bg-background overflow-hidden">
            {/* Background subtil : Trame de points */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-black dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>

            <div className="container flex flex-col lg:flex-row items-center gap-12 lg:gap-10">

                {/* --- TEXTE (GAUCHE) --- */}
                <div className="flex flex-col items-start text-left lg:flex-[1.2] z-10">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6 animate-in fade-in slide-in-from-bottom-3 duration-1000">
                        <Cloud className="mr-2 h-4 w-4" />
                        <span>Spécialisé en Architecture Cloud & Scale</span>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                        Je bâtis des apps <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Full Stack</span>
                        <span className="text-foreground"> et des solutions </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">DevOps.</span>

                    </h1>

                    <p className="mt-6 max-w-[640px] text-lg sm:text-xl text-muted-foreground leading-relaxed">
                        Développeur passionné par l'automatisation et la performance.
                        Je crée des interfaces <strong>robustes et scalables</strong> et je gère leur déploiement continu sur des infrastructures <strong>Cloud</strong> scalables.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4 items-center w-full">
                        <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20" asChild>
                            <Link href={blog()} prefetch>
                                Explorer le Blog
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                        <Button  size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                            <Link href={contact()} prefetch>
                                Contactez moi <Send />
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-10 flex items-center gap-6 text-muted-foreground">
                        <a href="https://github.com/dbouraoui" target="_blank" className="hover:text-blue-500 transition-colors flex items-center gap-2 text-sm font-medium">
                            <Github className="h-5 w-5" /> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/dylan-bouraoui-942039259" target="_blank" className="hover:text-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
                            <Linkedin className="h-5 w-5" /> LinkedIn
                        </a>
                    </div>
                </div>

                {/* --- VISUEL TECH (DROITE) --- */}
                <div className="flex-1 w-full relative group">
                    {/* Effet de Halo lumineux en arrière-plan */}
                    <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/20 via-blue-500/10 to-orange-500/20 blur-[120px] opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Layout Bento Grid */}
                    <div className="grid grid-cols-12 grid-rows-2 gap-4 h-[450px]">

                        {/* 1. FRONTEND - Grande carte horizontale */}
                        <div className="col-span-12 md:col-span-8 row-span-1 bg-card/60 backdrop-blur-sm border rounded-3xl p-6 shadow-sm hover:border-blue-500/50 hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group/card">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-blue-500/10 rounded-2xl">
                                    <Code2 className="h-6 w-6 text-blue-500" />
                                </div>
                                <div className="flex -space-x-2">
                                    {/* Petits badges visuels pour le style */}
                                    <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">GO</div>
                                    <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold text-blue-400">K3S</div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">Frontend Development</h3>
                                <p className="text-sm text-muted-foreground mt-1">Interfaces haute performance avec React, Next.js et Nuxt4.</p>
                            </div>
                        </div>

                        {/* 2. BACKEND - Carte verticale à droite */}
                        <div className="col-span-6 md:col-span-4 row-span-1 md:row-span-2 bg-card/60 backdrop-blur-sm border rounded-3xl p-6 shadow-sm hover:border-green-500/50 hover:shadow-green-500/5 transition-all duration-300 flex flex-col justify-between">
                            <div className="p-3 bg-green-500/10 rounded-2xl w-fit">
                                <Terminal className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight">Backend & APIs</h3>
                                <p className="text-xs text-muted-foreground mt-2 font-mono">
                                    &gt; PHP<br/>
                                    &gt; GO<br/>
                                    &gt; PYTHON<br/>
                                    &gt; PostgreSQL<br/>
                                    &gt; Redis
                                </p>
                            </div>
                        </div>

                        {/* 3. DEVOPS & CLOUD - Carte large en bas */}
                        <div className="col-span-6 md:col-span-8 row-span-1 bg-card/60 backdrop-blur-sm border rounded-3xl p-6 shadow-sm hover:border-orange-500/50 hover:shadow-orange-500/5 transition-all duration-300 flex items-center gap-6">
                            <div className="hidden sm:flex p-4 bg-orange-500/10 rounded-2xl">
                                <Server className="h-8 w-8 text-orange-500" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Cloud className="h-4 w-4 text-cyan-500" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Infrastructure</span>
                                </div>
                                <h3 className="font-bold text-lg">DevOps & Cloud</h3>
                                <p className="text-sm text-muted-foreground">CI/CD, Kubernetes et Terraform.</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}
