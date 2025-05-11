import { NextResponse } from 'next/server';
import { UsuarioService } from '@/services/usuario.service';
import { hash } from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      correo, 
      contrasena, 
      nombre,
      rol = 'ESTUDIANTE' // rol por defecto
    } = body;

    // Validaciones básicas
    if (!correo || !contrasena || !nombre) {
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

    // Validar longitud de contraseña
    if (contrasena.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
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

    // Crear el usuario
    const nuevoUsuario = await UsuarioService.crearUsuario({
      correo,
      contrasenaHash,
      nombre,
      rol,
      fechaRegistro: new Date(),
      activo: true,
    });

    // Generar token JWT para login automático
    const { token } = await UsuarioService.login(correo, contrasena);

    // Retornar usuario creado (sin contraseña) y token
    const { contrasenaHash: _, ...usuarioSinContrasena } = nuevoUsuario;

    console.log(_);

    return NextResponse.json({
      mensaje: 'Usuario creado exitosamente',
      usuario: usuarioSinContrasena,
      token
    });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    return NextResponse.json(
      { error: 'Error al crear el usuario' },
      { status: 500 }
    );
  }
}