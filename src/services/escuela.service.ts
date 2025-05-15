import { escuelaRepository } from '@/repositories/escuelaRepository';
import { Escuela } from '@/entities/Escuela';

export class EscuelaService {
    
  static crear(data: Omit<Escuela, "id">) {
    const nuevaEscuela = escuelaRepository.create(data);
    return escuelaRepository.save(nuevaEscuela);
  }

  static obtenerTodas() {
    return escuelaRepository.find();
  }

  static obtenerPorId(id: number) {
    return escuelaRepository.findOneBy({ id });
  }

  static async actualizar(id: number, data: Partial<Escuela>) {
    await escuelaRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  static eliminar(id: number) {
    return escuelaRepository.delete(id);
  }

  static obtenerPorNombre(nombre: string) {
    return escuelaRepository.findOneBy({ nombre });
  }

  static obtenerPorCiudad(ciudad: string) {
    return escuelaRepository.find({ where: { ciudad } });
  }

  static obtenerEscuelasActivas() {
    return escuelaRepository.find({ where: { activa: true } });
  }

  static async desactivarEscuela(id: number) {
    await escuelaRepository.update(id, { activa: false });
    return this.obtenerPorId(id);
  }
}