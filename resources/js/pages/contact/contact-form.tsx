import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import ButtonLoading from '@/components/ui/button-loading';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema } from '@/types/zod-schemas';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export default function ContactForm(){
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof ContactSchema>>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            reason: "",
            message: ""
        },
    })

    function onSubmit(values: z.infer<typeof ContactSchema>) {
        setIsLoading(true);
        console.log(values);
        router.post("/contact", values,{
            onSuccess: () => {
                toast.success("Demande de contact envoyer !");
            },
            onError: () => {
                toast.error("Erreur l\'or de l'envoie de la demande de contact");
            },
            onFinish: () => {
                setIsLoading(false);
            }
        })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Nom complet *</FormLabel>
                                    <FormControl>
                                        <Input className="h-12 rounded-xl" placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Adresse email *</FormLabel>
                                    <FormControl>
                                        <Input className="h-12 rounded-xl" placeholder="john@doe.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Objet de la demande *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-12 rounded-xl border-muted-foreground/20">
                                                <SelectValue placeholder="Sélectionnez une option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="freelance">Mise en place d'un projet Freelance</SelectItem>
                                            <SelectItem value="recruitment">Opportunité de carrière (Poste)</SelectItem>
                                            <SelectItem value="consulting">Consulting DevOps / Audit Cloud</SelectItem>
                                            <SelectItem value="other">Autre demande</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Numéro de téléphone</FormLabel>
                                    <FormControl>
                                        <Input className="h-12 rounded-xl" placeholder="06 12 34 56 78" {...field} />
                                    </FormControl>
                                    <FormDescription className="text-[10px] uppercase font-bold opacity-50">
                                        Optionnel
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold">Votre message *</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Décrivez brièvement votre besoin ou votre projet..."
                                        className="min-h-[160px] rounded-xl border-muted-foreground/20 focus:ring-primary resize-none p-4"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <ButtonLoading
                        text="Envoyer le message"
                        textLoader="Envoi en cours..."
                        isLoading={isLoading}
                    />

                    <p className="text-center md:text-left text-xs text-muted-foreground">
                        En envoyant ce formulaire, vous acceptez d'être recontacté dans le cadre de votre demande.
                    </p>
                </form>
            </Form>
        </>
    )
}
