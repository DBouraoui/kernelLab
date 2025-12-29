import { useState } from "react";
import { Input } from "@/components/ui/input";
import { UploadCloud, X } from "lucide-react";
import axios from "axios";

export default function PictureUploader({ value, onChange }: { value: string[], onChange: (urls: string[]) => void }) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

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
        } catch (error) {
            console.error("Erreur upload:", error);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (urlToRemove: string) => {
        onChange(value.filter(url => url !== urlToRemove));
    };

    return (
        <div className="space-y-4 w-full">
            <div className="grid grid-cols-3 gap-4">
                {value.map((url, index) => (
                    <div key={index} className="relative group aspect-video border rounded-lg overflow-hidden bg-muted">
                        <img src={url} alt="Preview" className="object-cover w-full h-full" />
                        <button
                            type="button"
                            onClick={() => removeImage(url)}
                            className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}

                <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent hover:border-primary transition-all aspect-video">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploading ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        ) : (
                            <>
                                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">Cliquez pour ajouter</p>
                            </>
                        )}
                    </div>
                    <Input type="file" multiple className="hidden" onChange={handleUpload} disabled={uploading} accept="image/*" />
                </label>
            </div>
        </div>
    );
}
