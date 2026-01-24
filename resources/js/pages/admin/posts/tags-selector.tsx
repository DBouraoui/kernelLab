import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ControllerRenderProps } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export default function TagsSelector({ field }: { field: any}) {

    const categories = [
        {
            label: 'Backend Frameworks',
            options: [
                'Symfony',
                'Laravel',
                'Django',
                'FastAPI',
                'NestJS',
                'AdonisJS',
                'Spring Boot',
                'Express.js',
                'Fiber',
                'Gin',
                'Phoenix'
            ]
        },
        {
            label: 'Frontend & Hybride',
            options: [
                'React',
                'Next.js',
                'Vue.js',
                'Nuxt',
                'Svelte',
                'SvelteKit',
                'Angular',
                'SolidJS',
                'Inertia.js',
                'Astro'
            ]
        },
        {
            label: 'Langages',
            options: [
                'PHP',
                'JavaScript',
                'TypeScript',
                'Python',
                'Go',
                'Java',
                'C#',
                'Rust',
                'Ruby',
                'Kotlin',
                'Swift'
            ]
        },
        {
            label: 'DevOps & Orchestration',
            options: [
                'Docker',
                'Docker Compose',
                'Kubernetes',
                'K8s',
                'K3s',
                'Helm',
                'Terraform',
                'Ansible',
                'Pulumi',
                'Nomad'
            ]
        },
        {
            label: 'CI / CD',
            options: [
                'GitHub Actions',
                'GitLab CI',
                'Jenkins',
                'CircleCI',
                'ArgoCD',
                'Tekton',
                'Drone CI'
            ]
        },
        {
            label: 'Cloud Providers',
            options: [
                'AWS',
                'GCP',
                'Azure',
                'OVHcloud',
                'Scaleway',
                'DigitalOcean',
                'Hetzner'
            ]
        },
        {
            label: 'Proxy & Serveurs',
            options: [
                'Nginx',
                'Apache',
                'Traefik',
                'Caddy',
                'HAProxy',
                'FrankenPHP',
                'Envoy'
            ]
        },
        {
            label: 'Bases de données',
            options: [
                'MySQL',
                'PostgreSQL',
                'MariaDB',
                'SQLite',
                'MongoDB',
                'Redis',
                'Elasticsearch',
                'Cassandra'
            ]
        },
        {
            label: 'Data & Analytics',
            options: [
                'Pandas',
                'NumPy',
                'Apache Spark',
                'Apache Kafka',
                'Airflow',
                'dbt',
                'BigQuery'
            ]
        },
        {
            label: 'IA & Machine Learning',
            options: [
                'TensorFlow',
                'PyTorch',
                'Scikit-learn',
                'OpenAI API',
                'Hugging Face',
                'LangChain',
                'MLflow'
            ]
        },
        {
            label: 'Cybersécurité',
            options: [
                'OWASP',
                'JWT',
                'OAuth2',
                'OpenID Connect',
                'Keycloak',
                'Vault',
                'Pentesting',
                'Zero Trust'
            ]
        },
        {
            label: 'Monitoring & Observabilité',
            options: [
                'Prometheus',
                'Grafana',
                'Loki',
                'ELK Stack',
                'Datadog',
                'New Relic',
                'OpenTelemetry'
            ]
        },
        {
            label: 'Architecture & Concepts',
            options: [
                'Microservices',
                'Monolithe',
                'Clean Architecture',
                'Hexagonal Architecture',
                'Event Driven',
                'CQRS',
                'Domain Driven Design'
            ]
        },
        {
            label: 'Admin system',
            options: [
                "Shell",
                "Bash",
                "Scripting",
                "Permissions",
                "Terminal"
            ]
        }
    ];


    // Ajouter un tag au tableau existant
    const handleAddTag = (value: string) => {
        const currentTags = field.value || [];
        // On vérifie si le tag n'est pas déjà présent pour éviter les doublons
        if (!currentTags.includes(value)) {
            field.onChange([...currentTags, value]);
        }
    };

    // Supprimer un tag du tableau
    const handleRemoveTag = (tagToRemove: string) => {
        const currentTags = field.value || [];
        field.onChange(currentTags?.filter((t) => t !== tagToRemove));
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            <Select onValueChange={handleAddTag}>
                <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Ajouter des tags..." />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((group) => (
                        <SelectGroup key={group.label}>
                            <SelectLabel className="text-primary font-bold">{group.label}</SelectLabel>
                            {group.options.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    ))}
                </SelectContent>
            </Select>

            {/* Affichage des Badges */}
            <div className="flex flex-wrap gap-2 min-h-[32px]">
                {field.value && field.value.length > 0 ? (
                    field.value.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="pl-2 pr-1 py-1 flex items-center gap-1 animate-in fade-in zoom-in duration-200"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5 transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground italic">Aucun tag sélectionné</p>
                )}
            </div>
        </div>
    );
}
