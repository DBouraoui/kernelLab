
import React from 'react';
import { Menu } from "lucide-react"; // Icônes
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
    // Liste des liens pour éviter la répétition
    const menuItems = [
        { name: "Accueil", href: "#" },
        { name: "Articles", href: "#" },
        { name: "À propos", href: "#" },
        { name: "Contact", href: "#" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* --- LOGO --- */}
                <div className="flex items-center gap-2">
                    <a href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
                        MonBlog<span className="text-primary">.</span>
                    </a>
                </div>

                {/* --- MENU DESKTOP (Caché sur mobile) --- */}
                <div className="hidden md:flex items-center gap-6">
                    {menuItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            {item.name}
                        </a>
                    ))}
                    {/* Exemple de bouton d'action (ex: S'abonner) */}
                    <Button size="sm">S'abonner</Button>
                </div>

                {/* --- MENU MOBILE (Visible uniquement sur mobile) --- */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Ouvrir le menu</span>
                            </Button>
                        </SheetTrigger>

                        {/* Contenu du menu mobile */}
                        <SheetContent side="right">
                            <div className="flex flex-col gap-6 mt-8">
                                <a href="/" className="text-lg font-bold">
                                    MonBlog<span className="text-primary">.</span>
                                </a>
                                <div className="flex flex-col gap-4">
                                    {menuItems.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                    <Button className="w-full mt-4">S'abonner</Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </nav>
    );
};
