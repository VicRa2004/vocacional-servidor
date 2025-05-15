import { NextResponse } from 'next/server';
import { initDB } from "@/libs/db";
import { UsuarioService } from '@/services/usuario.service';
import { hash } from 'bcrypt';
import { CreateUsuarioSchema} from "@/schemas/usuario"
import {parseSchema} from '@/libs/validate-schema'

// GET - Obtener todos los usuarios
export async function GET(request: Request) {
  try {
    await initDB();

    const { searchParams } = new URL(request.url)

    const rol = searchParams.get("rol");

    const usuarios = await UsuarioService.obtenerPorRol(rol as "administrador" | "estudiante" | "maestro" | null);
    
    return NextResponse.json(usuarios);
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

    console.log(body)

    // Validar el cuerpo de la solicitud
    const newUser = parseSchema(CreateUsuarioSchema, {
      contrasenaHash: body.contrasena,
      ...body
    });
    
    // Verificar si el usuario ya existe
    const usuarioExistente = await UsuarioService.obtenerPorCorreo(newUser.correo);
    if (usuarioExistente) {
      return NextResponse.json(
        { error: 'El correo ya está registrado' },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const contrasenaHash = await hash(newUser.contrasenaHash, 10);

    let nuevoUsuario;

    const { nombre, correo, rol } = newUser;

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