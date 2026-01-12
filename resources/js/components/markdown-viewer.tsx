import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import 'highlight.js/styles/github-dark.css'; // Assure-toi d'avoir installé highlight.js

// Composant pour les blocs de code avec bouton copie
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
        <div className="relative my-6 group rounded-xl overflow-hidden border border-border/50 bg-[#0d1117]">
            {/* Header du bloc de code (Style Mac/Term) */}
            <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-b border-border/10">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="ml-2 text-xs text-muted-foreground font-mono lowercase flex items-center gap-1">
                        <Terminal className="w-3 h-3" />
                        {language}
                    </span>
                </div>
                <button
                    onClick={handleCopy}
                    className="text-muted-foreground hover:text-white transition-colors"
                    title="Copier le code"
                >
                    {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
            {/* Zone de code */}
            <div className="overflow-x-auto p-4">
                <code className={cn(className, "text-sm font-mono leading-relaxed")} {...props}>
                    {children}
                </code>
            </div>
        </div>
    );
};

export default function MarkdownViewer({ content }: { content: string }) {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-border/50
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic">

            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // On garde tes composants custom ici
                    code: CodeBlock,
                    h2: ({node, ...props}) => <h2 id={props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} className="scroll-mt-24 text-3xl font-bold mt-12 mb-6" {...props} />,
                    h3: ({node, ...props}) => <h3 id={props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} className="scroll-mt-24 text-2xl font-semibold mt-8 mb-4" {...props} />,
                    // ... le reste de tes composants
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
