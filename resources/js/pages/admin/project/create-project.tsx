import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { useState, ChangeEvent } from 'react';
import ButtonLoading from '@/components/ui/button-loading';
import admin from '@/routes/admin';
import MarkdownViewer from '@/pages/admin/project/markdown-viewer'; // Pour la coloration syntaxique

export default function CreateProject() {

    // Setup du formulaire Inertia
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'web',
        status: 'draft',
        description_short: '',
        content: '',
        stack: '', // On gère ça en string "Tech1, Tech2" pour simplifier la saisie
        github_url: '',
        live_url: '',
        thumbnail: null as File | null,
        is_featured: false,
    });

    // État local pour la prévisualisation de l'image
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Gestion du changement d'image
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('thumbnail', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Inertia gère automatiquement le FormData pour les fichiers
        post('/dashboard/project');
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Projets', href: '/dashboard/projects' },
            { title: 'Créer', href: '#' }
        ]}>
            <Head title="Nouveau Projet" />

            <form onSubmit={submit} className="p-6 max-w-6xl mx-auto space-y-8">

                {/* --- HEADER --- */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight">Nouveau Projet</h2>
                        <p className="text-muted-foreground text-sm">Ajouter une réalisation à votre portfolio.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={admin.project.index()} prefetch>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                            </Link>
                        </Button>
                        <ButtonLoading
                            isLoading={processing}
                            logo={<Save className="mr-2 h-4 w-4" />}
                            text="Enregistrer le projet"
                            textLoader="Création..."
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- COLONNE GAUCHE (Main Content) --- */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Titre & Description */}
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Titre du projet <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="title"
                                        placeholder="Ex: Architecture Micro-services K8s"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="text-lg font-semibold"
                                    />
                                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="desc">Description courte (SEO & Cards)</Label>
                                    <Textarea
                                        id="desc"
                                        placeholder="Un résumé accrocheur en 2-3 phrases..."
                                        className="h-24 resize-none"
                                        value={data.description_short}
                                        onChange={e => setData('description_short', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Éditeur Markdown (Tabs) */}
                        <Card className="overflow-hidden">
                            <Tabs defaultValue="write" className="w-full">
                                <div className="border-b px-4 py-2 bg-muted/30">
                                    <TabsList>
                                        <TabsTrigger value="write">Édition Markdown</TabsTrigger>
                                        <TabsTrigger value="preview">Prévisualisation</TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="write" className="p-0 m-0">
                                    <Textarea
                                        placeholder="# Détails du projet&#10;&#10;Décrivez votre approche technique, les challenges..."
                                        className="min-h-[400px] border-0 rounded-none focus-visible:ring-0 p-6 font-mono text-sm leading-relaxed resize-y"
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                    />
                                </TabsContent>

                                <TabsContent value="preview" className="p-6 m-0 min-h-[400px] border-t bg-muted/10">
                                    {data.content ? (
                                        <MarkdownViewer data={data.content} />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground italic gap-2">
                                            <div className="p-4 rounded-full bg-muted/50">
                                                <ImageIcon className="h-6 w-6 opacity-50" />
                                            </div>
                                            <p>Le contenu apparaîtra ici...</p>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </Card>
                    </div>

                    {/* --- COLONNE DROITE (Sidebar) --- */}
                    <div className="space-y-6">

                        {/* Status & Category */}
                        <Card>
                            <CardContent className="pt-6 space-y-6">
                                <div className="space-y-2">
                                    <Label>Statut</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(val) => setData('status', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft (Brouillon)</SelectItem>
                                            <SelectItem value="published">Publié</SelectItem>
                                            <SelectItem value="archived">Archivé</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Catégorie</Label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(val) => setData('category', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="devops">DevOps & Cloud</SelectItem>
                                            <SelectItem value="web">Développement Web</SelectItem>
                                            <SelectItem value="mobile">Mobile App</SelectItem>
                                            <SelectItem value="opensource">Open Source</SelectItem>
                                            <SelectItem value="saas">SaaS Product</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between border rounded-lg p-3 bg-muted/20">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Mis en avant</Label>
                                        <p className="text-xs text-muted-foreground">Afficher sur la Home ?</p>
                                    </div>
                                    <Switch
                                        checked={data.is_featured}
                                        onCheckedChange={(checked) => setData('is_featured', checked)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tech Stack */}
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-2">
                                    <Label>Stack Technique</Label>
                                    <Input
                                        placeholder="Symfony, Docker, AWS, React..."
                                        value={data.stack}
                                        onChange={e => setData('stack', e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">Séparez les technologies par des virgules.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Liens */}
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-2">
                                    <Label>Repository GitHub</Label>
                                    <Input
                                        placeholder="https://github.com/..."
                                        value={data.github_url}
                                        onChange={e => setData('github_url', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Lien Live / Demo</Label>
                                    <Input
                                        placeholder="https://mon-projet.com"
                                        value={data.live_url}
                                        onChange={e => setData('live_url', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Image Upload */}
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <Label>Image de couverture</Label>

                                <div className="border-2 border-dashed rounded-xl p-4 hover:bg-muted/50 transition-colors cursor-pointer relative group text-center"
                                     onClick={() => document.getElementById('thumbnail-upload')?.click()}
                                >
                                    {imagePreview ? (
                                        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                                            <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white text-sm font-medium">Changer l'image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-8 text-muted-foreground">
                                            <ImageIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                            <span className="text-sm">Cliquez pour ajouter une image</span>
                                        </div>
                                    )}

                                    <input
                                        id="thumbnail-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                {errors.thumbnail && <p className="text-sm text-destructive">{errors.thumbnail}</p>}
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
