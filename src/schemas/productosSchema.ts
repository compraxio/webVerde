import { z } from 'zod';

export const ProductoSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: 'El nombre es obligatorio' })
    .max(50, { message: 'El nombre es muy largo' }),
  descripcion: z
    .string()
    .min(1, { message: 'La descripcion es obligatoria' })
    .max(255, { message: 'la descripcion no puede ser mayor a 255 caracteres' }),
  precio: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser un número válido',
    })
    .refine((val) => Number(val) > 1, { message: 'El precio debe ser mayor a 0' }),
  id_negocio: z
    .string()
    .min(1, { message: 'escoga un negocio' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser un negocio válido',
    }),
});

export const ProductoEditarSchema = z.object({
  nombre: z.string().max(50, { message: 'El nombre es muy largo' }),
  descripcion: z.string().max(255, { message: 'descripcion demaciado larga' }),
  precio: z.string().refine((val) => !Number.isNaN(Number(val)), {
    message: 'La cantidad debe ser un número válido',
  }),

  id_negocio: z
    .string()
    .min(1, { message: 'escoga un negocio' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser un negocio válido',
    }),
});
