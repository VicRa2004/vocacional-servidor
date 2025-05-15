import { ZodError, type ZodSchema } from "zod";

/**
 * Función genérica para parsear datos con un schema Zod
 * @param schema Schema Zod a utilizar
 * @param data Datos a validar
 * @returns Objeto parseado o lanza un error con detalles de validación
 */
export function parseSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      // Formatea los errores de validación de manera más legible
      const formattedErrors = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      
      throw new Error(
        `Validation failed:\n${formattedErrors.map(e => `- ${e.path}: ${e.message}`).join('\n')}`
      );
    }
    throw new Error('Unknown validation error');
  }
}