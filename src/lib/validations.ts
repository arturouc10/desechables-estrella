import * as z from 'zod';

// Schema for creating a product via API
export const ProductSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  slug: z.string().optional(),
  description: z.string().optional().nullable(),
  price: z.number().positive({ message: 'El precio debe ser positivo' }).optional().nullable(),
  category: z.string().min(1, { message: 'La categoría es requerida' }),
  weight: z.string().optional().nullable(),
  stock: z.number().int({ message: 'El stock debe ser un número entero' }).min(0).optional().nullable(),
  sku: z.string().optional().nullable(),
  image: z.string().url({ message: 'La URL de la imagen no es válida' }).optional().nullable(),
  images: z.array(z.string().url({ message: 'URL de imagen inválida' })).optional().default([]),
});

export type ProductInput = z.infer<typeof ProductSchema>;

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
