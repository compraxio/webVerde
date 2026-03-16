import z from 'zod';

export const eventoSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(255, 'El nombre no puede tener más de 255 caracteres'),
  fecha: z.string(),
  direccion: z
    .string()
    .min(1, 'La dirección es requerida')
    .max(255, 'La dirección no puede tener más de 255 caracteres'),
  hora: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'La hora debe estar en formato HH:mm'),
  link: z.url('El link debe ser una URL válida').optional().or(z.literal('')),
  tema: z
    .string()
    .min(1, 'El campo tema es obligatorio')
    .refine(
      (value) => {
        const tipos = value
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t.length > 0);

        return tipos.length >= 2;
      },
      {
        message: 'Debes ingresar al menos 2 tipos separados por comas',
      },
    ),
  tipo: z.string().min(1, 'El campo tema es obligatorio').max(255, 'Superaste el maximo permitido'),
  estado: z.enum(['Activo', 'Inactivo'], 'El estado debe ser Activo o Inactivo'),
});

export type EventoInput = z.infer<typeof eventoSchema>;
