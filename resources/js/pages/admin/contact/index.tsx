import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import type { BreadcrumbItem, ContactType } from '@/types'
import admin from '@/routes/admin'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Mail,
    Phone,
    Calendar,
    MoreHorizontal,
    MessageSquare,
    User, Trash,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import ViewContact from '@/pages/admin/contact/view-contact'

export default function Contact({ contacts }: { contacts: ContactType[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: admin.dashboard().url },
        { title: 'Mes contacts', href: admin.contact().url },
    ]

    const contactArray = Object.values(contacts)

    /* ---------------- Pagination front ---------------- */
    const ITEMS_PER_PAGE = 8
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(contactArray.length / ITEMS_PER_PAGE)

    const paginatedContacts = contactArray.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )
    /* -------------------------------------------------- */

    const [isLoading, setIsLoading] = useState(false)

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        })

    const getReasonBadge = (reason: string) => {
        const styles: Record<string, string> = {
            freelance: "bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20",
            recruitment: "bg-orange-500/10 text-orange-600 border-orange-200 hover:bg-orange-500/20",
            consulting: "bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20",
            other: "bg-slate-500/10 text-slate-600 border-slate-200 hover:bg-slate-500/20",
        }

        return styles[reason] || styles.other
    }

    function onDelete(contact: ContactType) {
        setIsLoading(true)

        router.delete(`/dashboard/contact/${contact.id}`, {
            onSuccess: () => toast.success('Contact supprimé avec succès'),
            onError: () => toast.error('Contact introuvable'),
            onFinish: () => setIsLoading(false),
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Messages" />

            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Inbox</h2>
                    <p className="text-muted-foreground">
                        Vous avez {contactArray.length} message(s).
                    </p>
                </div>

                <div className="rounded-xl border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="w-[200px]">Expéditeur</TableHead>
                                <TableHead>Objet / Raison</TableHead>
                                <TableHead className="hidden md:table-cell">Message</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {paginatedContacts.length > 0 ? (
                                paginatedContacts.map((contact) => (
                                    <TableRow key={contact.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold flex items-center gap-1.5">
                                                    <User className="h-3 w-3 opacity-50" />
                                                    {contact.name}
                                                </span>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Mail className="h-3 w-3" />
                                                    {contact.email}
                                                </span>
                                                {contact.phone && (
                                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                        <Phone className="h-3 w-3" />
                                                        {contact.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`capitalize ${getReasonBadge(contact.reason)}`}
                                            >
                                                {contact.reason}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="hidden md:table-cell max-w-[300px]">
                                            <p className="text-sm text-muted-foreground truncate italic">
                                                "{contact.message}"
                                            </p>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(contact.created_at)}
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end" className="w-[160px]">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                                    <DropdownMenuItem asChild>
                                                        <ViewContact contact={contact}  />
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            window.location.href = `mailto:${contact.email}`
                                                        }
                                                    >
                                                       <Mail/> Répondre
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem className="text-destructive"
                                                                      onClick={() => onDelete(contact)}
                                                    >
                                                        {isLoading ? <Spinner /> :<>
                                                            <Trash className="text-destructive" /> Supprimer
                                                        </> }
                                                    </DropdownMenuItem>

                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center">
                                        <div className="flex flex-col items-center text-muted-foreground">
                                            <MessageSquare className="h-8 w-8 mb-2 opacity-20" />
                                            <p>Aucun message reçu.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center p-4 border-t">
                            <p className="text-sm text-muted-foreground">
                                Page {currentPage} sur {totalPages}
                            </p>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                >
                                    Précédent
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                >
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}
