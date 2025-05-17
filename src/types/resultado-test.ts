/**
 * Tipos que necesito:
 * - respuestas Cuestionario
 * - resultados juegos
 * - carreras
 */

export type RespuestaCuestionario = {
    pregunta: string;
    respuesta: string;
    tipoDePregunta: string;
}

export type ResultadoJuego = {
    nombreJuego: string;
    descripcionJuego: string;
    puntuacion: number;
    tiempo?: number;
}

export type CarreraSugerida = {
    nombre: string;
    id: string;
}