import z from "zod";

export const authSchema = z.object({
  password: z.string().min(1, "La contraseña es requerida"),
});

export type Input = z.infer<typeof authSchema>;
