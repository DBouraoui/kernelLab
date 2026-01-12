import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { home } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    ContactIcon,
    GitForkIcon,
    Image,
    LayoutGrid,
    Mailbox,
    Newspaper,
} from 'lucide-react';
import AppLogo from './app-logo';
import admin from '@/routes/admin';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: admin.dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Mes articles',
        href: admin.post.list(),
        icon: Newspaper,
    },
    {
        title: 'Mes contacts',
        href: admin.contact(),
        icon: ContactIcon,
    },
    {
        title: 'Mes projets',
        href: admin.project.index(),
        icon: GitForkIcon,
    },
    {
        title: 'Abonnement newsletter',
        href: admin.newsletter().url,
        icon: Mailbox,
    },
    {
        title: 'Convertisseur images',
        href: admin.pictures.index().url,
        icon: Image,
    }

];

const footerNavItems: NavItem[] = [
    {
        title: 'Site web',
        href: home(),
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={admin.dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
