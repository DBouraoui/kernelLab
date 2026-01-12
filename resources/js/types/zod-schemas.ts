import {z} from 'zod';

export const ContactSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    reason: z.string(),
    message: z.string(),
})

export const ArticleSchema = z.object({
    title: z.string().min(2, "Le titre est trop court"),
    description: z.string().min(2, "La description est requise"),
    content: z.string().min(10, "Le contenu est un peu vide..."),
    tags: z.array(z.string()).min(1, "Choisissez au moins un tag"),
    status: z.string().min(2, "Le status est requise"),
    image: z.array(z.string()),
    reading_time: z.string().min(1, "Le reading time est requise"),
    thumbnail: z.string().min(1, "Le thumbnail est requise"),
    published_at: z.string(),
    category: z.string().min(2, "Le category est requise"),
})

export const ArticleSchemaUpdate = z.object({
    title: z.string().min(2, "Le titre est trop court"),
    description: z.string().min(2, "La description est requise"),
    content: z.string().min(10, "Le contenu est un peu vide..."),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    status: z.string(),
    reading_time: z.string()
})
