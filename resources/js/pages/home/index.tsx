import GuestLayout from '@/layouts/guest-layout';
import Hero from '@/pages/home/hero';
import TechStack from '@/pages/home/tech-stack';
import { Articles } from '@/pages/home/articles';
import { Contact } from '@/pages/home/contact';
import { PostInterface, ProjectType } from '@/types';
import { Head } from '@inertiajs/react';
import ProjectsSection from '@/pages/home/projects';

export default function Index({posts, projects}: {posts: PostInterface[], projects: ProjectType[]}) {
    return (
        <>
           <GuestLayout>
               <Head title="Accueil"  />
               <Hero />
               <TechStack />
               <ProjectsSection projects={projects} />
               <Articles posts={posts}/>
               <Contact />
           </GuestLayout>
        </>
    );
}
