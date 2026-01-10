import GuestLayout from '@/layouts/guest-layout';
import Hero from '@/pages/home/hero';
import TechStack from '@/pages/home/tech-stack';
import { Articles } from '@/pages/home/articles';
import { Contact } from '@/pages/home/contact';
import { PostInterface } from '@/types';
import { Head } from '@inertiajs/react';

export default function Index({posts}: {posts: PostInterface[]}) {

    return (
        <>
           <GuestLayout>
               <Head title="Accueil"  />
               <Hero />
               <TechStack />
               {/*<Projects />*/}
               <Articles posts={posts}/>
               <Contact />
           </GuestLayout>
        </>
    );
}
