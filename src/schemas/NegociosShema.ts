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

  sub_categoria: z
    .string()
    .max(150, 'La subcategoría no puede exceder los 150 caracteres')
    .optional()
    .or(z.literal('')),

  descripcion: z
    .string()
    .max(500, 'La descripción no puede exceder los 500 caracteres')
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

  zona: z.string().min(2, 'La zona es obligatoria'),

  municipio: z.string().min(2, 'El municipio es obligatorio'),

  direccion: z.string().min(5, 'La dirección es obligatoria'),

  representante: z
    .string()
    .max(150, 'El nombre del representante es demasiado largo')
    .optional()
    .or(z.literal('')),

  whatsup: z
    .string()
    .max(20, 'El número de WhatsApp no puede exceder los 20 caracteres')
    .optional()
    .or(z.literal('')),

  url_youtube: z.url('Debe ser una URL de YouTube válida').optional().or(z.literal('')),

  url_facebook: z.url('Debe ser una URL de Facebook válida').optional().or(z.literal('')),

  url_instagram: z.url('Debe ser una URL de Instagram válida').optional().or(z.literal('')),

  url_tiktok: z.url('Debe ser una URL de TikTok válida').optional().or(z.literal('')),

  correo: z.email('Correo electrónico inválido').min(1, 'El correo es obligatorio'),

  url_negocio: z.url('Debe ser una URL válida').optional().or(z.literal('')),

  id_fase: z
    .string()
    .min(1, { message: 'escoga una fase' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser una fase válida',
    })
    .optional(),

  estado: z.enum(estados, { message: 'coloque un estado valido' }),

  a_o_verificacion: z
    .string()
    .optional(),

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

  sub_categoria: z
    .string()
    .max(150, 'La subcategoría no puede exceder los 150 caracteres')
    .optional()
    .or(z.literal('')),

  descripcion: z
    .string()
    .max(500, 'La descripción no puede exceder los 500 caracteres')
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

  zona: z.string().min(2, 'La zona es obligatoria'),

  municipio: z.string().min(2, 'El municipio es obligatorio'),

  direccion: z.string().min(5, 'La dirección es obligatoria'),

  representante: z
    .string()
    .max(150, 'El nombre del representante es demasiado largo')
    .optional()
    .or(z.literal('')),

  whatsup: z
    .string()
    .max(20, 'El número de WhatsApp no puede exceder los 20 caracteres')
    .optional()
    .or(z.literal('')),

  url_youtube: z.url('Debe ser una URL de YouTube válida').optional().or(z.literal('')),

  url_facebook: z.url('Debe ser una URL de Facebook válida').optional().or(z.literal('')),

  url_instagram: z.url('Debe ser una URL de Instagram válida').optional().or(z.literal('')),

  url_tiktok: z.url('Debe ser una URL de TikTok válida').optional().or(z.literal('')),

  correo: z.email('Correo electrónico inválido').min(1, 'El correo es obligatorio'),

  url_negocio: z.url('Debe ser una URL válida').optional().or(z.literal('')),

  id_fase: z
    .string()
    .min(1, { message: 'escoga una fase' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser una fase válida',
    })
    .optional(),

  estado: z.enum(estados, { message: 'coloque un estado valido' }),

  a_o_verificacion: z
    .string()
    .optional(),
  autorizado_por: z.string().max(150, 'El nombre es demasiado largo').optional().or(z.literal('')),
});
