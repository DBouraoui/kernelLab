import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useState, ChangeEvent } from 'react';
import MarkdownViewer from '@/pages/admin/project/markdown-viewer';
import ButtonLoading from '@/components/ui/button-loading';
import type { ProjectType } from '@/types';
import admin from '@/routes/admin';

interface EditProjectProps {
    project: ProjectType & { stack_string?: string };
}

export default function EditProject({ project }: EditProjectProps) {

    const { data, setData, post, processing, errors } = useForm({
        _method: 'put', // Trick Inertia pour le support de fichiers en Update
        title: project.title || '',
        category: project.category || 'web',
        status: project.status || 'draft',
        description_short: project.description_short || '',
        content: project.content || '',
        stack: project.stack_string || '', // Utilise la string préparée par PHP
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        thumbnail: null as File | null,
        is_featured: project.is_featured,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(project.thumbnail_url || null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('thumbnail', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // On utilise POST à cause de l'upload d'image (Inertia limitation avec PUT + Files)
        post(`/dashboard/project/${project.id}`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Projets', href: '/dashboard/projects' }, { title: 'Modifier', href: '#' }]}>
            <Head title={`Modifier ${project.title}`} />

            <form onSubmit={submit} className="p-6 max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Modifier le projet</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={admin.project.index()}><ArrowLeft className="mr-2 h-4 w-4" /> Retour</Link>
                        </Button>
                        <ButtonLoading isLoading={processing} text="Mettre à jour" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-2">
                                    <Label>Titre</Label>
                                    <Input value={data.title} onChange={e => setData('title', e.target.value)} />
                                    {errors.title && <p className="text-destructive text-xs">{errors.title}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Description courte</Label>
                                    <Textarea value={data.description_short} onChange={e => setData('description_short', e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <Tabs defaultValue="write">
                                <div className="border-b px-4 py-2 bg-muted/30">
                                    <TabsList>
                                        <TabsTrigger value="write">Édition</TabsTrigger>
                                        <TabsTrigger value="preview">Prévisualisation</TabsTrigger>
                                    </TabsList>
                                </div>
                                <TabsContent value="write">
                                    <Textarea
                                        className="min-h-[400px] border-0 p-6 font-mono text-sm"
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                    />
                                </TabsContent>
                                <TabsContent value="preview" className="p-6 prose dark:prose-invert max-w-none">
                                    <MarkdownViewer data={data.content} />
                                </TabsContent>
                            </Tabs>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <Label>Statut & Catégorie</Label>
                                <Select value={data.status} onValueChange={v => setData('status', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="flex items-center justify-between border p-3 rounded-lg">
                                    <Label>Featured</Label>
                                    <Switch checked={data.is_featured} onCheckedChange={v => setData('is_featured', v)} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <Label>Stack (virgules)</Label>
                                <Input value={data.stack} onChange={e => setData('stack', e.target.value)} />
                                <Label>GitHub</Label>
                                <Input value={data.github_url} onChange={e => setData('github_url', e.target.value)} />
                                <Label>Live URL</Label>
                                <Input value={data.live_url} onChange={e => setData('live_url', e.target.value)} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <Label>Image</Label>
                                <div className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer" onClick={() => document.getElementById('thumb')?.click()}>
                                    {imagePreview ? <img src={imagePreview} className="aspect-video object-cover rounded-lg" /> : <ImageIcon className="mx-auto h-10 w-10 opacity-20" />}
                                    <input id="thumb" type="file" className="hidden" onChange={handleImageChange} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
