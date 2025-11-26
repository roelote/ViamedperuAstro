// Configuración de WordPress API
export const WORDPRESS_API_URL = import.meta.env.PUBLIC_WORDPRESS_API_URL || 'http://web.viamed/wp-json/wp/v2';
export const PUBLIC_SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321';

// Helper para construir URLs de la API
export const getWpApiUrl = (endpoint: string) => {
    return `${WORDPRESS_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Helper para obtener páginas por slug
export const getPageBySlug = async (slug: string) => {
    try {
        const response = await fetch(getWpApiUrl(`/pages?slug=${slug}`));
        if (response.ok) {
            const pages = await response.json();
            return pages.length > 0 ? pages[0] : null;
        }
        return null;
    } catch (error) {
        console.error(`Error al cargar página ${slug}:`, error);
        return null;
    }
};

// Helper para obtener posts
export const getPosts = async (params: Record<string, any> = {}) => {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = getWpApiUrl(`/posts${queryParams ? `?${queryParams}` : ''}`);
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
        return [];
    } catch (error) {
        console.error('Error al cargar posts:', error);
        return [];
    }
};
