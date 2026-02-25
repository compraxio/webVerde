import { z } from 'zod';

export const GrupoSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: 'El nombre es obligatorio' })
    .max(30, { message: 'no pude ecceder los 30 caracteres' })
    .regex(/^[^:]*$/, { message: 'la actividad no puede contener dos puntos (:)' }),
  actividad: z
    .string()
    .min(1, { message: 'la descripcion es obligatoria' })
    .max(255, { message: 'la descripcion no puede ser mayor a 255 caracteres' })
    .regex(/^[^:]*$/, { message: 'la actividad no puede contener dos puntos (:)' }),
});

export const GrupoEditarSchema = z.object({
  nombre: z
    .string()
    .max(30, { message: 'no pude ecceder los 30 caracteres' })
    .regex(/^[^:]*$/, { message: 'la actividad no puede contener dos puntos (:)' }),

  actividad: z
    .string()
    .max(255, { message: 'la descripcion no puede ser mayor a 255 caracteres' })
    .regex(/^[^:]*$/, { message: 'la actividad no puede contener dos puntos (:)' }),
});
