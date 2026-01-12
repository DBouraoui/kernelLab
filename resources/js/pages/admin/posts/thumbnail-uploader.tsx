import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, Loader2, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface ThumbnailUploaderProps {
    value: string;
    onChange: (url: string) => void;
}

export default function ThumbnailUploader({ value, onChange }: ThumbnailUploaderProps) {
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('/dashboard/upload-thumbnail', formData);
            onChange(response.data.url);
            toast.success("Image de couverture mise à jour");
        } catch (error) {
            toast.error("Erreur lors de l'upload");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!value) return;

        setLoading(true);
        try {
            await axios.post('/dashboard/delete-thumbnail', { url: value });
            onChange(""); // On vide le champ dans le formulaire
            toast.success("Image supprimée du serveur");
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la suppression sur le serveur");
            // Optionnel: on vide quand même le champ si tu veux forcer
            // onChange("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative group w-full aspect-video rounded-xl border-2 border-dashed border-muted-foreground/20 overflow-hidden bg-muted/50 transition-all hover:border-primary/50">
            {value ? (
                <>
                    <img src={value} className="w-full h-full object-cover" alt="Cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleDelete}
                            disabled={loading}
                            className="rounded-full shadow-lg"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
                            Supprimer définitivement
                        </Button>
                    </div>
                </>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-6">
                    {loading ? (
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    ) : (
                        <>
                            <div className="bg-primary/10 p-3 rounded-full mb-3">
                                <UploadCloud className="h-6 w-6 text-primary" />
                            </div>
                            <p className="text-sm font-semibold">Image de couverture</p>
                            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
                                PNG, JPG ou WEBP (Max 3MB)
                            </p>
                        </>
                    )}
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleUpload}
                        accept="image/*"
                        disabled={loading}
                    />
                </label>
            )}
        </div>
    );
}
