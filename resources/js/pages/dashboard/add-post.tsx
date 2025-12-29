import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import TagsSelector from '@/pages/dashboard/tags-selector';
import { toast } from 'sonner';
import MarkdownEditor from '@/pages/dashboard/markdown-editor';

// 1. Mise à jour du Schema Zod pour accepter un tableau de strings
const schema = z.object({
    title: z.string().min(2, {
        message: "Le titre doit contenir au moins 2 caractères.",
    }),
    description: z.string().min(2, {
        message: "La description doit faire au minimum 2 caractères"
    }),
    content: z.string().min(2, {
        message: "Le contenu doit faire au minimum 2 caractères"
    }),
    // On valide que c'est un tableau et qu'il y a au moins un tag
    tags: z.array(z.string()).min(1, {
        message: "Veuillez sélectionner au moins un tag."
    })
})

export default function AddPost() {
    const [isLoading, setIsLoading] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Ajouter un article', href: '/dashboard/add' },
    ];

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            tags: [],
        },
    })

    function onSubmit(values: z.infer<typeof schema>) {
        setIsLoading(true);

        router.post('/dashboard/store', values, {
            onSuccess: () => {
                form.reset();
                setIsLoading(false);
                toast('Post créer avec succes')
            },
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    return form.setError(key, {
                        type: 'manual',
                        message: errors[key],
                    });
                });
                setIsLoading(false);
            },
            onFinish: () => setIsLoading(false)
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ajouter un article" />
            <div className="flex h-full w-full items-center justify-center flex-col gap-4 rounded-xl p-4">
                <h2>Ajouter un article</h2>
                <div className="max-w-4xl w-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">

                            {/* Titre */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Titre de l'article</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Entrez le titre..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description courte</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Résumé de l'article..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Contenu */}
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contenu</FormLabel>
                                        <FormControl>
                                            <MarkdownEditor field={field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags (Frameworks, DevOps, Infra...)</FormLabel>
                                        <FormControl>
                                            <TagsSelector field={field} />
                                        </FormControl>
                                        <FormDescription>
                                            Sélectionnez les technologies abordées dans cet article.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                                {isLoading ? "Publication en cours..." : "Publier l'article"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    )
}
