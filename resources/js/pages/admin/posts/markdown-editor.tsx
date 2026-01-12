import { ControllerRenderProps } from 'react-hook-form';
import {
    Edit3,
    Eye,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export default function MarkdownEditor({ field }: any) {
    return (
        <>
            <Tabs defaultValue="edit" className="w-full border rounded-md overflow-hidden">
                <div className="flex items-center justify-between bg-muted/50 px-3 py-1 border-b">
                    <TabsList className="bg-transparent h-9">
                        <TabsTrigger value="edit" className="gap-2 data-[state=active]:bg-background">
                            <Edit3 className="h-3.5 w-3.5" /> Édition
                        </TabsTrigger>
                        <TabsTrigger value="preview" className="gap-2 data-[state=active]:bg-background">
                            <Eye className="h-3.5 w-3.5" /> Aperçu
                        </TabsTrigger>
                    </TabsList>
                    <span className="text-[10px] font-mono text-muted-foreground hidden sm:block">
                            Markdown supporté
                        </span>
                </div>

                <TabsContent value="edit" className="m-0 p-0">
                    <Textarea
                        {...field}
                        placeholder="Écrivez votre contenu en Markdown ici..."
                        className="min-h-[400px] border-0 rounded-none focus-visible:ring-0 font-mono text-sm p-4 resize-y"
                    />
                </TabsContent>

                <TabsContent value="preview" className="m-0 p-4 min-h-[400px] bg-background">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        {field.value ? (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    // On réutilise tes styles custom pour les titres et listes
                                    h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                                    h2: ({ ...props }) => <h2 className="text-xl font-semibold mb-3 border-b pb-1" {...props} />,
                                    ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
                                    ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                                    code: ({ inline, ...props }: any) =>
                                        inline ?
                                            <code className="bg-muted px-1 rounded text-sm" {...props} /> :
                                            <code {...props} />,
                                    pre: ({ ...props }) => <pre className="rounded-lg p-4 bg-slate-950 overflow-x-auto" {...props} />,
                                    a: ({ ...props }) => <a className="text-blue-500 hover:underline" target="_blank" {...props} />,
                                }}
                            >
                                {field.value}
                            </ReactMarkdown>
                        ) : (
                            <p className="text-muted-foreground italic text-center pt-20">
                                Rien à prévisualiser pour le moment...
                            </p>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </>
    )
}
