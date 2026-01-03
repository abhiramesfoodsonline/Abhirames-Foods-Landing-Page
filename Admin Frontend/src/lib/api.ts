import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});


// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    login: (username: string, password: string) =>
        api.post('/api/auth/login', { username, password }),
    // logout: () => api.post('/admin/logout'),
};

// Categories APIs
export const categoriesAPI = {
    // getAll: () => api.get('/api/categories'),
    // create: (data: { name: string; is_active: boolean }) =>
    //   api.post('/api/categories', data),
    // update: (id: string, data: { name?: string; is_active?: boolean }) =>
    //   api.put(`/api/categories/${id}`, data),
    // delete: (id: string) => api.delete(`/api/categories/${id}`),

    create: (data: {name?: string, is_active?: boolean}) =>
        api.post('/api/categories', data),

    update:(id: string, data: {name?: string, is_active?: boolean}) =>
        api.put(`/api/categories/${id}`, data),

    delete: (id: string) => api.delete(`/api/categories/${id}`),

    getAll: () => api.get('/api/categories'),

};

// Products APIs
export const productsAPI = {
    getAll: () => api.get('/api/products'),
    getByCategory: (categoryId: string) =>
        api.get(`/api/products/category/${categoryId}`),
    create: (data: ProductFormData) => api.post('/api/products', data),
    update: (id: string, data: Partial<ProductFormData>) =>
        api.put(`/api/products/${id}`, data),
    delete: (id: string) => api.delete(`/api/products/${id}`),
};

// Company Settings APIs
export const companyAPI = {
    getCompanyProfile: () => api.get('/api/company-profile'),
    updateCompanyProfile: (data) =>
        api.put('/api/company-profile', data),

    getContactUs: () => api.get('/api/contact-us'),
    updateContactUs: (data) =>
        api.put('/api/contact-us', data),

    getSocialMedia: () => api.get('/api/social-media'),
    updateSocialMedia: (data) =>
        api.put('/api/social-media', data),
};

export const adminUsersAPI = {
    getByUsername: (username: string) =>
        api.get(`/api/admin-users/search-username/${username}`),

    update: (username: string, data: {
        currentPassword: string;
        newPassword: string;
    }) =>
        api.put(`/api/admin-users/${username}`, data),

};


// CMS Pages APIs
export const cmsAPI = {
    getAll: () => api.get('/api/cms'),
    upsert: (slug: string, data: { title: string; content: string }) =>
        api.put(`/api/cms/${slug}`, data),
};

export const dashboardAPI = {
    getCategoryCount: () => api.get('/api/categories/search/count'),
    getProducts: () => api.get('/api/products'),
    getRecentProducts: () => api.get('/api/products/search/recent?limit=5'),
};



// Types
export interface Category {
    category_id: string;
    category_name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Product {
    product_id: string;
    product_name: string;
    product_description: string;
    buy_link: string,
    product_image_url: string;
    is_available: boolean;
    created_at: string;
    updated_at: string;
    category_id: string;
    category_name?: string;
}

export interface ProductFormData {
    product_name: string;
    product_description: string;
    category_id: string;
    product_image_url: string;
    is_available: boolean;
}

export interface CompanySettings {
    company_name: string;
    logo_url: string;
    phone_number: string;
    email_id: string;
    address: string;
    instagram: string;
    facebook: string;
    whatsapp: string;
    twitter: string;
}

export interface CMSPage {
    slug: string;
    title: string;
    content: string;
    updated_at: string;
}

export default api;
