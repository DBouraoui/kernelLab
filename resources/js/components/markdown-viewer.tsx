import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import 'highlight.js/styles/github-dark.css';

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const [isCopied, setIsCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : 'text';
    const codeString = String(children).replace(/\n$/, '');

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    if (inline) {
        return (
            <code className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono text-primary font-medium" {...props}>
                {children}
            </code>
        );
    }

    return (
        <div className="relative my-8 group rounded-xl overflow-hidden border border-border/50 bg-[#0d1117] shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2 bg-muted/10 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="ml-2 text-[10px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-1">
                        <Terminal className="w-3 h-3" />
                        {language}
                    </span>
                </div>
                <button onClick={handleCopy} className="p-1 hover:bg-white/10 rounded-md transition-colors">
                    {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </button>
            </div>
            <div className="overflow-x-auto p-4">
                <code className={cn(className, "text-sm font-mono leading-relaxed text-slate-300")} {...props}>
                    {children}
                </code>
            </div>
        </div>
    );
};

export default function MarkdownViewer({ content }: { content: string }) {
    return (
        <div className="prose prose-slate dark:prose-invert max-w-none
                /* Headings */
                prose-headings:font-black prose-headings:tracking-tighter prose-headings:scroll-mt-28
                /* Links */
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                /* UI Elements */
                prose-img:rounded-[2rem] prose-img:border prose-img:border-border/50
                prose-hr:border-border/60">

            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    code: CodeBlock,

                    // --- TITRES (H1, H2, H3) ---
                    h1: ({node, ...props}) => (
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mt-16 mb-10 text-foreground" {...props} />
                    ),

                    h2: ({node, ...props}) => {
                        // On génère l'ID pour la table des matières (ToC)
                        const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                        return (
                            <h2
                                id={id}
                                className="group flex items-center gap-3 text-2xl md:text-3xl font-bold mt-20 mb-8 pb-3 border-b border-border/50 text-foreground scroll-mt-28"
                                {...props}
                            >
                                <span className="text-primary opacity-50 group-hover:opacity-100 transition-opacity"></span>
                                {props.children}
                            </h2>
                        );
                    },

                    h3: ({node, ...props}) => {
                        const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                        return (
                            <h3
                                id={id}
                                className="text-xl md:text-2xl font-bold mt-12 mb-5 text-foreground/90 flex items-center gap-2 scroll-mt-28"
                                {...props}
                            >
                                <div className="h-4 w-1 bg-primary/40 rounded-full" />
                                {props.children}
                            </h3>
                        );
                    },

                    // --- FIX TABLEAU : LE HEADER ---
                    table: ({node, ...props}) => (
                        <div className="my-8 w-full overflow-x-auto rounded-md shadow-sm text-orange-800">
                            <table className="w-full  text-sm" {...props} />
                        </div>
                    ),
                    thead: ({node, ...props}) => (
                        <thead className="bg-zinc-100 dark:bg-zinc-900" {...props} />
                    ),
                    th: ({node, ...props}) => (
                        <th
                            className="px-4 py-3 text-left font-black   border-r border-border last:border-0 uppercase tracking-wider text-[11px]"
                            {...props}
                        />
                    ),
                    td: ({node, ...props}) => (
                        <td className="px-4 py-3 !text-muted-foreground border-r border-border last:border-0" {...props} />
                    ),
                    tr: ({node, ...props}) => (
                        <tr className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors" {...props} />
                    ),

                    // --- LISTES ---
                    ul: ({node, ...props}) => <ul className="my-6 ml-6 list-disc space-y-2 !text-muted-foreground" {...props} />,
                    ol: ({node, ...props}) => <ol className="my-6 ml-6 list-decimal space-y-2 !text-muted-foreground" {...props} />,
                    li: ({node, ...props}) => <li className="pl-2" {...props} />,

                    // --- PARAGRAPHES ---
                    p: ({node, ...props}) => <p className="leading-relaxed mb-6 !text-muted-foreground/90" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
