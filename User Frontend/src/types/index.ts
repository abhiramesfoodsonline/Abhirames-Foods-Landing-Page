export interface Category {
  category_id: number;
  category_name: string;
  title?: string;
  description?: string;
  image_url: string;
  is_active: boolean;
  created_at?:string;
  updated_at?:string;
}

export interface Product {
  product_id: number;
  product_name: string;
  title: string;
  product_description: string;
  price?: number;
  product_image_url: string;
  category?: Category;
  category_id?: number;
  is_available: boolean;
  buy_link?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
}

export interface CMSPage {
  id: string;
  title: string;
  content: string;
}
