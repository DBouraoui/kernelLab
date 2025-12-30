import { Post } from '@/types'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import MarkdownEditor from '@/pages/admin/posts/markdown-editor'
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { useState } from 'react';
import { Check, Loader } from 'lucide-react';

const schema = z.object({
    title: z.string().min(2, "Le titre est trop court"),
    description: z.string().min(2, "La description est requise"),
    content: z.string().min(10, "Le contenu est un peu vide..."),
})

export default function UpdatePost({ post }: { post: Post }) {

    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: post.title,
            description: post.description,
            content: post.content,
        },
    })

    function onSubmit(values: z.infer<typeof schema>) {
        setIsLoading(true)

        router.patch(`/dashboard/post/${post.id}`,
            values,
            {
                onSuccess: () => {
                    toast.success("L'article a été modifié avec succès")
                },
                onError: () => {
                    toast.error("Une erreur est survenue")
                },
                onFinish: () => {
                    setIsLoading(false)
                },
            }
        )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    Modifier
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] sm:max-w-4xl overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Modifier le post</DialogTitle>
                    <DialogDescription>
                        Modifier les informations du post
                    </DialogDescription>
                </DialogHeader>

                {/* ZONE SCROLLABLE */}
                <div className="overflow-y-auto pr-2 max-h-[70vh]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Titre</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="text-lg font-semibold"
                                                placeholder="Titre du post"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Description courte"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contenu</FormLabel>
                                        <FormControl>
                                            <div className="min-h-[400px] rounded-md border">
                                                <MarkdownEditor field={field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className="sticky bottom-0 bg-background pt-4">
                                <DialogClose asChild>
                                    <Button variant="outline">Annuler</Button>
                                </DialogClose>
                                <Button type="submit">
                                    {isLoading ? (
                                        <>
                                            <Loader className="animate-spin" />
                                            En cour de modification
                                        </>
                                        ):
                                        (
                                        <>
                                            <Check className="text-green-500" />
                                            Valider
                                        </>
                                        )
                                    }
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
