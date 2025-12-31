import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Mail, Phone, Calendar, User, Tag } from 'lucide-react';
import { ContactType } from '@/types';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';

export default function ViewContact({ contact }: { contact: ContactType }) {

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Dialog>
            <DialogTrigger className="w-full">
            <Button variant="ghost" size="sm" className=" text-blue-600 text-sm w-full place-content-start"><span className="flex flex-row items-center justify-start gap-1 w-full -translate-x-1"><Eye className="text-blue-600 h-4" /> Voir plus </span></Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] rounded-[2rem] overflow-hidden">
                <DialogHeader className="space-y-4">
                    <div className="flex justify-around items-start">
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <User className="h-5 w-5 text-muted-foreground" />
                            {contact.name}
                        </DialogTitle>
                        <Badge variant="secondary" className="px-3 py-1 capitalize">
                            {contact.reason}
                        </Badge>
                    </div>

                    <DialogDescription className="flex flex-col gap-2 pt-2">
                        <span className="flex items-center gap-2 text-foreground/80">
                            <Mail className="h-4 w-4" />
                            {contact.email}
                        </span>
                        {contact.phone && (
                            <span className="flex items-center gap-2 text-foreground/80">
                                <Phone className="h-4 w-4" />
                                {contact.phone}
                            </span>
                        )}
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            Reçu le {formatDate(contact.created_at)}
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <Separator className="my-4" />

                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        <Tag className="h-3 w-3" />
                        Détails du message
                    </div>

                    <div className="bg-muted/30 rounded-2xl p-6 border border-muted-foreground/10">
                        <p className="text-foreground leading-relaxed whitespace-pre-wrap italic">
                            "{contact.message}"
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <a
                        href={`mailto:${contact.email}`}
                        className="inline-flex items-center justify-center h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-sm font-bold transition-all active:scale-95"
                    >
                        Répondre par email
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    )
}
