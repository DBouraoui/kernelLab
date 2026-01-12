import { Link, router } from '@inertiajs/react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CalendarDays, Clock, Sparkles, Bell, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PostInterface } from '@/types';
import { formatDate } from "@/types/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { newsletter } from '@/routes';

export const PostCard = ({ post }: { post: PostInterface }) => {
    const isFuture = post.published_at ? new Date(post.published_at) > new Date() : false;

    // Le contenu de la carte (extrait pour éviter la répétition)
    const CardBody = (
        <Card className={`h-full flex flex-col overflow-hidden border-transparent bg-card/50 shadow-sm transition-all duration-300 rounded-2xl ${isFuture ? 'opacity-80' : 'hover:shadow-xl hover:border-muted-foreground/20 group'}`}>
            <div className="relative aspect-video overflow-hidden bg-muted">
                {post.thumbnail ? (
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${!isFuture && 'group-hover:scale-105'}`}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground/20">
                        <Sparkles className="h-10 w-10" />
                    </div>
                )}

                {isFuture && (
                    <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="bg-background/90 p-2 rounded-full shadow-lg">
                            <Lock className="h-5 w-5 text-blue-500" />
                        </div>
                    </div>
                )}

                {post.category && (
                    <div className="absolute top-3 left-3">
                        <Badge className="bg-background/90 text-foreground backdrop-blur-md border-none shadow-sm uppercase text-[10px] tracking-wider font-bold px-2.5 py-1">
                            {post.category}
                        </Badge>
                    </div>
                )}
            </div>

            <CardContent className="flex-grow p-5 space-y-3 text-left">
                <div className="flex items-center gap-2 text-xs font-medium">
                    {isFuture ? (
                        <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Bientôt : {formatDate(post.published_at)}
                        </span>
                    ) : (
                        <span className="text-muted-foreground flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDate(post.published_at)}
                        </span>
                    )}
                </div>

                <h3 className={`text-xl font-bold leading-tight transition-colors line-clamp-2 ${!isFuture && 'group-hover:text-primary'}`}>
                    {post.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.description}
                </p>
            </CardContent>

            <CardFooter className="p-5 mt-auto flex items-center justify-between border-t border-border/40 pt-4">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {post.reading_time || '5 min'} min
                </div>
                <div className="flex gap-1">
                    {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded font-mono">
                            #{tag}
                        </span>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );

    // Si c'est dans le futur, on affiche la Popin (Dialog)
    if (isFuture) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <button className="h-full w-full cursor-help outline-none">
                        {CardBody}
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-3xl">
                    <DialogHeader className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                            <Bell className="h-8 w-8 text-blue-500 animate-bounce" />
                        </div>
                        <DialogTitle className="text-2xl font-bold">Un peu de patience !</DialogTitle>
                        <DialogDescription className="text-base pt-2">
                            Cet article est actuellement en cours de finalisation. Il sera disponible automatiquement le <span className="font-bold text-foreground">{formatDate(post.published_at)}</span>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 mt-4">
                        <Button className="w-full rounded-xl" onClick={() => router.visit(newsletter())}>
                            Prévenez-moi par mail
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    // Sinon, Link normal
    return (
        <Link href={`/blog/${post.slug}`} className="h-full block">
            {CardBody}
        </Link>
    );
};
