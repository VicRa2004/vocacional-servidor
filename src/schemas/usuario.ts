import { z } from "zod";

// Schema para el rol de usuario
const RolSchema = z.enum(['administrador', 'maestro', 'estudiante']);

// Schema principal para Usuario
export const UsuarioSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string().max(100),
  correo: z.string().max(100).email(),
  contrasenaHash: z.string().max(255),
  rol: RolSchema,
  fechaNacimiento: z.date(),
  genero: z.string().max(10),
  nivelAcademico: z.string().max(50).optional(),
  departamento: z.string().max(50).optional(),
  fechaRegistro: z.date().optional(), 
  activo: z.boolean().default(true),
  
  // Relaciones (opcionales)
  escuelaAsignada: z.any().optional(), // Reemplazar 'any' con el schema adecuado para MaestroEscuela
  estudiantesAsignados: z.array(z.any()).optional(), // Reemplazar 'any' con el schema para EstudianteMaestro
  resultadosTests: z.array(z.any()).optional(), // Reemplazar 'any' con el schema para ResultadoTestVocacional
  carrerasInteres: z.array(z.any()).optional(), // Reemplazar 'any' con el schema para EstudianteCarreraInteres
});

// Schema para creación de usuario (sin id y fechaRegistro)
export const CreateUsuarioSchema = UsuarioSchema.omit({ 
  id: true,
  fechaRegistro: true
});

// Schema para actualización de usuario (todos los campos opcionales excepto id)
export const UpdateUsuarioSchema = UsuarioSchema.partial().required({ id: true });

// Tipo TypeScript derivado del schema
export type Usuario = z.infer<typeof UsuarioSchema>;
export type CreateUsuario = z.infer<typeof CreateUsuarioSchema>;
export type UpdateUsuario = z.infer<typeof UpdateUsuarioSchema>;