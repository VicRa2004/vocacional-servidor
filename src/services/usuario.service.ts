import { usuarioRepository } from '@/repositories/usuarioRepository';
import { Usuario } from '@/entities/Usuario';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

interface LoginResponse {
  usuario: Omit<Usuario, 'contrasenaHash'>;
  token: string;
}

const cleanUsers = (users: Usuario[]) => {
  return users.map(({ contrasenaHash: _, ...usuario }) => usuario);
}

type CrearUsuario = Omit<Usuario, 'id' | "rol">;

export class UsuarioService {
  static async login(correo: string, contrasena: string): Promise<LoginResponse> {
    try {
      const usuario = await usuarioRepository.findOneBy({ correo });
      
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      const isValidPassword = await compare(contrasena, usuario.contrasenaHash);
      
      if (!isValidPassword) {
        throw new Error('Contraseña incorrecta');
      }

      // Generar JWT token
      const token = jwt.sign(
        { 
          id: usuario.id,
          correo: usuario.correo,
          rol: usuario.rol 
        },
        process.env.JWT_SECRET || 'tu_secret_key',
        { expiresIn: '24h' }
      );

      // Retornar usuario sin contraseña y token
      const { contrasenaHash, ...usuarioSinContrasena } = usuario;

      console.log(contrasenaHash)
      
      return {
        usuario: usuarioSinContrasena,
        token
      };
    } catch (error) {
      throw error;
    }
  }

  static async verificarToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secret_key');
      return decoded;
    } catch (error) {
      console.log(error)
      throw new Error('Token inválido');
    }
  }

  static async obtenerTodos() {
    const users = await usuarioRepository.find();

    return cleanUsers(users);
  }

  static async obtenerPorRol(rol: "administrador" | "estudiante" | "maestro" | null) {

    if (!rol) {
      const users = await usuarioRepository.find();

      return cleanUsers(users);
    }

    const users = await usuarioRepository.findBy({ rol });

    return cleanUsers(users);
  }

  static async obtenerPorId(id: number) {
    return usuarioRepository.findOneBy({ id });
  }

  static async actualizar(id: number, datos: Partial<Usuario>) {
    await usuarioRepository.update(id, datos);
    return this.obtenerPorId(id);
  }

  static async eliminar(id: number) {
    return usuarioRepository.delete(id);
  }

  static obtenerPorCorreo(correo: string) {
    return usuarioRepository.findOneBy({ correo });
  }

  static async crearUsuario(datos: Usuario) {
    try {
      const nuevoUsuario = usuarioRepository.create({
        ...datos,
        rol: "administrador"
      });
      return await usuarioRepository.save(nuevoUsuario);
    } catch (error) {
      console.log(error)
      throw new Error('Error al crear el usuario');
    }
  }

  static async crearUsuarioEstudiante(datos: CrearUsuario) {
    try {
      const nuevoUsuario = usuarioRepository.create({
        ...datos,
        rol: "estudiante"
      });

      return await usuarioRepository.save(nuevoUsuario);
    } catch (error) {
      console.log(error)
      throw new Error('Error al crear el usuario');
    }
  }

  static async crearUsuarioAdmin(datos: CrearUsuario) {
    try {
      const nuevoUsuario = usuarioRepository.create({
        ...datos,
        rol: "administrador"
      });
      return await usuarioRepository.save(nuevoUsuario);
    } catch (error) {
      console.log(error)
      throw new Error('Error al crear el usuario');
    }
  }

  static async crearUsuarioMaestro(datos: CrearUsuario) {
    try {
      const nuevoUsuario = usuarioRepository.create({
        ...datos,
        rol: "maestro"
      });
      return await usuarioRepository.save(nuevoUsuario);
    } catch (error) {
      console.log(error)
      throw new Error('Error al crear el usuario');
    }
  }
}
