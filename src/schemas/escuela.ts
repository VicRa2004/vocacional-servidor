import { z } from "zod";

// Esquema para crear una nueva Escuela
export const EscuelaCreateSchema = z.object({
  nombre: z.string().min(1).max(100),
  direccion: z.string().optional(),
  ciudad: z.string().max(50).optional(),
  estado: z.string().max(50).optional(),
  codigoPostal: z.string().max(10).optional(),
  telefono: z.string().max(20).optional(),
  fechaCreacion: z.string().date().optional(),
  activa: z.boolean().default(true)
});

// Esquema para actualizar una Escuela existente
export const EscuelaUpdateSchema = z.object({
  nombre: z.string().min(1).max(100).optional(),
  direccion: z.string().optional(),
  ciudad: z.string().max(50).optional().nullable(),
  estado: z.string().max(50).optional().nullable(),
  codigoPostal: z.string().max(10).optional().nullable(),
  telefono: z.string().max(20).optional().nullable(),
  fechaCreacion: z.date().optional().nullable(),
  activa: z.boolean().optional()
}).partial(); // Hace que todos los campos sean opcionales

// Tipos TypeScript derivados de los esquemas
export type EscuelaCreateInput = z.infer<typeof EscuelaCreateSchema>;
export type EscuelaUpdateInput = z.infer<typeof EscuelaUpdateSchema>;