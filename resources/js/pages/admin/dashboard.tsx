import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import admin from '@/routes/admin';
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    FileText, FolderGit2, Mail, MessageSquare,
    ArrowUpRight, Plus, Activity, ExternalLink
} from 'lucide-react';
import {
    Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid
} from "recharts";
import { home } from '@/routes';

// Données simulées pour le graphique (à remplacer par de la vraie data plus tard)
const chartData = [
    { name: "Lun", visits: 400 },
    { name: "Mar", visits: 300 },
    { name: "Mer", visits: 550 },
    { name: "Jeu", visits: 450 },
    { name: "Ven", visits: 600 },
    { name: "Sam", visits: 700 },
    { name: "Dim", visits: 900 },
];
const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <Card className="overflow-hidden border-sidebar-border/50 shadow-sm hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
                <Icon className={`h-4 w-4 ${color.replace('bg-', 'text-')}`} />
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
                {trend > 0 ? (
                    <span className="text-green-500 flex items-center">
                            +{trend}% <ArrowUpRight className="h-3 w-3 ml-0.5" />
                        </span>
                ) : (
                    <span className="text-muted-foreground">0%</span>
                )}
                <span className="ml-1 opacity-70">depuis le mois dernier</span>
            </p>
        </CardContent>
    </Card>
);


export default function Dashboard({ stats, latestContacts }: { stats: any, latestContacts: any[] }) {

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: admin.dashboard().url }]}>
            <Head title="Panel d'administration" />

            <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Bonjour, Admin 👋</h1>
                        <p className="text-muted-foreground">
                            Voici ce qu'il se passe sur votre blog aujourd'hui.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild variant="outline">
                            <Link href={home()}>
                                <ExternalLink className="mr-2 h-4 w-4" /> Voir le site
                            </Link>
                        </Button>
                        <Button onClick={()=>router.visit(admin.post.list())} className="bg-primary shadow-lg shadow-primary/20">
                            <Plus className="mr-2 h-4 w-4" /> Créer un article
                        </Button>
                    </div>
                </div>

                {/* --- KPI STATS --- */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Articles publiés"
                        value={stats.posts}
                        icon={FileText}
                        color="bg-blue-500"
                        trend={12}
                    />
                    <StatCard
                        title="Projets Portfolio"
                        value={stats.projects}
                        icon={FolderGit2}
                        color="bg-purple-500"
                        trend={5}
                    />
                    <StatCard
                        title="Abonnés Newsletter"
                        value={stats.newsletter}
                        icon={Mail}
                        color="bg-orange-500"
                        trend={24}
                    />
                    <StatCard
                        title="Messages reçus"
                        value={stats.contacts}
                        icon={MessageSquare}
                        color="bg-green-500"
                        trend={8}
                    />
                </div>

                {/* --- MAIN SECTION --- */}
                <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7 h-full">

                    {/* CHART AREA (Prend 4 colonnes sur 7) */}
                    <Card className="md:col-span-4 lg:col-span-4 flex flex-col border-sidebar-border/50 shadow-sm">
                        <CardHeader>
                            <CardTitle>Aperçu du trafic</CardTitle>
                            <CardDescription>Visiteurs uniques sur les 7 derniers jours.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-0 flex-1 min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value :any) => `${value}`}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="visits"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorVisits)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* RECENT ACTIVITY / CONTACTS (Prend 3 colonnes sur 7) */}
                    <Card className="md:col-span-3 lg:col-span-3 border-sidebar-border/50 shadow-sm flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" />
                                Derniers Messages
                            </CardTitle>
                            <CardDescription>
                                Les 5 derniers contacts reçus via le formulaire.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-auto pr-2">
                            <div className="space-y-6">
                                {latestContacts.length > 0 ? latestContacts.map((contact, i) => (
                                    <div key={contact.id || i} className="flex items-start gap-4 group">
                                        <Avatar className="h-9 w-9 border">
                                            <AvatarImage src={`https://ui-avatars.com/api/?name=${contact.name}&background=random`} />
                                            <AvatarFallback>{contact.name?.substring(0,2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1 flex-1">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                                                    {contact.name}
                                                </p>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {new Date(contact.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                {contact.message}
                                            </p>
                                            <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal bg-muted">
                                                {contact.email}
                                            </Badge>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
                                        <MessageSquare className="h-8 w-8 mb-2 opacity-20" />
                                        Aucun message pour le moment.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
