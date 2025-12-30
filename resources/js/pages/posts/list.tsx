import { Head, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Post } from '@/types';
import { dashboard } from '@/routes';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Calendar, Eye, ArrowUpDown, Search, Filter, X, Tag, Image, Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { toast } from 'sonner';

export default function List({ posts }: { posts: Post[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Voir les articles', href: '/dashboard/view' },
    ];

    const postsArray = Object.values(posts);
    const [isLoading, setIsLoading] = useState(false);

    const [sortBy, setSortBy] = useState<string>('created_desc');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filterWithImages, setFilterWithImages] = useState<boolean | null>(null);
    const [dateRange, setDateRange] = useState<string>('all');

    // Extraire tous les tags uniques
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        postsArray.forEach(post => {
            post.tags?.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [postsArray]);

    // Fonction de tri et filtrage
    const sortedAndFilteredPosts = useMemo(() => {
        let filtered = [...postsArray];

        // Filtrage par recherche
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.description.toLowerCase().includes(query) ||
                post.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Filtrage par tags
        if (selectedTags.length > 0) {
            filtered = filtered.filter(post =>
                post.tags?.some(tag => selectedTags.includes(tag))
            );
        }

        // Filtrage par présence d'images
        if (filterWithImages !== null) {
            filtered = filtered.filter(post =>
                filterWithImages ? (post.image && post.image.length > 0) : (!post.image || post.image.length === 0)
            );
        }

        // Filtrage par période
        if (dateRange !== 'all') {
            const now = new Date();
            const filterDate = new Date();

            switch (dateRange) {
                case 'today':
                    filterDate.setHours(0, 0, 0, 0);
                    break;
                case 'week':
                    filterDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    filterDate.setMonth(now.getMonth() - 1);
                    break;
                case '3months':
                    filterDate.setMonth(now.getMonth() - 3);
                    break;
                case 'year':
                    filterDate.setFullYear(now.getFullYear() - 1);
                    break;
            }

            filtered = filtered.filter(post =>
                new Date(post.created_at) >= filterDate
            );
        }

        // Tri
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'created_desc':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'created_asc':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case 'updated_desc':
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                case 'updated_asc':
                    return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
                case 'title_asc':
                    return a.title.localeCompare(b.title);
                case 'title_desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [postsArray, sortBy, searchQuery, selectedTags, filterWithImages, dateRange]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const clearAllFilters = () => {
        setSearchQuery('');
        setSelectedTags([]);
        setFilterWithImages(null);
        setDateRange('all');
        setSortBy('created_desc');
    };

    const activeFiltersCount =
        (searchQuery ? 1 : 0) +
        selectedTags.length +
        (filterWithImages !== null ? 1 : 0) +
        (dateRange !== 'all' ? 1 : 0);

    function onDelete(post : Post) {
        setIsLoading(true);
        router.delete(`/dashboard/post/${post.id}`, {
            onSuccess: () => {
                toast.success('L\'article a été supprimer avec succès !');
            },
            onError: () => {
                toast.error('erreur l\'or de la suppression du post !');
            },
            onFinish:()=> {
                setIsLoading(false);
        }
        });
    }

    function openPopinUpdate(item :Post){

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Voir les articles" />

            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Articles
                                </h1>
                                <p className="text-muted-foreground mt-2">
                                    Gérez et consultez tous vos articles publiés
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="text-lg px-4 py-2">
                                    {sortedAndFilteredPosts.length} / {postsArray.length} article{postsArray.length > 1 ? 's' : ''}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Barre de recherche, filtres et tri */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Recherche */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher par titre, description ou tag..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Filtres */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="relative">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filtres
                                        {activeFiltersCount > 0 && (
                                            <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center" variant="destructive">
                                                {activeFiltersCount}
                                            </Badge>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80" align="end">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold">Filtres</h4>
                                            {activeFiltersCount > 0 && (
                                                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                                                    Réinitialiser
                                                </Button>
                                            )}
                                        </div>

                                        <Separator />

                                        {/* Filtre par période */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Période
                                            </label>
                                            <Select value={dateRange} onValueChange={setDateRange}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Toutes les périodes</SelectItem>
                                                    <SelectItem value="today">Aujourd'hui</SelectItem>
                                                    <SelectItem value="week">Cette semaine</SelectItem>
                                                    <SelectItem value="month">Ce mois</SelectItem>
                                                    <SelectItem value="3months">3 derniers mois</SelectItem>
                                                    <SelectItem value="year">Cette année</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Separator />

                                        {/* Filtre par images */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                <Image className="h-4 w-4" />
                                                Images
                                            </label>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="with-images"
                                                        checked={filterWithImages === true}
                                                        onCheckedChange={(checked) =>
                                                            setFilterWithImages(checked ? true : null)
                                                        }
                                                    />
                                                    <label htmlFor="with-images" className="text-sm cursor-pointer">
                                                        Avec images
                                                    </label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="without-images"
                                                        checked={filterWithImages === false}
                                                        onCheckedChange={(checked) =>
                                                            setFilterWithImages(checked ? false : null)
                                                        }
                                                    />
                                                    <label htmlFor="without-images" className="text-sm cursor-pointer">
                                                        Sans images
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Filtre par tags */}
                                        {allTags.length > 0 && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium flex items-center gap-2">
                                                    <Tag className="h-4 w-4" />
                                                    Tags ({selectedTags.length} sélectionné{selectedTags.length > 1 ? 's' : ''})
                                                </label>
                                                <div className="max-h-48 overflow-y-auto space-y-2">
                                                    {allTags.map(tag => (
                                                        <div key={tag} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`tag-${tag}`}
                                                                checked={selectedTags.includes(tag)}
                                                                onCheckedChange={() => toggleTag(tag)}
                                                            />
                                                            <label htmlFor={`tag-${tag}`} className="text-sm cursor-pointer flex-1">
                                                                {tag}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </PopoverContent>
                            </Popover>

                            {/* Tri */}
                            <div className="flex items-center gap-2">
                                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-[220px]">
                                        <SelectValue placeholder="Trier par" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="created_desc">Plus récents</SelectItem>
                                        <SelectItem value="created_asc">Plus anciens</SelectItem>
                                        <SelectItem value="updated_desc">Dernière modification</SelectItem>
                                        <SelectItem value="updated_asc">Première modification</SelectItem>
                                        <SelectItem value="title_asc">Titre (A → Z)</SelectItem>
                                        <SelectItem value="title_desc">Titre (Z → A)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Filtres actifs */}
                        {activeFiltersCount > 0 && (
                            <div className="flex flex-wrap gap-2 items-center">
                                <span className="text-sm text-muted-foreground">Filtres actifs:</span>
                                {searchQuery && (
                                    <Badge variant="secondary" className="gap-1">
                                        Recherche: {searchQuery}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                                    </Badge>
                                )}
                                {dateRange !== 'all' && (
                                    <Badge variant="secondary" className="gap-1">
                                        Période: {dateRange}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => setDateRange('all')} />
                                    </Badge>
                                )}
                                {filterWithImages !== null && (
                                    <Badge variant="secondary" className="gap-1">
                                        {filterWithImages ? 'Avec images' : 'Sans images'}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterWithImages(null)} />
                                    </Badge>
                                )}
                                {selectedTags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="gap-1">
                                        {tag}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTag(tag)} />
                                    </Badge>
                                ))}
                                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                                    Tout effacer
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Grille d'articles */}
                    {sortedAndFilteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {sortedAndFilteredPosts.map((item: Post) => (
                                <Card
                                    key={item.id}
                                    className="group flex flex-col h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                                >
                                    {item.image && item.image.length > 0 && (
                                        <div className="relative overflow-hidden bg-muted">
                                            <Carousel className="w-full">
                                                <CarouselContent>
                                                    {item.image.map((img, index) => (
                                                        <CarouselItem key={index}>
                                                            <div className="relative aspect-video overflow-hidden">
                                                                <img
                                                                    src={img}
                                                                    alt={`${item.title} - Image ${index + 1}`}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                            </div>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                {item.image.length > 1 && (
                                                    <>
                                                        <CarouselPrevious className="left-2" />
                                                        <CarouselNext className="right-2" />
                                                    </>
                                                )}
                                            </Carousel>
                                            {item.image.length > 1 && (
                                                <Badge className="absolute top-2 right-2 bg-black/70">
                                                    {item.image.length} photos
                                                </Badge>
                                            )}
                                        </div>
                                    )}

                                    <CardHeader className="space-y-3">
                                        <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </CardTitle>

                                        {item.tags && item.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {item.tags.slice(0, 3).map((tag, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="outline"
                                                        className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                                        onClick={() => {
                                                            if (!selectedTags.includes(tag)) {
                                                                toggleTag(tag);
                                                            }
                                                        }}
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                {item.tags.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{item.tags.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                    </CardHeader>

                                    <CardContent className="flex-1 space-y-4">
                                        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                                            {item.description}
                                        </CardDescription>

                                        <div className="flex flex-col gap-2 text-xs text-muted-foreground pt-2 border-t">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-3 w-3" />
                                                <span>Créé le {new Date(item.created_at).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}</span>
                                            </div>
                                            {item.created_at !== item.updated_at && (
                                                <div className="flex items-center gap-2">
                                                    <Eye className="h-3 w-3" />
                                                    <span>Mis à jour le {new Date(item.updated_at).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex gap-2 bg-muted/50 p-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                                            onClick={() => ()=>openPopinUpdate(item)}
                                        >
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Modifier
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex-1"
                                            onClick={()=>onDelete(item)}
                                        >
                                            {
                                                isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Supression...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Supprimer
                                                    </>
                                                )
                                            }
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="rounded-full bg-muted p-6 mb-4">
                                <Search className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Aucun résultat</h3>
                            <p className="text-muted-foreground mb-6">
                                Aucun article ne correspond à vos critères de recherche
                            </p>
                            <Button onClick={clearAllFilters}>
                                Réinitialiser les filtres
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
