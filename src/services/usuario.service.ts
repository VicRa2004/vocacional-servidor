import { usuarioRepository } from '@/repositories/usuarioRepository';
import { Usuario } from '@/entities/Usuario';

export class UsuarioService {
    
  static crear(data: Partial<Usuario>) {
    const nuevo = usuarioRepository.create(data);
    return usuarioRepository.save(nuevo);
  }

  static obtenerTodos() {
    return usuarioRepository.find();
  }

  static obtenerPorId(id: number) {
    return usuarioRepository.findOneBy({ id });
  }

  static async actualizar(id: number, data: Partial<Usuario>) {
    await usuarioRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  static eliminar(id: number) {
    return usuarioRepository.delete(id);
  }

  static obtenerPorCorreo(correo: string) {
    return usuarioRepository.findOneBy({ correo });
  }
}
