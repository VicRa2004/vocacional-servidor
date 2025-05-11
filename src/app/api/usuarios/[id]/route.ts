import { NextResponse } from 'next/server';
import { initDB } from "@/libs/db";
import { UsuarioService } from '@/services/usuario.service';

// GET - Obtener un usuario específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDB();
    const usuario = await UsuarioService.obtenerPorId(parseInt(params.id));
    
    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Eliminar contraseña de la respuesta
    const { contrasenaHash, ...usuarioSeguro } = usuario;
    
    return NextResponse.json(usuarioSeguro);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return NextResponse.json(
      { error: 'Error al obtener usuario' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un usuario
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await initDB();

    // Verificar si el usuario existe
    const usuarioExistente = await UsuarioService.obtenerPorId(parseInt(params.id));
    if (!usuarioExistente) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Si se está actualizando el correo, verificar que no exista
    if (body.correo && body.correo !== usuarioExistente.correo) {
      const usuarioConCorreo = await UsuarioService.obtenerPorCorreo(body.correo);
      if (usuarioConCorreo) {
        return NextResponse.json(
          { error: 'El correo ya está registrado' },
          { status: 400 }
        );
      }
    }

    const usuarioActualizado = await UsuarioService.actualizar(parseInt(params.id), body);
    
    if (!usuarioActualizado) {
      return NextResponse.json(
        { error: 'Error al actualizar usuario' },
        { status: 500 }
      );
    }

    // Eliminar contraseña de la respuesta
    const { contrasenaHash, ...usuarioSeguro } = usuarioActualizado;

    return NextResponse.json(usuarioSeguro);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return NextResponse.json(
      { error: 'Error al actualizar usuario' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un usuario
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDB();
    
    // Verificar si el usuario existe
    const usuario = await UsuarioService.obtenerPorId(parseInt(params.id));
    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    await UsuarioService.eliminar(parseInt(params.id));
    
    return NextResponse.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return NextResponse.json(
      { error: 'Error al eliminar usuario' },
      { status: 500 }
    );
  }
}