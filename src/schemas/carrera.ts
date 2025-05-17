import { z } from "zod";

// Esquema para crear una nueva Carrera
export const CarreraCreateSchema = z.object({
  nombre: z.string().min(1).max(100),
  descripcion: z.string().optional(),
  areaConocimiento: z.string().max(50).optional(),
  duracionEstimada: z.string().max(20).optional(),
  demandaLaboral: z.string().max(20).optional(),
  salarioPromedio: z.string().max(50).optional(),
  competenciasClave: z.string().optional()
});

// Esquema para actualizar una Carrera existente
export const CarreraUpdateSchema = z.object({
  nombre: z.string().min(1).max(100).optional(),
  descripcion: z.string().optional().nullable(),
  areaConocimiento: z.string().max(50).optional().nullable(),
  duracionEstimada: z.string().max(20).optional().nullable(),
  demandaLaboral: z.string().max(20).optional().nullable(),
  salarioPromedio: z.string().max(50).optional().nullable(),
  competenciasClave: z.string().optional().nullable()
}).partial(); // Hace todos los campos opcionales

// Tipos TypeScript derivados de los esquemas
export type CarreraCreateInput = z.infer<typeof CarreraCreateSchema>;
export type CarreraUpdateInput = z.infer<typeof CarreraUpdateSchema>;
