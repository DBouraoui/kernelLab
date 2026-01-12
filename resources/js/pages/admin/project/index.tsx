import { Head, Link, router } from '@inertiajs/react';
import type { BreadcrumbItem, ProjectType } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    Pencil,
    Trash2,
    Github,
    Star,
    Monitor
} from 'lucide-react';
import { toast } from 'sonner';
import admin from '@/routes/admin';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Mes Projets', href: '/dashboard/projects' },
]

export default function AdminProject({ projects }: { projects: any }) {
    // Gestion de la pagination Laravel (objet avec .data) ou array simple
    const projectsList = projects.data || projects;

    const deleteProject = (id: number) => {
        if (confirm('Es-tu sûr de vouloir supprimer ce projet ?')) {
            router.delete(`/dashboard/project/${id}`, {
                onSuccess: () => toast.success('Projet supprimé'),
                onError: () => toast.error('Erreur lors de la suppression')
            });
        }
    };

    const toggleFeatured = (id: number) => {
        // On envoie un patch ou un post vers une route dédiée
        router.patch(`/dashboard/project/${id}/toggle-featured`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Statut mis à jour')
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des projets" />

            <div className="p-6 space-y-6">
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
                        <p className="text-muted-foreground text-sm">Gère tes réalisations Dev & DevOps.</p>
                    </div>
                    <Button asChild className="rounded-xl gap-2">
                        <Link href={admin.project.create()} prefetch>
                            <Plus className="h-4 w-4" /> Ajouter un projet
                        </Link>
                    </Button>
                </div>

                <div className="border rounded-xl bg-card overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead>Projet</TableHead>
                                <TableHead>Catégorie</TableHead>
                                <TableHead className="hidden md:table-cell text-center">Stack</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projectsList.length > 0 ? (
                                projectsList.map((project: ProjectType) => (
                                    <TableRow key={project.id} className="group">
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-wider">
                                                    {project.title}
                                                    {project.is_featured && (
                                                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                                    )}
                                                </div>
                                                <div className="flex gap-3 text-[10px] text-muted-foreground">
                                                    {project.github_url && <span className="flex items-center gap-1"><Github className="h-3 w-3" /> Repo</span>}
                                                    {project.live_url && <span className="flex items-center gap-1"><Monitor className="h-3 w-3" /> Live</span>}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="text-[10px] uppercase font-bold px-2 py-0">
                                                {project.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <div className="flex flex-wrap justify-center gap-1 max-w-[250px] mx-auto">
                                                {project.stack?.map((s) => (
                                                    <span key={s} className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-mono">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={`h-2.5 w-2.5 rounded-full ${
                                                project.status === 'published'
                                                    ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                                                    : project.status === 'archived'
                                                        ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                                                        : 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.3)]'
                                            }`} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => toggleFeatured(project.id)}
                                                >
                                                    <Star className={`h-4 w-4 ${project.is_featured ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                                    <Link href={`/dashboard/project/${project.id}/edit`}>
                                                        <Pencil className="h-4 w-4 text-muted-foreground" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => deleteProject(project.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic">
                                        Aucun projet répertorié.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
