import { z } from 'zod';
export const estados = ['Activo', 'Inactivo'] as const;

const ZONAS_VALIDAS = ['NORTE', 'SUR', 'CENTRO'] as const;


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
    .min(2, 'La unidad productiva es obligatoria')
    .max(150, 'La unidad productiva no puede exceder los 150 caracteres'),

  zona: z.enum(ZONAS_VALIDAS, {message: "ingresa una zona valida"}),

  municipio: z.string().min(2, 'El municipio es obligatorio'),

  direccion: z.string().min(5, 'La dirección es obligatoria'),

  latitud: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La latitud debe ser un número válido',
    }),

  longitud: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La longitud debe ser un número válido',
    }),

  representante: z
    .string()
    .min(2, 'El nombre del representante es obligatorio')
    .max(150, 'El nombre del representante es demasiado largo'),

  whatsup: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'El numero debe ser un número válido',
    })
    .refine((val) => Number(val) > 1, { message: 'El numero es obligatorio' }),

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

  sub_categoria: z
    .string()
    .max(150, 'La subcategoría no puede exceder los 150 caracteres')
    .optional()
    .or(z.literal('')),

  descripcion: z
    .string()
    .max(500, 'La descripción no puede exceder los 500 caracteres')
    .or(z.literal('')),

  latitud: z.string().refine((val) => !Number.isNaN(Number(val)), {
    message: 'La latitud debe ser un número válido',
  }),

  longitud: z.string().refine((val) => !Number.isNaN(Number(val)), {
    message: 'La longitud debe ser un número válido',
  }),

  actividad: z
    .string()
    .min(2, 'La actividad es obligatoria')
    .max(250, 'La actividad es demasiado larga'),

  unidad_productiva: z
    .string()
    .min(2, 'La unidad productiva es obligatoria')
    .max(150, 'La unidad productiva no puede exceder los 150 caracteres'),

  zona: z.enum(ZONAS_VALIDAS, {message: "ingresa una zona valida"}),

  municipio: z.string().min(2, 'El municipio es obligatorio'),

  direccion: z.string().min(5, 'La dirección es obligatoria'),

  representante: z
    .string()
    .min(2, 'El nombre del representante es obligatorio')
    .max(150, 'El nombre del representante es demasiado largo'),

  whatsup: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'El telefono debe ser un número válido',
    })
    .refine((val) => Number(val) > 1, { message: 'El telefono es obligatorio' }),

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

  a_o_verificacion: z.string().optional(),
  autorizado_por: z.string().max(150, 'El nombre es demasiado largo').optional().or(z.literal('')),
});
