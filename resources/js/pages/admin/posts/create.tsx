import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl,  FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import TagsSelector from '@/pages/admin/posts/tags-selector';
import { toast } from 'sonner';
import MarkdownEditor from '@/pages/admin/posts/markdown-editor';
import PictureUploader from '@/pages/admin/posts/Picture-uploader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Send } from "lucide-react";

const schema = z.object({
    title: z.string().min(2, "Le titre est trop court"),
    description: z.string().min(2, "La description est requise"),
    content: z.string().min(10, "Le contenu est un peu vide..."),
    tags: z.array(z.string()).min(1, "Choisissez au moins un tag"),
    image: z.array(z.string()).min(1, "Une image de couverture est requise"),
})

export default function Create() {
    const [isLoading, setIsLoading] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Nouvel Article', href: '/dashboard/add' },
    ];

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            tags: [],
            image: []
        },
    })

    function onSubmit(values: z.infer<typeof schema>) {
        setIsLoading(true);
        router.post('/dashboard/store', values, {
            onSuccess: () => {
                form.reset();
                toast.success('L\'article a été publié avec succès !');
            },
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    // @ts-expect-error dynamic key access
                    form.setError(key, { type: 'manual', message: errors[key] });
                });
                toast.error('Erreur lors de la publication');
            },
            onFinish: () => setIsLoading(false)
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un article" />

            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Créer un article</h1>
                            <p className="text-muted-foreground">Rédigez et publiez votre prochain contenu technique.</p>
                        </div>
                    </div>

                    <Separator />

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Colonne Principale (Gauche) */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Contenu</CardTitle>
                                        <CardDescription>Le corps de votre article en Markdown.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Titre</FormLabel>
                                                    <FormControl>
                                                        <Input className="text-lg font-semibold" placeholder="Comment déployer K3s sur un Raspberry Pi..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Accroche (SEO)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Un court résumé pour donner envie de lire..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="content"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="min-h-[400px] rounded-md border">
                                                            {/*@ts-ignore*/}
                                                            <MarkdownEditor field={field}/>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Colonne Latérale (Droite) */}
                            <div className="space-y-6">
                                {/* Section Images */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Médias</CardTitle>
                                        <CardDescription>Images illustratives.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <FormField
                                            control={form.control}
                                            name="image"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <PictureUploader value={field.value} onChange={field.onChange} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>

                                {/* Section Tags */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Classification</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="tags"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Technologies</FormLabel>
                                                    <FormControl>
                                                        <TagsSelector field={field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>

                                {/* Actions */}
                                <Card className="bg-muted/50">
                                    <CardContent className="pt-6">
                                        <Button type="submit" className="w-full cursor-pointer" size="lg" disabled={isLoading}>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Envoi...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Publier l'article
                                                </>
                                            )}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    )
}
