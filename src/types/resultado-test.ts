type Carrera = {
	id: number;
	nombre: string;
}

export type Pregunta = {
	nombre: string; // Pregunta
	resultado: number; // -> 1,2,3,4,5 -> Puntaje
	tiposDeCarrera: Carrera[]; // Carreras para esta pregunta
}

export type Juego = {
	nombre: string; // Pregunta
	puntaje: number; // -> 1,2,3,4,5 -> Puntaje
	tiposDeCarrera: Carrera[]; // Carreras para esta pregunta
}

export type CarreraElegir = {
	id: number;
	nombre: string;
	puntaje: number; // Puntaje para saber cuanto se escoge.
}


// Ejemplo para schema

export type UserTestResultado = {
	id: number,
	preguntas: Pregunta[],
	juegos: Juego[],
}