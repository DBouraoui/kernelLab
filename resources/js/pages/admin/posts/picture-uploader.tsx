import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, Image as ImageIcon, Loader2, Copy, Check } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (value.length + files.length > maxFiles) {
            toast.error(`Maximum ${maxFiles} images autorisées`);
            return;
        }

        setUploading(true);
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('images[]', file);
        });

        try {
            const response = await axios.post('/dashboard/upload-images', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onChange([...value, ...response.data.urls]);
            toast.success(`${response.data.urls.length} image(s) téléchargée(s)`);
        } catch (error) {
            toast.error("Échec du téléchargement");
        } finally {
            setUploading(false);
        }
    };

    const copyToClipboard = (url: string, index: number) => {
        // Formatage en syntaxe Markdown
        const markdownLink = `![description](${url})`;
        navigator.clipboard.writeText(markdownLink);

        setCopiedIndex(index);
        toast.success("Lien Markdown copié !");

        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const removeImage = async (urlToRemove: string) => {
        try {
            await axios.post('/dashboard/delete-image', { url: urlToRemove });
            onChange(value.filter(url => url !== urlToRemove));
            toast.success("Image supprimée");
        } catch (error) {
            toast.error("Échec de la suppression");
        }
    };

    // ... handleDragOver, handleDragLeave, handleDrop identiques à ton code ...
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
    const handleDragLeave = () => { setDragOver(false); };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleUpload({ target: { files } } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <TooltipProvider>
            <div className={`space-y-4 w-full ${className}`}>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <ImageIcon className="h-3 w-3" />
                        <span>Galerie ({value.length}/{maxFiles})</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                    {value.map((url, index) => (
                        <div
                            key={index}
                            className="relative group aspect-video border rounded-xl overflow-hidden bg-muted shadow-sm transition-all hover:ring-2 hover:ring-primary/20"
                        >
                            <img
                                src={url}
                                alt={`Uploaded ${index}`}
                                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                            />

                            {/* Overlay d'actions */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            type="button"
                                            onClick={() => copyToClipboard(url, index)}
                                            variant="secondary"
                                            size="sm"
                                            className="h-8 w-8 p-0 rounded-full"
                                        >
                                            {copiedIndex === index ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Copier le lien Markdown</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            type="button"
                                            onClick={() => removeImage(url)}
                                            variant="destructive"
                                            size="sm"
                                            className="h-8 w-8 p-0 rounded-full"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Supprimer l'image</TooltipContent>
                                </Tooltip>
                            </div>

                            {/* Petit badge info */}
                            <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 rounded text-[8px] text-white backdrop-blur-sm">
                                {url.split('/').pop()?.substring(0, 10)}...
                            </div>
                        </div>
                    ))}

                    {/* Zone d'upload */}
                    {value.length < maxFiles && (
                        <label
                            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all aspect-video
                            ${dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50'}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {uploading ? (
                                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            ) : (
                                <div className="text-center p-4">
                                    <UploadCloud className="w-6 h-6 mb-1 mx-auto text-muted-foreground" />
                                    <p className="text-[10px] font-medium text-muted-foreground">Upload</p>
                                </div>
                            )}
                            <Input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleUpload}
                                disabled={uploading}
                                accept="image/*"
                            />
                        </label>
                    )}
                </div>

                {value.length > 0 && (
                    <p className="text-[10px] text-muted-foreground italic text-center">
                        Astuce : Cliquez sur <Copy className="inline h-3 w-3" /> pour insérer l'image dans votre texte.
                    </p>
                )}
            </div>
        </TooltipProvider>
    );
}
