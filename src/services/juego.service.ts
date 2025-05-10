import { juegoRepository } from '@/repositories/juegoRepository';
import { Juego } from '@/entities/Juego';

export class JuegoService {
    
  static crear(data: Partial<Juego>) {
    const nuevoJuego = juegoRepository.create(data);
    return juegoRepository.save(nuevoJuego);
  }

  static obtenerTodos() {
    return juegoRepository.find();
  }

  static obtenerActivos() {
    return juegoRepository.find({ where: { activo: true } });
  }

  static obtenerPorId(id: number) {
    return juegoRepository.findOneBy({ id });
  }

  static async actualizar(id: number, data: Partial<Juego>) {
    await juegoRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  static eliminar(id: number) {
    return juegoRepository.delete(id);
  }

  static async desactivar(id: number) {
    await juegoRepository.update(id, { activo: false });
    return this.obtenerPorId(id);
  }

  static async activar(id: number) {
    await juegoRepository.update(id, { activo: true });
    return this.obtenerPorId(id);
  }

  static obtenerPorNombre(nombre: string) {
    return juegoRepository.findOneBy({ nombre });
  }

  static obtenerPorTipo(tipoJuego: string) {
    return juegoRepository.find({ where: { tipoJuego } });
  }

  static obtenerPorDificultad(nivelDificultad: string) {
    return juegoRepository.find({ 
      where: { nivelDificultad },
      order: { duracionEstimada: 'ASC' }
    });
  }
}