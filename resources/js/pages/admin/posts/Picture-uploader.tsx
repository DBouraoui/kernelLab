import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, Image as ImageIcon, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface PictureUploaderProps {
    value: string[];
    onChange: (urls: string[]) => void;
    maxFiles?: number;
    className?: string;
}

export default function PictureUploader({
                                            value,
                                            onChange,
                                            maxFiles = 4,
                                            className = ""
                                        }: PictureUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (value.length + files.length > maxFiles) {
            toast.error(`Maximum ${maxFiles} images autorisées`);
            return;
        }

        setUploading(true);
        const formData = new FormData();

        // On ajoute chaque fichier au FormData
        Array.from(files).forEach(file => {
            formData.append('images[]', file);
        });

        try {
            // On envoie les images vers une route dédiée
            const response = await axios.post('/dashboard/upload-images', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // On fusionne les nouvelles URLs avec les anciennes
            onChange([...value, ...response.data.urls]);
            toast.success(`${response.data.urls.length} image(s) téléchargée(s)`);
        } catch (error) {
            console.error("Erreur upload:", error);
            toast.error("Échec du téléchargement des images");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = async (urlToRemove: string) => {
        try {
            // 1. Suppression physique sur le serveur
            await axios.post('/dashboard/delete-image', { url: urlToRemove });

            // 2. Mise à jour de l'état local (visuel) seulement si le serveur a réussi
            onChange(value.filter(url => url !== urlToRemove));
            toast.success("Image supprimée");
        } catch (error) {
            console.error("Erreur lors de la suppression physique:", error);
            toast.error("Échec de la suppression de l'image");
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const input = document.createElement('input');
            input.type = 'file';
            input.files = files;
            handleUpload({ target: { files } } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <div className={`space-y-4 w-full ${className}`}>
            {/* Header avec instructions */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <ImageIcon className="h-4 w-4" />
                <span>Glissez-déposez ou cliquez pour ajouter des images</span>
            </div>

            {/* Grille d'images */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {value.map((url, index) => (
                    <div
                        key={index}
                        className="relative group aspect-square border rounded-lg overflow-hidden bg-muted"
                    >
                        <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="object-cover w-full h-full"
                        />
                        <Button
                            type="button"
                            onClick={() => removeImage(url)}
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 bg-destructive/80 hover:bg-destructive"
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                ))}

                {/* Zone de téléchargement */}
                <label
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-all aspect-square
            ${dragOver ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary hover:bg-accent'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center w-full h-full p-4">
                        {uploading ? (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                <span className="text-sm">Téléchargement...</span>
                            </div>
                        ) : (
                            <>
                                <UploadCloud className="w-8 h-8 mb-1 text-muted-foreground" />
                                <p className="text-xs text-center text-muted-foreground">
                                    {maxFiles - value.length > 0
                                        ? `Ajouter ${maxFiles - value.length} image(s)`
                                        : 'Maximum atteint'}
                                </p>
                            </>
                        )}
                    </div>
                    <Input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleUpload}
                        disabled={uploading || value.length >= maxFiles}
                        accept="image/*"
                    />
                </label>
            </div>

            {/* Indicateurs */}
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{value.length} image(s) sélectionnée(s)</span>
                {value.length < maxFiles && (
                    <span>Taille max: 5MB par image</span>
                )}
            </div>
        </div>
    );
}
