import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Loader2,
    Save,
    ArrowLeft,
    Clock,
    Settings2,
    ImageIcon,
    Lock,
    Badge,
} from 'lucide-react';
import MarkdownEditor from '@/pages/admin/posts/markdown-editor';
import { ArticleSchemaUpdate } from '@/types/zod-schemas';
import { PostInterface } from '@/types';
import admin from '@/routes/admin';

export default function Edit({ post }: { post: PostInterface }) {
    const [isLoading, setIsLoading] = useState(false);

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Articles', href: '/dashboard/posts' },
        { title: 'Modifier', href: '#' },
    ];

    const form = useForm<z.infer<typeof ArticleSchemaUpdate>>({
        resolver: zodResolver(ArticleSchemaUpdate),
        defaultValues: {
            title: post.title,
            description: post.description,
            content: post.content,
            thumbnail: post.thumbnail,
            status: post.status,
            tags: post.tags,
            reading_time: post.reading_time || ""
        },
    });

    function onSubmit(values: z.infer<typeof ArticleSchemaUpdate>) {
        setIsLoading(true);
        router.patch(`/dashboard/post/${post.id}`, values, {
            onSuccess: () => toast.success('Article mis à jour !'),
            onError: () => toast.error('Erreur lors de la mise à jour'),
            onFinish: () => setIsLoading(false)
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Éditer : ${post.title}`} />

            <div className="max-w-[1400px] mx-auto py-8 px-4 sm:px-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">

                        {/* HEADER STICKY */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background/95 backdrop-blur sticky top-0 z-10 py-4 border-b">
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon" asChild className="rounded-full">
                                    <Link href={admin.post.list()}><ArrowLeft className="h-5 w-5" /></Link>
                                </Button>
                                <div>
                                    <h1 className="text-xl font-bold tracking-tight">Modifier l'article</h1>
                                    <p className="text-xs text-muted-foreground">ID: #{post.id} • Dernière modif: {new Date(post.updated_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <Button type="submit" className="w-full sm:w-auto shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Enregistrer les modifications
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* ÉDITION CONTENU */}
                            <div className="lg:col-span-8 space-y-8">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input className="text-2xl md:text-3xl  font-black border-none bg-transparent shadow-none focus-visible:ring-0 p-0 h-auto" {...field} />
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
                                                    <Input className="text-xl text-muted-foreground border-none bg-transparent shadow-none focus-visible:ring-0 p-0 h-auto" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <MarkdownEditor field={field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* SIDEBAR PARAMÈTRES */}
                            <div className="lg:col-span-4 space-y-6">
                                <div className="sticky top-24 space-y-6">

                                    {/* THUMBNAIL (LECTURE SEULE) */}
                                    <Card className="border-none bg-muted/30 shadow-none overflow-hidden">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-xs font-bold flex items-center justify-between uppercase tracking-widest text-muted-foreground">
                                                <span className="flex items-center gap-2"><ImageIcon className="h-3 w-3" /> Couverture</span>
                                                <Badge  className="text-[9px] gap-1 bg-background"><Lock className="h-2 w-2" /> Verrouillé</Badge>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="relative aspect-video rounded-lg overflow-hidden border bg-background group">
                                                <img src={post.thumbnail} className="w-full h-full object-cover opacity-80" alt="Thumbnail" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                                                    <span className="text-[10px] font-bold text-white bg-black/50 px-2 py-1 rounded">Modification non disponible ici</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* CONFIGURATION */}
                                    <Card className="border shadow-sm">
                                        <CardHeader className="pb-3 border-b bg-muted/10">
                                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                                <Settings2 className="h-4 w-4" /> Paramètres
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-6 space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs font-bold uppercase text-muted-foreground">Statut</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="draft">Brouillon</SelectItem>
                                                                <SelectItem value="published">Publié</SelectItem>
                                                                <SelectItem value="archived">Archivé</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="reading_time"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs font-bold uppercase text-muted-foreground">Temps de lecture</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                                <Input className="pl-9" {...field} />
                                                            </div>
                                                        </FormControl>
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
    );
}
