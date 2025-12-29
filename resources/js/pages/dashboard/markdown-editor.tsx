import SimpleMDE from 'react-simplemde-editor';
import { ControllerRenderProps } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import { useMemo } from 'react';



export default function MarkdownEditor({field}: {field: ControllerRenderProps<{
        title: string;
        description: string;
        content: string;
        tags: string[];
    }, 'content'>}) {

    const mdeOptions = useMemo(() => {
        return {
            spellChecker: false,
            autosave: {
                enabled: true,
                uniqueId: "add-post-content",
                delay: 1000,
            },
            status: false, // Cache la barre de statut en bas (optionnel)
            minHeight: "300px",
            autofocus: false,
            placeholder: "Rédigez votre contenu technique ici...",
        };
    }, []);

 return (
     <>
         <div className="rounded-md border border-input bg-transparent overflow-hidden">
             <SimpleMDE options={mdeOptions} {...field} />
         </div>
     </>
 )
}
