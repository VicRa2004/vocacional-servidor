import { estudianteCarreraInteresRepository } from '@/repositories/estudianteCarreraInteresRepository';
import { EstudianteCarreraInteres } from '@/entities/EstudianteCarreraInteres';

export class EstudianteCarreraInteresService {
    
  static crear(data: Partial<EstudianteCarreraInteres>) {
    const nuevoInteres = estudianteCarreraInteresRepository.create(data);
    return estudianteCarreraInteresRepository.save(nuevoInteres);
  }

  static obtenerTodos() {
    return estudianteCarreraInteresRepository.find({
      relations: ['estudiante', 'carrera']
    });
  }

  static obtenerPorId(id: number) {
    return estudianteCarreraInteresRepository.findOne({
      where: { id },
      relations: ['estudiante', 'carrera']
    });
  }

  static async actualizar(id: number, data: Partial<EstudianteCarreraInteres>) {
    await estudianteCarreraInteresRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  static eliminar(id: number) {
    return estudianteCarreraInteresRepository.delete(id);
  }

  static obtenerPorEstudiante(estudianteId: number) {
    return estudianteCarreraInteresRepository.find({
      where: { estudianteId },
      relations: ['carrera'],
      order: { interes: 'DESC' }
    });
  }

  static obtenerPorCarrera(carreraId: number) {
    return estudianteCarreraInteresRepository.find({
      where: { carreraId },
      relations: ['estudiante'],
      order: { interes: 'DESC' }
    });
  }

  static async actualizarInteres(estudianteId: number, carreraId: number, interes: number) {
    await estudianteCarreraInteresRepository.update(
      { estudianteId, carreraId },
      { interes }
    );
    return this.obtenerPorEstudianteYCarrera(estudianteId, carreraId);
  }

  static obtenerPorEstudianteYCarrera(estudianteId: number, carreraId: number) {
    return estudianteCarreraInteresRepository.findOne({
      where: { estudianteId, carreraId },
      relations: ['estudiante', 'carrera']
    });
  }
}