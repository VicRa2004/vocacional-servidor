import type { Pregunta, Juego } from "@/types/resultado-test";

export type CarreraElegir = {
	id: number;
	nombre: string;
	puntaje: number;
};

interface OpcionesResultado {
	preguntas: Pregunta[],
	juegos: Juego[],
}

export const verificarCarrera = ({ preguntas, juegos }: OpcionesResultado): CarreraElegir[] => {
	const carrerasMap: Map<number, CarreraElegir> = new Map();

	// Procesar preguntas
	preguntas.forEach((pregunta) => {
		pregunta.tiposDeCarrera.forEach((carrera) => {
			if (!carrerasMap.has(carrera.id)) {
				carrerasMap.set(carrera.id, { id: carrera.id, nombre: carrera.nombre, puntaje: 0 });
			}
			const carreraActual = carrerasMap.get(carrera.id)!;
			carreraActual.puntaje += pregunta.resultado;
		});
	});

	// Procesar juegos
	juegos.forEach((juego) => {
		juego.tiposDeCarrera.forEach((carrera) => {
			if (!carrerasMap.has(carrera.id)) {
				carrerasMap.set(carrera.id, { id: carrera.id, nombre: carrera.nombre, puntaje: 0 });
			}
			const carreraActual = carrerasMap.get(carrera.id)!;
			carreraActual.puntaje += juego.puntaje;
		});
	});

	// Convertir a arreglo, ordenar y tomar los 3 mejores
	const carrerasArray: CarreraElegir[] = Array.from(carrerasMap.values());
	carrerasArray.sort((a, b) => b.puntaje - a.puntaje);

	return carrerasArray.slice(0, 3);
};
