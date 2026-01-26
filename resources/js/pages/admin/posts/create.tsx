import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import TagsSelector from '@/pages/admin/posts/tags-selector';
import { toast } from 'sonner';
import 'highlight.js/styles/atom-one-dark.css';
import PictureUploader from '@/pages/admin/posts/picture-uploader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Loader2,
    Send,
    Clock,
    Eye,
    Settings2,
    Sparkles,
    ImageIcon,
} from 'lucide-react';
import MarkdownEditor from '@/pages/admin/posts/markdown-editor';
import { ArticleSchema } from '@/types/zod-schemas';
import ThumbnailUploader from '@/pages/admin/posts/thumbnail-uploader';
import admin from '@/routes/admin';
import { PublicationDatepicker } from '@/pages/admin/posts/publication-datepicker';

export default function Create() {
    const [isLoading, setIsLoading] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: admin.dashboard().url },
        { title: 'Articles', href: admin.post.list().url },
        { title: 'Nouvel Article', href: admin.post.create().url },
    ];

    const form = useForm<z.infer<typeof ArticleSchema>>({
        resolver: zodResolver(ArticleSchema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            tags: [],
            image: [],
            status: "draft",
            reading_time: "",
            thumbnail: "",
            published_at: "",
            category: ""
        },
    })

    // todo calculer le temps directement via le nombre de mots écrit

    function onSubmit(values: z.infer<typeof ArticleSchema>) {
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

            <div className="max-w-[1400px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">

                        {/* HEADER FLOTTANT / STICKY */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background/95 backdrop-blur sticky top-0 z-10 py-4 border-b">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-yellow-500" />
                                    Rédaction
                                </h1>
                                <p className="text-sm text-muted-foreground italic">Enregistré localement à {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <Button variant="ghost" asChild className="hidden sm:flex">
                                    <Link href={admin.post.list()}>Annuler</Link>
                                </Button>
                                <Button type="submit" className="flex-1 sm:flex-none shadow-lg shadow-primary/20" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                    Publier l'article
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                            {/* COLONNE PRINCIPALE (Écriture) */}
                            <div className="lg:col-span-8 space-y-10">
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className="text-2xl md:text-3xl font-black border-none bg-transparent shadow-none focus-visible:ring-0 p-0 h-auto placeholder:text-muted-foreground/30"
                                                        placeholder="Titre de l'article..."
                                                        {...field}
                                                    />
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
                                                <FormControl>
                                                    <Input
                                                        className="text-xl text-muted-foreground border-none bg-transparent shadow-none focus-visible:ring-0 p-0 h-auto placeholder:text-muted-foreground/30"
                                                        placeholder="Une accroche courte et percutante..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Card className="border-none shadow-none bg-transparent">
                                    <CardContent className="p-0">
                                        <FormField
                                            control={form.control}
                                            name="content"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                                                            <MarkdownEditor field={field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            {/* SIDEBAR (Paramètres) */}
                            <div className="lg:col-span-4 space-y-6">
                                <div className="sticky top-24 space-y-6">

                                    {/* Statut & Temps de lecture */}
                                    <Card className="border-none bg-muted/30 shadow-none">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                                <Settings2 className="h-4 w-4" /> Configuration
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[10px] uppercase font-bold text-muted-foreground">Statut</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="bg-background">
                                                                    <SelectValue placeholder="Choisir un statut" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="draft">Brouillon (Draft)</SelectItem>
                                                                <SelectItem value="published">Publié (Public)</SelectItem>
                                                                <SelectItem value="archived">Archivé</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="reading_time"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[10px] uppercase font-bold text-muted-foreground">Temps de lecture</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                                <Input className="pl-9 bg-background" placeholder="Ex: 5 min" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="published_at"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <PublicationDatepicker field={field} />
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
                                                        <FormLabel className="text-[10px] uppercase font-bold text-muted-foreground">Tags de l'article</FormLabel>
                                                        <FormControl>
                                                            <TagsSelector field={field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="category"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[10px] uppercase font-bold text-muted-foreground">Catégorie de l'article</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="bg-background">
                                                                    <SelectValue placeholder="Choisir une catégorie" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="web">Developpement web</SelectItem>
                                                                <SelectItem value="ia">Intéligence artificiel</SelectItem>
                                                                <SelectItem value="data">Data</SelectItem>
                                                                <SelectItem value="devops">Devops</SelectItem>
                                                                <SelectItem value="sys">Admin System</SelectItem>
                                                                <SelectItem value="nodef">Non définie</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </CardContent>
                                    </Card>

                                    {/* Thumbnail / Image de couverture */}
                                    <Card className="border-none bg-muted/30 shadow-none">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                                <ImageIcon className="h-4 w-4 text-blue-500" /> Image de couverture
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <FormField
                                                control={form.control}
                                                name="thumbnail"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <ThumbnailUploader
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </CardContent>
                                    </Card>

                                    {/* Galerie d'illustration (images d'article) */}
                                    <Card className="border-none bg-muted/30 shadow-none">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                                <Eye className="h-4 w-4" /> Images de l'article
                                            </CardTitle>
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
                                </div>
                            </div>

                        </div>
                    </form>
                </Form>
            </div>
        </AppLayout>
    )
}
