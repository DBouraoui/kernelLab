import { Mail, Github, Linkedin, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import ContactForm from '@/pages/contact/contact-form';

export function Contact() {
    return (
        <section className="py-24 container px-4 bg-transparent">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

                    {/* --- INFOS DE CONTACT (2/5 de la largeur) --- */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">On discute ?</h2>
                            <p className="mt-4 text-muted-foreground leading-relaxed">
                                Besoin d'un audit DevOps, d'un renfort Full Stack ou simplement envie d'échanger sur un projet Open Source ?
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm group">
                                <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                                    <Mail className="h-4 w-4 text-primary" />
                                </div>
                                <span className="font-medium">contact@ton-domaine.dev</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm group">
                                <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                                    <MessageSquare className="h-4 w-4 text-primary" />
                                </div>
                                <span className="font-medium">Dispo pour missions Freelance</span>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <a href="https://github.com/dbouraoui"  className="hover:text-blue-500 transition-colors flex items-center gap-2 text-sm font-medium">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/dylan-bouraoui-942039259"  className="hover:text-blue-500 transition-colors flex items-center gap-2 text-sm font-medium">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* --- FORMULAIRE ÉPURÉ (3/5 de la largeur) --- */}
                    <div className="lg:col-span-3">
                        <ContactForm/>
                    </div>

                </div>
            </div>
        </section>
    )
}
