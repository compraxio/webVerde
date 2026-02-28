import { z } from 'zod';
export const estados = ['Activo', 'Inactivo'] as const;

export const DirVerdeSchema = z.object({
  negocio: z
    .string()
    .min(1, 'El nombre del negocio es obligatorio')
    .max(150, 'El nombre no puede exceder los 150 caracteres'),

  id_grupo: z
    .string()
    .min(1, { message: 'escoga un grupo' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser un grupo válido',
    }),

  id_municipio: z
    .string()
    .min(1, { message: 'escoga un municipio' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser un municipio válido',
    }),

  sub_categoria: z
    .string()
    .max(150, 'La subcategoría no puede exceder los 150 caracteres')
    .optional()
    .or(z.literal('')),

  descripcion: z
    .string()
    .max(500, 'La descripción no puede exceder los 500 caracteres')
    .optional()
    .or(z.literal('')),

  actividad: z
    .string()
    .min(2, 'La actividad es obligatoria')
    .max(250, 'La actividad es demasiado larga'),

  unidad_productiva: z
    .string()
    .max(150, 'La unidad productiva no puede exceder los 150 caracteres')
    .optional()
    .or(z.literal('')),

  direccion: z.string().optional().or(z.literal('')),

  latitud: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La latitud debe ser un número válido',
    })
    .optional()
    .or(z.literal('')),

  longitud: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La longitud debe ser un número válido',
    })
    .optional()
    .or(z.literal('')),

  representante: z
    .string()
    .min(2, 'El nombre del representante es obligatorio')
    .max(150, 'El nombre del representante es demasiado largo'),

  url_youtube: z.url('Debe ser una URL de YouTube válida').optional().or(z.literal('')),

  url_facebook: z.url('Debe ser una URL de Facebook válida').optional().or(z.literal('')),

  url_instagram: z.url('Debe ser una URL de Instagram válida').optional().or(z.literal('')),

  url_tiktok: z.url('Debe ser una URL de TikTok válida').optional().or(z.literal('')),

  url_negocio: z.url('Debe ser una URL válida').optional().or(z.literal('')),

  id_fase: z
    .string()
    .min(1, { message: 'escoga una fase' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser una fase válida',
    }),

  estado: z.enum(estados, { message: 'coloque un estado valido' }),

  a_o_verificacion: z.string().optional(),

  autorizado_por: z.string().max(150, 'El nombre es demasiado largo').optional().or(z.literal('')),
});

export const DirVerdeEditarSchema = z.object({
  negocio: z
    .string()
    .min(1, 'El nombre del negocio es obligatorio')
    .max(150, 'El nombre no puede exceder los 150 caracteres'),

  id_grupo: z
    .string()
    .min(1, { message: 'escoga un grupo' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser un grupo válido',
    }),

  id_municipio: z
    .string()
    .min(1, { message: 'escoga un municipio' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser un municipio válido',
    }),

  sub_categoria: z
    .string()
    .max(150, 'La subcategoría no puede exceder los 150 caracteres')
    .optional()
    .or(z.literal('')),

  descripcion: z
    .string()
    .max(500, 'La descripción no puede exceder los 500 caracteres')
    .optional()
    .or(z.literal('')),

  latitud: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La latitud debe ser un número válido',
    })
    .optional()
    .or(z.literal('')),

  longitud: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La longitud debe ser un número válido',
    })
    .optional()
    .or(z.literal('')),

  actividad: z
    .string()
    .min(2, 'La actividad es obligatoria')
    .max(250, 'La actividad es demasiado larga'),

  unidad_productiva: z
    .string()
    .max(150, 'La unidad productiva no puede exceder los 150 caracteres')
    .optional()
    .or(z.literal('')),

  direccion: z.string().optional().or(z.literal('')),

  representante: z
    .string()
    .min(2, 'El nombre del representante es obligatorio')
    .max(150, 'El nombre del representante es demasiado largo'),

  url_youtube: z.url('Debe ser una URL de YouTube válida').optional().or(z.literal('')),

  url_facebook: z.url('Debe ser una URL de Facebook válida').optional().or(z.literal('')),

  url_instagram: z.url('Debe ser una URL de Instagram válida').optional().or(z.literal('')),

  url_tiktok: z.url('Debe ser una URL de TikTok válida').optional().or(z.literal('')),

  url_negocio: z.url('Debe ser una URL válida').optional().or(z.literal('')),

  id_fase: z
    .string()
    .min(1, { message: 'escoga una fase' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser una fase válida',
    })
    .optional(),

  estado: z.enum(estados, { message: 'coloque un estado valido' }),

  a_o_verificacion: z.string().optional(),
  autorizado_por: z.string().max(150, 'El nombre es demasiado largo').optional().or(z.literal('')),
});
