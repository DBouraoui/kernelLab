import GuestLayout from '@/layouts/guest-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { MoveLeft, Ghost } from "lucide-react";
import { contact, home } from '@/routes';

export default function NotFound() {
    return (
        <GuestLayout>
            <Head title="404 - Oups vous vous êtes perdu" />

            <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
                {/* Icône ou Illustration */}
                <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-muted p-6">
                        <Ghost className="h-12 w-12 text-primary animate-bounce" />
                    </div>
                </div>

                {/* Texte d'erreur */}
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    404
                </h1>
                <h2 className="mt-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                    Oups, vous vous êtes perdu !
                </h2>
                <p className="mt-4 text-muted-foreground max-w-[450px]">
                    La page que vous recherchez semble avoir disparu dans le néant numérique ou n'a jamais existé.
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button asChild variant="default" size="lg">
                        <Link href={home()}>
                            <MoveLeft className="mr-2 h-4 w-4" />
                            Retour à l'accueil
                        </Link>
                    </Button>

                    <Button asChild variant="outline" size="lg">
                        <Link href={contact()}>
                            Signaler un problème
                        </Link>
                    </Button>
                </div>
            </div>
        </GuestLayout>
    );
}
