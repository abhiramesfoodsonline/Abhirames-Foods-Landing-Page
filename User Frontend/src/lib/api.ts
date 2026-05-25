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
    // existing
    create: (data: { category_name?: string; is_active?: boolean; image_url?: string }) =>
        api.post('/api/categories', data),

    update: (id: string | number, data: { category_name?: string; is_active?: boolean; image_url?: string }) =>
        api.put(`/api/categories/${id}`, data),

    delete: (id: string | number) =>
        api.delete(`/api/categories/${id}`),

    getAll: () =>
        api.get('/api/categories'),

    // ✅ new
    getById: (id: string | number) =>
        api.get(`/api/categories/${id}`),

    getByName: (category_name: string) =>
        api.get(`/api/categories/search/${category_name}`),

    getByActiveStatus: (isActive: boolean) =>
        api.get('/api/categories', { params: { isActive } }),

    getCreatedAfter: (createdAtAfter: string) =>
        api.get('/api/categories', { params: { createdAtAfter } }),

    getUpdatedAfter: (updatedAtAfter: string) =>
        api.get('/api/categories', { params: { updatedAtAfter } }),

    getCount: () =>
        api.get('/api/categories/search/count'),
};



// Products APIs
export const productsAPI = {
    // existing
    getAll: () =>
        api.get('/api/products'),

    create: (data: ProductFormData) =>
        api.post('/api/products', data),

    update: (id: string | number, data: Partial<ProductFormData>) =>
        api.put(`/api/products/${id}`, data),

    delete: (id: string | number) =>
        api.delete(`/api/products/${id}`),

    // ✅ new
    getById: (id: string | number) =>
        api.get(`/api/products/${id}`),

    getByName: (product_name: string) =>
        api.get(`/api/products/search/${product_name}`),

    getByCategory: (categoryId: string | number) =>
        api.get('/api/products', { params: { categoryId } }),

    getByAvailability: (isAvailable: boolean) =>
        api.get('/api/products', { params: { isAvailable } }),

    getRecent: (limit: number = 5) =>
        api.get('/api/products/search/recent', { params: { limit } }),
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
    create: (data: {username: string, password: string, role: string}) =>
        api.post('/api/admin-users', data),

    getByUsername: (username: string) =>
        api.get(`/api/admin-users/search-username/${username}`),

    update: (username: string, data: {
        currentPassword: string;
        newPassword: string;
    }) =>
        api.put(`/api/admin-users/${username}`, data),

    updateRole: (username: string, role:string) =>
        api.put('/api/admin-users/update-role', null, {params: {username, role}}),

    getMe: (username: string) => api.get(`/api/admin-users/search-username/${username}`),

    getAll: () => api.get('/api/admin-users'),

    delete: (username   : string) => api.delete(`/api/admin-users/${username}`),


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


export const pageViewAPI = {
    track: (path: string) =>
        api.post('/api/page-views/track', null, { params: { path } }),

    getStats: () => api.get('/api/page-views/stats'),
};


export const customersAPI = {
    getAll: () => api.get('/api/customers'),

    getAllCreatedAfter: (date: string) => api.get('/api/customers/search/created-after', { params: { date } }),

    createCustomer: (data: { name: string; mobile_number: string }) =>
        api.post('/api/customers', data),
}

export const trendingProductsAPI = {
    getAll: () => api.get('/api/trending-products'),
}


// Types
export interface Category {
    category_id: number;
    category_name: string;
    title: string;
    image_url: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Product {
    product_id: number;
    product_name: string;
    product_description: string;
    title: string;
    buy_link: string,
    product_image_url: string;
    is_available: boolean;
    created_at: string;
    updated_at: string;
    category_id?: number;
    category: {
        category_id: number;
        category_name: string;
        is_active: boolean;
        image_url: string;
        created_at: string;
        updated_at: string;
    }
}

export interface ProductFormData {
    product_name: string;
    product_description: string;
    title: string;
    category_id: string;
    product_image_url: string;
    buy_link: string;
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

export interface Customers {
    customer_id: string;
    name: string;
    mobile_number: string;
    created_at: string;
}


export interface TrendingProducts {
    trending_product_id: string;
    product_id: string;
}



export default api;
