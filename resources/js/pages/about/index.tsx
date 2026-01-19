import { CheckCircle2, Server, Container, Terminal, Code } from "lucide-react"
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

export const metadata = {
    title: 'À Propos | Expert Backend Symfony & DevOps Cloud',
    description: 'Spécialiste en architectures distribuées, Backend Symfony/Go et infrastructure Kubernetes.',
}

export default function AboutPage() {
    return (
        <GuestLayout>
            <Head title="A propos"  />
            <div className="bg-background">
                <div className="container px-4 py-16 md:py-32">

                    {/* --- HERO À PROPOS : FOCUS BACKEND/CLOUD --- */}
                    <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                                <Terminal className="h-4 w-4" />
                                <span>Architecte Systèmes & Logiciels</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none">
                                Concevoir pour la <br />
                                <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 text-primary">scalabilité.</span>
                            </h1>

                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                <p>
                                    Spécialisé dans le développement Backend haute performance, je construis des API robustes et sécurisées principalement avec <strong className="text-foreground">Symfony</strong> et <strong className="text-foreground">Go</strong>. Mon approche est guidée par la qualité logicielle (Clean Architecture, DDD) et l'efficacité des traitements de données.
                                </p>
                                <p>
                                    Côté infrastructure, j'évolue dans l'écosystème <strong className="text-foreground">Cloud Native</strong>. Mon rôle est de garantir que le code backend tourne dans un environnement automatisé, scalable et monitoré grâce à <strong className="text-foreground">Kubernetes</strong> et aux pratiques <strong className="text-foreground">DevOps</strong>.
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-[500px]">
                            <div className="relative p-8 rounded-[3rem] border bg-muted/20 backdrop-blur-sm group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-orange-500/5 -z-10 group-hover:scale-110 transition-transform duration-700" />
                                <pre className="font-mono text-[10px] md:text-xs text-muted-foreground/80 overflow-hidden leading-relaxed">
                 <code>{`
class Infrastructure {
    protected $provider = 'AWS';
    protected $orchestrator = 'Kubernetes';

    public function deploy(Service $service) {
        return $this->pipeline
            ->analyze($service)
            ->test()
            ->buildImage()
            ->rollout('production');
    }
}
                 `}</code>
               </pre>
                            </div>
                        </div>
                    </div>

                    {/* --- SECTION EXPERTISE SÉMANTIQUE --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                        {/* Backend Card */}
                        <div className="p-8 rounded-[2rem] border bg-background hover:border-blue-500/30 transition-all">
                            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                                <Server className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Core Backend</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Développement d'architectures complexes sous Symfony 7 et Go. Expertise en gestion de bases de données relationnelles (PostgreSQL) et NoSQL.
                            </p>
                        </div>

                        {/* DevOps Card */}
                        <div className="p-8 rounded-[2rem] border bg-background hover:border-orange-500/30 transition-all">
                            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">
                                <Container className="h-6 w-6 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">DevOps & Orchestration</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Mise en œuvre de solutions de conteneurisation (Docker) et orchestration (K8s). CI/CD automatisée pour des cycles de release rapides.
                            </p>
                        </div>

                        {/* Frontend Card (Complément) */}
                        <div className="p-8 rounded-[2rem] border bg-background hover:border-cyan-500/30 transition-all">
                            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                                <Code className="h-6 w-6 text-cyan-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Frontend Modern</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Interfaces riches et réactives utilisant React ou Angular, assurant une consommation fluide des API backend développées.
                            </p>
                        </div>
                    </div>

                    {/* --- SECTION VALEURS TECHNIQUES --- */}
                    <div className="max-w-5xl mx-auto rounded-[3rem] border border-dashed p-10 md:p-16">
                        <h2 className="text-2xl font-bold mb-10 text-center uppercase tracking-widest">Standard de Qualité</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Performance Backend", desc: "Optimisation des requêtes et mise en cache Redis." },
                                { title: "Infrastucture as Code", desc: "Provisioning via Terraform et Ansible." },
                                { title: "Observabilité", desc: "Logging et Monitoring avec Prometheus & Grafana." },
                                { title: "Clean Code", desc: "Respect des principes SOLID et design patterns." },
                                { title: "Sécurité Cloud", desc: "Gestion des secrets et hardening des clusters." },
                                { title: "Tests Automatisés", desc: "Couverture de tests unitaires et d'intégration." },
                            ].map((item) => (
                                <div key={item.title} className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        <span className="font-bold text-sm">{item.title}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </GuestLayout>
    )
}
