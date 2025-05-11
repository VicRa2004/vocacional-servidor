import { NextResponse } from 'next/server';
import { initDB } from "@/libs/db";
import { UsuarioService } from '@/services/usuario.service';
import { hash } from 'bcrypt';

// GET - Obtener todos los usuarios
export async function GET() {
  try {
    await initDB();
    const usuarios = await UsuarioService.obtenerTodos();
    
    // Eliminar contraseñas de la respuesta
    const usuariosSeguros = usuarios.map(({ _contrasenaHash, ...usuario }) => usuario);
    
    return NextResponse.json(usuariosSeguros);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { error: 'Error al obtener usuarios' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await initDB();
    const body = await request.json();
    const { nombre, correo, contrasena, rol } = body;

    // Validaciones básicas
    if (!nombre || !correo || !contrasena || !rol) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return NextResponse.json(
        { error: 'Formato de correo inválido' },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await UsuarioService.obtenerPorCorreo(correo);
    if (usuarioExistente) {
      return NextResponse.json(
        { error: 'El correo ya está registrado' },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const contrasenaHash = await hash(contrasena, 10);

    let nuevoUsuario;
    switch (rol) {
      case 'estudiante':
        nuevoUsuario = await UsuarioService.crearUsuarioEstudiante({
          nombre,
          correo,
          contrasenaHash,
          fechaRegistro: new Date(),
          activo: true,
        });
        break;
      case 'maestro':
        nuevoUsuario = await UsuarioService.crearUsuarioMaestro({
          nombre,
          correo,
          contrasenaHash,
          fechaRegistro: new Date(),
          activo: true,
        });
        break;
      case 'administrador':
        nuevoUsuario = await UsuarioService.crearUsuarioAdmin({
          nombre,
          correo,
          contrasenaHash,
          fechaRegistro: new Date(),
          activo: true,
        });
        break;
      default:
        return NextResponse.json(
          { error: 'Rol no válido' },
          { status: 400 }
        );
    }

    // Retornar usuario creado (sin contraseña)
    const { contrasenaHash: _, ...usuarioSinContrasena } = nuevoUsuario;

    return NextResponse.json({
      mensaje: 'Usuario creado exitosamente',
      usuario: usuarioSinContrasena
    });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    return NextResponse.json(
      { error: 'Error al crear el usuario' },
      { status: 500 }
    );
  }
}