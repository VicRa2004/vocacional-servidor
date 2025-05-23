import { z } from "zod";

// Esquema para Carrera
const CarreraSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(1)
});

// Esquema para Pregunta
const PreguntaSchema = z.object({
  nombre: z.string().min(1),
  resultado: z.number().int().min(1).max(5),
  tiposDeCarrera: z.array(CarreraSchema)
});

// Esquema para Juego
const JuegoSchema = z.object({
  nombre: z.string().min(1),
  puntaje: z.number().int().min(1),
  tiposDeCarrera: z.array(CarreraSchema)
});

// Esquema principal para ApiBody
export const UserTestResultadoSchema = z.object({
  id: z.number().int().positive(),
  preguntas: z.array(PreguntaSchema),
  juegos: z.array(JuegoSchema)
});
