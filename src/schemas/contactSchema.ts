import { z } from 'zod';

export const code = [
  '+52',
  '+54',
  '+57',
  '+56',
  '+51',
  '+593',
  '+591',
  '+595',
  '+598',
  '+58',
  '+55',
  '+1',
  '+1',
  '+34',
  '+33',
  '+49',
  '+39',
  '+44',
  '+86',
  '+81',
  '+82',
  '+91',
  '+61',
] as const;

export const contactSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: 'El nombre es obligatorio' })
    .max(100, { message: 'El nombre no puede exceder los 100 caracteres' }),
  extension: z.enum(code, { message: 'codigo invalido' }),
  numero: z
    .string()
    .min(8, { message: 'numero de telefono muy corto' })
    .max(15, { message: 'numero de telefono muy largo' }),
  correo: z.email({ message: 'correo electronico invalido' }).optional().or(z.literal('')),

  id_negocio: z
    .string()
    .min(1, { message: 'escoga un negocio' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser un negocio válido',
    }),
});

export const contacEditarSchema = z.object({
  nombre: z.string().max(100, { message: 'El nombre no puede exceder los 100 caracteres' }),
  numero: z.string().max(15, { message: 'numero de telefono muy largo' }),
  correo: z.email({ message: 'correo electronico invalido' }).optional().or(z.literal('')),
  id_negocio: z
    .string()
    .min(1, { message: 'escoga un negocio' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser un negocio válido',
    }),
});
