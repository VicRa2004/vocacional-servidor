import { usuarioRepository } from '@/repositories/usuarioRepository';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '@/entities/Usuario';

interface LoginResponse {
  usuario: Omit<Usuario, 'contrasenaHash'>;
  token: string;
}

export class AuthService {
  static async login(correo: string, contrasena: string): Promise<LoginResponse> {
    const usuario = await usuarioRepository.findOneBy({ correo });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const isValidPassword = await compare(contrasena, usuario.contrasenaHash);

    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        correo: usuario.correo,
        rol: usuario.rol
      },
      process.env.JWT_SECRET || 'tu_secret_key',
      { expiresIn: '24h' }
    );

    const { contrasenaHash: _, ...usuarioSinContrasena } = usuario;

    return {
      usuario: usuarioSinContrasena,
      token
    };
  }

  static verificarToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secret_key');
      return decoded;
    } catch (error) {
      console.log(error);
      throw new Error('Token inválido');
    }
  }

}
