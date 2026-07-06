import * as z from 'zod';

// Schema for creating a product via API
export const ProductSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  slug: z.string().optional(),
  description: z.string().optional().nullable(),
  price: z.number().nonnegative({ message: 'El precio debe ser mayor o igual a 0' }).optional().nullable(),
  category: z.string().min(1, { message: 'La categoría es requerida' }),
  weight: z.string().optional().nullable(),
  stock: z.number().int({ message: 'El stock debe ser un número entero' }).min(0).optional().nullable(),
  sku: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  images: z.array(z.string()).optional().default([]),
  disabled: z.boolean().optional().default(false),
});

export const JobVacancySchema = z.object({
  title: z.string().min(1, { message: 'El título es requerido' }),
  description: z.string().min(1, { message: 'La descripción es requerida' }),
  location: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  salary: z.string().optional().nullable(),
  active: z.boolean().optional().default(true),
});

export type JobVacancyInput = z.infer<typeof JobVacancySchema>;

export type ProductInput = z.infer<typeof ProductSchema>;

// Schema for updating a product via API (all fields optional)
export const ProductUpdateSchema = ProductSchema.partial();
export type ProductUpdateInput = z.infer<typeof ProductUpdateSchema>;

// Schema for the contact form
export const ContactSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es requerido' }),
  email: z.string().email({ message: 'Escribe una dirección de correo válida' }),
  tel: z.string().min(7, { message: 'El teléfono debe tener al menos 7 dígitos' }),
  comen: z.string().min(1, { message: 'El mensaje es requerido' }),
});

export type ContactInput = z.infer<typeof ContactSchema>;

// Schema for login
export const LoginSchema = z.object({
  password: z.string().min(1, { message: 'La contraseña es requerida' }),
});
