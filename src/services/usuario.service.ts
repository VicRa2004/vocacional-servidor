import { usuarioRepository } from '@/repositories/usuarioRepository';
import { Usuario } from '@/entities/Usuario';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

interface LoginResponse {
  usuario: Omit<Usuario, 'contrasenaHash'>;
  token: string;
}

type CrearUsuarioDTO = Omit<Usuario, 'id'>;

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

  static obtenerPorId(id: number) {
    return usuarioRepository.findOneBy({ id });
  }

  static obtenerPorCorreo(correo: string) {
    return usuarioRepository.findOneBy({ correo });
  }

  static async crearUsuario(datos: CrearUsuarioDTO) {
    try {
      const nuevoUsuario = usuarioRepository.create(datos);
      return await usuarioRepository.save(nuevoUsuario);
    } catch (error) {
      console.log(error)
      throw new Error('Error al crear el usuario');
    }
  }
}
