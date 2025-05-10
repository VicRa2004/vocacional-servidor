import { estudianteMaestroRepository } from '@/repositories/estudianteMaestroRepository';
// import { EstudianteMaestro } from '@/entities/EstudianteMaestro';

export class EstudianteMaestroService {

  static async asignarEstudianteAMaestro(data: { estudianteId: number, maestroId: number }) {
    const nuevaAsignacion = estudianteMaestroRepository.create(data);
    return estudianteMaestroRepository.save(nuevaAsignacion);
  }

  static obtenerTodasLasAsignaciones() {
    return estudianteMaestroRepository.find({
      relations: ['estudiante', 'maestro']
    });
  }

  static obtenerAsignacionesPorEstudiante(estudianteId: number) {
    return estudianteMaestroRepository.find({
      where: { estudianteId },
      relations: ['maestro']
    });
  }

  static obtenerAsignacionesPorMaestro(maestroId: number) {
    return estudianteMaestroRepository.find({
      where: { maestroId },
      relations: ['estudiante']
    });
  }

  static async reasignarEstudiante(estudianteId: number, nuevoMaestroId: number) {
    await estudianteMaestroRepository.update(
      { estudianteId },
      { maestroId: nuevoMaestroId }
    );
    return this.obtenerAsignacionPorEstudiante(estudianteId);
  }

  static obtenerAsignacionPorEstudiante(estudianteId: number) {
    return estudianteMaestroRepository.findOne({
      where: { estudianteId },
      relations: ['maestro', 'estudiante']
    });
  }

  static async eliminarAsignacion(estudianteId: number) {
    return estudianteMaestroRepository.delete({ estudianteId });
  }

  static async obtenerMaestroDeEstudiante(estudianteId: number) {
    const asignacion = await estudianteMaestroRepository.findOne({
      where: { estudianteId },
      relations: ['maestro']
    });
    return asignacion?.maestro;
  }

  static async obtenerEstudiantesDeMaestro(maestroId: number) {
    const asignaciones = await estudianteMaestroRepository.find({
      where: { maestroId },
      relations: ['estudiante']
    });
    return asignaciones.map(a => a.estudiante);
  }
}