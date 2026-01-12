export const formatDate = (dateString: string | null) => {
    if (!dateString) return "Date inconnue";
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};
