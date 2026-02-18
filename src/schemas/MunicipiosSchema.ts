import { z } from 'zod';

const ZONAS_VALIDAS = ['NORTE', 'SUR', 'CENTRO'] as const;

export const MunicipiosSchema = z.object({
  cod_munic: z
    .string()
    .min(5, { message: 'el codigo lo conforma 5 dijitos' })
    .max(5, { message: 'el codigo lo conforma 5 dijitos' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser un número válido',
    }),
  departamento: z.string().min(1, { message: 'ingresar el departamento es obligatorio' }),
  zona: z.enum(ZONAS_VALIDAS, {message: "ingresa una zona valida"}),
  municipio: z.string().min(1, { message: 'ingresar el municipio es obligatorio' }),
});

export const MunicipiosEditarSchema = z.object({
  cod_munic: z
    .string()
    .max(5, { message: 'el codigo lo conforma 5 dijitos' })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'La cantidad debe ser un número válido',
    }),
  departamento: z.string(),
  zona: z.enum(ZONAS_VALIDAS, { message: 'ingresa una zona valida' }),
  municipio: z.string(),
});
