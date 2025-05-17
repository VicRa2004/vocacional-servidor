import { usuarioRepository } from '@/repositories/usuarioRepository';
import { Usuario } from '@/entities/Usuario';

type CrearMaestro = Omit<Usuario, 'id' | 'rol'>;

export class MaestroService {
  static async obtenerTodos() {
    const maestros = await usuarioRepository.find({
      where: { rol: 'maestro' },
      relations: ['escuela'],
    });

    return maestros.map(({ contrasenaHash: _, ...rest }) => rest);
  }

  static async obtenerPorId(id: number) {
    const maestro = await usuarioRepository.findOne({
      where: { id, rol: 'maestro' },
      relations: ['escuela'],
    });

    if (!maestro) throw new Error('Maestro no encontrado');

    const { contrasenaHash: _, ...rest } = maestro;
    return rest;
  }

  static async crear(datos: CrearMaestro) {
    try {
      const nuevoMaestro = usuarioRepository.create({
        ...datos,
        rol: 'maestro'
      });
      return await usuarioRepository.save(nuevoMaestro);
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear el maestro');
    }
  }

  static async actualizar(id: number, datos: Partial<Usuario>) {
    const maestroExistente = await usuarioRepository.findOneBy({ id, rol: 'maestro' });
    if (!maestroExistente) throw new Error('Maestro no encontrado');

    await usuarioRepository.update(id, datos);
    return this.obtenerPorId(id);
  }

  static async eliminar(id: number) {
    const maestroExistente = await usuarioRepository.findOneBy({ id, rol: 'maestro' });
    if (!maestroExistente) throw new Error('Maestro no encontrado');
    return usuarioRepository.delete(id);
  }
}
