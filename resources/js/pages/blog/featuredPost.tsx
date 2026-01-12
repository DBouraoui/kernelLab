import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PostInterface } from '@/types';
import {formatDate} from "@/types/utils";

export const FeaturedPost = ({ post }: { post: PostInterface }) => (
    <Link href={`/blog/${post.slug}`} className="block group mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-auto overflow-hidden bg-muted h-full min-h-[300px]">
                    {post.thumbnail && (
                        <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                </div>

                <div className="p-6 md:p-10 flex flex-col justify-center space-y-4">
                    <div className="flex items-center justify-around gap-3 mb-2">
                        {post.category && (
                            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 uppercase tracking-wider font-bold">
                                {post.category}
                            </Badge>
                        )}
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" /> {formatDate(post.published_at)}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-4 w-4" /> {post.reading_time} min
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                    </h2>

                    <p className="text-lg text-muted-foreground line-clamp-3">
                        {post.description}
                    </p>

                    <div className="pt-4 flex items-center gap-4">
                        <div className="flex gap-2">
                            {post.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="font-normal text-xs text-muted-foreground">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                        <Button variant="ghost" className="ml-auto group-hover:translate-x-1 transition-transform p-0 hover:bg-transparent">
                            Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </Link>
);
