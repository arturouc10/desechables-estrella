import type { Product as PrismaProduct } from '@/generated/prisma/client';

// Re-export Prisma Product type for convenience
export type Product = PrismaProduct;

// Contact form data shape
export interface ContactFormData {
  nombre: string;
  email: string;
  tel: string;
  comen: string;
}

// Product form data (from admin form, before DB insertion)
export interface ProductFormData {
  name: string;
  slug?: string;
  description?: string;
  price?: number | null;
  category: string;
  weight?: string;
  stock?: number | null;
  sku?: string;
  image?: string | null;
  images?: string[];
}

// Category item from categories.json
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  href: string;
  description?: string;
}

// Product data from static JSON files
export interface StaticProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  weight: string;
  category: string;
  image: string;
  price: number | null;
  stock: number | null;
  sku: string | null;
  featured: boolean;
}
