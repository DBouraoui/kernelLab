import React, { useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UploadCloud, ArrowRight, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function Converter() {
    const [targetWidth, setTargetWidth] = useState<string>("1920");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Gestion du Drag & Drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (selectedFile: File) => {
        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(selectedFile.type)) {
            toast.error("Format non supporté. Utilisez JPG ou PNG.");
            return;
        }
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    // Soumission du formulaire (via Fetch standard pour gérer le Blob response)
    const handleSubmit = async () => {
        if (!file) return;

        setIsConverting(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('width', targetWidth);

        try {
            // On utilise fetch natif ici car Inertia gère mal les téléchargements de blobs directs sans redirection
            const response = await fetch('/dashboard/pictures/convert', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(
                        document.cookie
                            .split('; ')
                            .find((row) => row.startsWith('XSRF-TOKEN='))
                            ?.split('=')[1] || ''
                    ),
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) throw new Error("Erreur conversion");

            // Création du lien de téléchargement
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const oldSize = file.size;
            const newSize = blob.size;
            const gain = (((oldSize - newSize) / oldSize) * 100).toFixed(0);

            toast.success(`Réduit de ${gain}% ! (${(newSize / 1024).toFixed(0)} KB)`);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name.split('.')[0] + ".webp"; // Change l'extension
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            toast.success("Conversion réussie !");

        } catch (error) {
            console.error(error);
            toast.error("Une erreur est survenue lors de la conversion.");
        } finally {
            setIsConverting(false);
        }
    };

    const reset = () => {
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <GuestLayout>
            <Head title="Convertisseur JPG/PNG vers WebP" />

            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
                {/* Background FX */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="text-center space-y-4 mb-10 z-10">
                    <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/5 text-primary uppercase tracking-widest text-xs font-bold">
                        Outil Gratuit
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                        Image vers <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">WebP</span>
                    </h1>
                    <p className="text-muted-foreground max-w-lg mx-auto text-lg">
                        Réduisez la taille de vos images jusqu'à 80% sans perte visible de qualité. Idéal pour le SEO.
                    </p>
                </div>

                <Card className="w-full max-w-2xl border-border/50 shadow-2xl bg-card/50 backdrop-blur-xl overflow-hidden relative z-10">
                    <CardContent className="p-8">

                        {!file ? (
                            // --- ZONE DE DROP ---
                            <div
                                className={`
                                    border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                                    ${isDragging ? 'border-primary bg-primary/5 scale-[0.98]' : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30'}
                                `}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={handleFileSelect}
                                />
                                <div className="p-4 rounded-full bg-background shadow-lg mb-4 group">
                                    <UploadCloud className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <p className="text-lg font-bold">Cliquez ou déposez votre image ici</p>
                                <p className="text-sm text-muted-foreground mt-2">JPG, PNG supportés (Max 10MB)</p>
                            </div>
                        ) : (
                            // --- PREVIEW & ACTION ---
                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-6 items-center bg-muted/30 p-4 rounded-2xl border border-border/50">
                                    <div className="relative h-32 w-32 shrink-0 rounded-xl overflow-hidden border border-border bg-checkerboard">
                                        {/* Pattern damier pour la transparence */}
                                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
                                        <img src={preview!} alt="Preview" className="h-full w-full object-cover relative z-10" />
                                    </div>

                                    <div className="flex-1 space-y-2 text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-2">
                                            <Badge variant="secondary">{file.name.split('.').pop()?.toUpperCase()}</Badge>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                            <Badge className="bg-blue-600 hover:bg-blue-700">WEBP</Badge>
                                        </div>
                                        <p className="font-medium truncate max-w-[200px] md:max-w-xs">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Taille originale : {(file.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>

                                    <Button variant="ghost" size="icon" onClick={reset} className="shrink-0 text-muted-foreground hover:text-destructive">
                                        <RefreshCw className="h-5 w-5" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                            Largeur Max (px)
                                        </label>
                                        <select
                                            value={targetWidth}
                                            onChange={(e) => setTargetWidth(e.target.value)}
                                            className="w-full bg-background border border-border rounded-lg h-10 px-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                                        >
                                            <option value="800">800px (Blog)</option>
                                            <option value="1200">1200px (Standard)</option>
                                            <option value="1920">1920px (Full HD)</option>
                                            <option value="2560">2560px (2K)</option>
                                            <option value="3840">Original</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                            Nettoyage
                                        </label>
                                        <div className="h-10 flex items-center px-3 bg-primary/5 border border-primary/20 rounded-lg text-primary text-xs font-medium">
                                            Metadata EXIF supprimées
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    disabled={isConverting}
                                    size="lg"
                                    className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform"
                                >
                                    {isConverting ? (
                                        <span className="flex items-center gap-2 animate-pulse">
                                            <RefreshCw className="h-5 w-5 animate-spin" /> Conversion en cours...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Download className="h-5 w-5" /> Convertir & Télécharger
                                        </span>
                                    )}
                                </Button>
                            </div>
                        )}

                    </CardContent>
                </Card>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
                    {[
                        { title: "Ultra Rapide", desc: "Conversion instantanée sans file d'attente." },
                        { title: "Sécurisé", desc: "Vos fichiers sont supprimés après traitement." },
                        { title: "Haute Qualité", desc: "Compression intelligente pour le web." },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl bg-muted/20 border border-border/30">
                            <h3 className="font-bold mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}
