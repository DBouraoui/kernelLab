import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import { ControllerRenderProps } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Code,
    Quote,
    Strikethrough,
    Heading1,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    Table as TableIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Heading3,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface MarkdownEditorProps {
    field: ControllerRenderProps<{
        title: string;
        description: string;
        content: string;
        tags: string[];
        image: string[];
    }, 'content'>;
}

// Fonction pour nettoyer le contenu HTML
function cleanHtmlContent(html: string) {
    // Supprimer les balises <p> autour des titres
    let cleanedHtml = html.replace(/<p><h1>(.*?)<\/h1><\/p>/g, '<h1>$1</h1>');
    cleanedHtml = cleanedHtml.replace(
        /<p><h2>(.*?)<\/h2><\/p>/g,
        '<h2>$1</h2>',
    );
    cleanedHtml = cleanedHtml.replace(
        /<p><h3>(.*?)<\/h3><\/p>/g,
        '<h3>$1</h3>',
    );

    // Supprimer les balises <p> autour des cellules de tableau
    cleanedHtml = cleanedHtml.replace(
        /<th colspan="1" rowspan="1"><p>(.*?)<\/p><\/th>/g,
        '<th colspan="1" rowspan="1">$1</th>',
    );
    cleanedHtml = cleanedHtml.replace(
        /<td class="custom-table-cell" colspan="1" rowspan="1"><p>(.*?)<\/p><\/td>/g,
        '<td class="custom-table-cell" colspan="1" rowspan="1">$1</td>',
    );

    return cleanedHtml;
}

export default function MarkdownEditor({ field }: MarkdownEditorProps) {
    const [htmlContent, setHtmlContent] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Placeholder.configure({
                placeholder: 'Rédigez votre contenu technique ici...',
            }),
            Link,
            Image,
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'custom-table',
                },
            }),
            TableRow,
            TableCell.configure({
                HTMLAttributes: {
                    class: 'custom-table-cell',
                },
            }),
            TableHeader,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: field.value || '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none min-h-[300px] p-4 focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            console.log("Original HTML:", html); // Log du HTML original
            const cleanedHtml = cleanHtmlContent(html);
            console.log("Cleaned HTML:", cleanedHtml); // Log du HTML nettoyé
            field.onChange(cleanedHtml);
            setHtmlContent(cleanedHtml);
        },
        immediatelyRender: false,
    });

    if (!editor) {
        return (
            <div className="rounded-md border border-input bg-muted/20 min-h-[350px] animate-pulse">
                <div className="h-12 bg-muted/50 border-b border-input" />
                <div className="p-4">
                    <div className="h-4 bg-muted/50 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-muted/50 rounded w-1/2" />
                </div>
            </div>
        );
    }

    return (
        <div className=" ounded-md border border-input bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring transition-all">
            {/* Barre d'outils */}
            <div className="flex flex-wrap items-center gap-0.5 p-2 bg-muted/50 border-b border-input">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().toggleHeading({ level: 1 }).run();
                    }}
                    className={`h-8 px-2 ${editor.isActive('heading', { level: 1 }) ? 'bg-accent' : ''}`}
                    title="Titre 1"
                >
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                    className={`h-8 px-2 ${editor.isActive('heading', { level: 2 }) ? 'bg-accent' : ''}`}
                    title="Titre 2"
                >
                    <Heading2 className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().toggleHeading({ level: 3 }).run();
                    }}
                    className={`h-8 px-2 ${editor.isActive('heading', { level: 3 }) ? 'bg-accent' : ''}`}
                    title="Titre 2"
                >
                    <Heading3 className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`h-8 px-2 ${editor.isActive('bold') ? 'bg-accent' : ''}`}
                    title="Gras (Ctrl+B)"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`h-8 px-2 ${editor.isActive('italic') ? 'bg-accent' : ''}`}
                    title="Italique (Ctrl+I)"
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`h-8 px-2 ${editor.isActive('strike') ? 'bg-accent' : ''}`}
                    title="Barré"
                >
                    <Strikethrough className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().toggleBulletList().run();
                    }}
                    className={`h-8 px-2 ${editor.isActive('bulletList') ? 'bg-accent' : ''}`}
                    title="Liste à puces"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().toggleOrderedList().run();
                    }}
                    className={`h-8 px-2 ${editor.isActive('orderedList') ? 'bg-accent' : ''}`}
                    title="Liste numérotée"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().toggleCodeBlock().run();
                    }}
                    className={`h-8 px-2 ${editor.isActive('codeBlock') ? 'bg-accent' : ''}`}
                    title="Bloc de code"
                >
                    <Code className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().toggleBlockquote().run();
                    }}
                    className={`h-8 px-2 ${editor.isActive('blockquote') ? 'bg-accent' : ''}`}
                    title="Citation"
                >
                    <Quote className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        const url = window.prompt('URL');
                        if (url) {
                            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                        }
                    }}
                    className={`h-8 px-2 ${editor.isActive('link') ? 'bg-accent' : ''}`}
                    title="Lien"
                >
                    <LinkIcon className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        const url = window.prompt('URL de l\'image');
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run();
                        }
                    }}
                    className="h-8 px-2"
                    title="Image"
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
                    }}
                    className="h-8 px-2"
                    title="Tableau"
                >
                    <TableIcon className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().setTextAlign('left').run();
                    }}
                    className={`h-8 px-2 ${editor.isActive({ textAlign: 'left' }) ? 'bg-accent' : ''}`}
                    title="Alignement à gauche"
                >
                    <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().setTextAlign('center').run();
                    }}
                    className={`h-8 px-2 ${editor.isActive({ textAlign: 'center' }) ? 'bg-accent' : ''}`}
                    title="Alignement au centre"
                >
                    <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().setTextAlign('right').run();
                    }}
                    className={`h-8 px-2 ${editor.isActive({ textAlign: 'right' }) ? 'bg-accent' : ''}`}
                    title="Alignement à droite"
                >
                    <AlignRight className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                    className="h-8 px-2"
                    title="Annuler"
                >
                    <Undo className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                    className="h-8 px-2"
                    title="Refaire"
                >
                    <Redo className="h-4 w-4" />
                </Button>
            </div>

            {/* Zone de saisie avec styles prose pour un rendu visuel en temps réel */}
            <div className="relative">
                <EditorContent editor={editor} />
            </div>

            {/* Section de prévisualisation */}
            <div className="rounded-md border border-input bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring transition-all mt-4">
                <h3 className="p-2 bg-muted/50 border-b border-input">Prévisualisation</h3>
                <div className="p-4 preview-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>

            {/* Styles CSS pour la prévisualisation */}
            <style>{`
                .preview-content h1 {
                    font-size: 2em;
                    font-weight: bold;
                    margin: 1em 0;
                }
                .preview-content h2 {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin: 1em 0;
                }
                .preview-content h3 {
                    font-size: 1.25em;
                    font-weight: bold;
                    margin: 1em 0;
                }
                .preview-content table {
                    border-collapse: collapse;
                    width: 100%;
                    margin: 1em 0;
                }
                .preview-content th,
                .preview-content td {
                    border: 1px solid #e2e8f0;
                    padding: 0.5em;
                }
                .preview-content th {
                    background-color: #f7fafc;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
}
