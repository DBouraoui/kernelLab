import { Mail, Github, Linkedin, Globe } from "lucide-react"
import GuestLayout from '@/layouts/guest-layout';
import { Button } from '@/components/ui/button';
import ContactForm from '@/pages/contact/contact-form';
import { Head } from '@inertiajs/react';

export default function ContactPage() {
    return (
        <GuestLayout>
            <Head title="Contact"  />
            <div className="min-h-[calc(100vh-64px)] bg-background">
                <div className="container px-4 py-16 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                        {/* --- GAUCHE : IDENTITÉ & RÉSEAUX --- */}
                        <div className="lg:col-span-5 space-y-10">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                    Travaillons <span className="text-primary">ensemble.</span>
                                </h1>
                                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                    Besoin d'une expertise Backend ou d'une infrastructure automatisée ?
                                    Discutons de votre architecture et de vos objectifs.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-2xl border bg-card/50">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-muted-foreground">Email</p>
                                        <p className="font-medium">contact@dbouraoui.fr</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-2xl border bg-card/50">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Globe className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-muted-foreground">Localisation</p>
                                        <p className="font-medium">Toulon, France / Remote</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button variant="outline" className="flex-1 rounded-2xl gap-2 h-12" asChild>
                                    <a href="https://github.com/dbouraoui"><Github className="h-5 w-5" /> GitHub</a>
                                </Button>
                                <Button variant="outline" className="flex-1 rounded-2xl gap-2 h-12" asChild>
                                    <a href="https://www.linkedin.com/in/dylan-bouraoui-942039259"><Linkedin className="h-5 w-5" /> LinkedIn</a>
                                </Button>
                            </div>
                        </div>

                        {/* --- DROITE : FORMULAIRE --- */}
                        <div className="lg:col-span-7">
                            <div className="bg-card border rounded-[2rem] p-6 md:p-10 shadow-sm">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}
