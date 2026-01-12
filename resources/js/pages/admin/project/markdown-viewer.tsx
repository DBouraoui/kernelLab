import { MarkdownHooks } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export default function MarkdownViewer({data}: {data: string}){
    return (
        <article className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-[#282c34] prose-pre:p-0">
            <MarkdownHooks
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // --- TITRES ---
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-primary" {...props} />,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-6 mb-3 border-b pb-2" {...props} />,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,

                    // --- LISTES ---
                    // list-disc pour les puces, pl-6 pour l'indentation
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4 space-y-1" {...props} />,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4 space-y-1" {...props} />,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,

                    // --- TEXTE & PARAGRAPHES ---
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    p: ({node, ...props}) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    blockquote: ({node, ...props}) => <blockquote className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground" {...props} />,

                    // --- LIENS & CODE (Déjà fait) ---
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium" />,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    pre: ({node, ...props}) => <pre {...props} className="rounded-lg overflow-x-auto p-4 bg-slate-950 my-4" />,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    code: ({node, ...props}) => <code {...props} className="bg-muted px-[0.3rem] py-[0.2rem] rounded text-sm font-mono font-semibold" />
                }}
            >
                {data}
            </MarkdownHooks>
        </article>
    )
}
