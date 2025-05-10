import { carreraRepository } from '@/repositories/carreraRepository';
import { Carrera } from '@/entities/Carrera';

export class CarreraService {
    
  static crear(data: Partial<Carrera>) {
    const nuevaCarrera = carreraRepository.create(data);
    return carreraRepository.save(nuevaCarrera);
  }

  static obtenerTodas() {
    return carreraRepository.find();
  }

  static obtenerPorId(id: number) {
    return carreraRepository.findOneBy({ id });
  }

  static async actualizar(id: number, data: Partial<Carrera>) {
    await carreraRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  static eliminar(id: number) {
    return carreraRepository.delete(id);
  }

  static obtenerPorNombre(nombre: string) {
    return carreraRepository.findOneBy({ nombre });
  }

  static obtenerPorAreaConocimiento(area: string) {
    return carreraRepository.find({ where: { areaConocimiento: area } });
  }
}