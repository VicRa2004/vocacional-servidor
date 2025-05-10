import { maestroEscuelaRepository } from '@/repositories/maestroEscuelaRepository';
// import { MaestroEscuela } from '@/entities/MaestroEscuela';

export class MaestroEscuelaService {

  static asignarMaestroAEscuela(data: { maestroId: number, escuelaId: number }) {
    const nuevaAsignacion = maestroEscuelaRepository.create(data);
    return maestroEscuelaRepository.save(nuevaAsignacion);
  }

  static obtenerTodasLasAsignaciones() {
    return maestroEscuelaRepository.find({
      relations: ['maestro', 'escuela']
    });
  }

  static obtenerEscuelasDeMaestro(maestroId: number) {
    return maestroEscuelaRepository.find({
      where: { maestroId },
      relations: ['escuela']
    });
  }

  static obtenerMaestrosDeEscuela(escuelaId: number) {
    return maestroEscuelaRepository.find({
      where: { escuelaId },
      relations: ['maestro']
    });
  }

  static async reasignarMaestro(maestroId: number, nuevaEscuelaId: number) {
    await maestroEscuelaRepository.update(
      { maestroId },
      { escuelaId: nuevaEscuelaId }
    );
    return this.obtenerAsignacionPorMaestro(maestroId);
  }

  static obtenerAsignacionPorMaestro(maestroId: number) {
    return maestroEscuelaRepository.findOne({
      where: { maestroId },
      relations: ['escuela', 'maestro']
    });
  }

  static async eliminarAsignacion(maestroId: number) {
    return maestroEscuelaRepository.delete({ maestroId });
  }

  static async obtenerEscuelaDeMaestro(maestroId: number) {
    const asignacion = await maestroEscuelaRepository.findOne({
      where: { maestroId },
      relations: ['escuela']
    });
    return asignacion?.escuela;
  }

  static async obtenerMaestrosPorEscuela(escuelaId: number) {
    const asignaciones = await maestroEscuelaRepository.find({
      where: { escuelaId },
      relations: ['maestro']
    });
    return asignaciones.map(a => a.maestro);
  }
}