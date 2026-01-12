import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    MoreHorizontal, Mail, Download, Trash2, UserMinus, Search, Calendar, Copy, UserPlus
} from "lucide-react";
import { useState } from 'react';
import { toast } from 'sonner';
import admin from '@/routes/admin';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Newsletter', href: '/admin/newsletter' },
];

interface Subscriber {
    id: number;
    email: string;
    active: boolean;
    created_at: string;
}

export default function Newsletter({ subscribers }: { subscribers: any }) {
    const [search, setSearch] = useState('');

    // Filtrage local pour la démo (Idéalement à faire côté Laravel avec Spatie Query Builder)
    const filteredData = subscribers.data.filter((s: Subscriber) =>
        s.email.toLowerCase().includes(search.toLowerCase())
    );

    const copyEmail = (email: string) => {
        navigator.clipboard.writeText(email);
        toast.success("Email copié !");
    };

    function destroy(id: number) {
        router.delete('/dashboard/newsletter/' + id,{
            onSuccess: () => {
                toast.success("Utilisateur supprimer de la newsletter");
            },
            onError: () => {
                toast.error("Erreur de suppression de l'utilisateur");
            }
        });
    }

    function desactivate(id: number) {
        router.patch('/dashboard/newsletter/' + id, {}, {
            onSuccess: () => {
                toast.success("Utilisateur moodifier");
            },
            onError: () => {
                toast.error("Erreur de modification de l'utilisateur");
            }
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion Newsletter" />

            <div className="p-4 md:p-8 space-y-6">
                {/* --- HEADER ACTIONS --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Newsletter</h1>
                        <p className="text-muted-foreground italic">Gérez vos {subscribers.total} abonnés et exportez votre liste.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => window.location.href = admin.newsletter.export().url} variant="outline" size="sm" className="h-9">
                            <Download className="mr-2 h-4 w-4" /> Export CSV
                        </Button>
                    </div>
                </div>

                {/* --- STATS RAPIDES --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">Total Abonnés</CardTitle>
                            <Mail className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold">{subscribers.total}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* --- TABLE CARD --- */}
                <Card className="border-border/40 shadow-sm overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-4">
                        <div className="flex items-center justify-between">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher un email..."
                                    className="pl-9 bg-background"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>

                    <Table>
                        <TableHeader className="bg-muted/20">
                            <TableRow>
                                <TableHead className="w-[300px]">Utilisateur</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Date d'inscription</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length > 0 ? filteredData.map((sub: Subscriber) => (
                                <TableRow key={sub.id} className="group hover:bg-muted/50 transition-colors">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                                {sub.email.substring(0, 2).toUpperCase()}
                                            </div>
                                            <span className="truncate">{sub.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {sub.active ? (
                                            <Badge variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/10 border-green-500/20 gap-1.5">
                                                <span className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse" />
                                                Actif
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-muted-foreground">Inactif</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(sub.created_at).toLocaleDateString('fr-FR')}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-background shadow-none">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 rounded-xl">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => copyEmail(sub.email)} className="cursor-pointer">
                                                    <Copy className="mr-2 h-4 w-4" /> Copier l'email
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={()=>desactivate(sub.id)} className="text-amber-600 cursor-pointer">
                                                    {sub.active ? (
                                                        <>
                                                            <UserMinus className="mr-2 h-4 w-4" /> Désactiver
                                                        </>
                                                        ):
                                                        (
                                                            <>
                                                                <UserPlus className="mr-2 h-4 w-4" /> Activer
                                                            </>
                                                        )
                                                    }
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>destroy(sub.id)} className="text-destructive cursor-pointer font-medium">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-32 text-center text-muted-foreground italic">
                                        Aucun abonné trouvé...
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* --- PAGINATION SIMPLE --- */}
                    <div className="p-4 border-t border-border/40 bg-muted/10 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                            Page {subscribers.current_page} sur {subscribers.last_page} ({subscribers.total} abonnés)
                        </p>
                        <div className="flex gap-2">
                            {/* Bouton Précédent */}
                            <Button
                                variant="outline"
                                size="sm"
                                asChild={!!subscribers.prev_page_url}
                                disabled={!subscribers.prev_page_url}
                            >
                                {subscribers.prev_page_url ? (
                                    <Link href={subscribers.prev_page_url} preserveScroll>
                                        Précédent
                                    </Link>
                                ) : (
                                    <span>Précédent</span>
                                )}
                            </Button>

                            {/* Bouton Suivant */}
                            <Button
                                variant="outline"
                                size="sm"
                                asChild={!!subscribers.next_page_url}
                                disabled={!subscribers.next_page_url}
                            >
                                {subscribers.next_page_url ? (
                                    <Link href={subscribers.next_page_url} preserveScroll>
                                        Suivant
                                    </Link>
                                ) : (
                                    <span>Suivant</span>
                                )}
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
