import { NextResponse } from 'next/server';
import { initDB } from '@/libs/db';
import { UsuarioService } from '@/services/usuario.service';

export async function POST(request: Request) {
  try {
    console.log("se ejecuta");
    const body = await request.json();
    const { email, password } = body;

    console.log({ email, password });

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    await initDB();
    
    try {
      const resultado = await UsuarioService.login(email, password);
      return NextResponse.json(resultado);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Error de autenticación' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error en el servidor' },
      { status: error instanceof Error ? 400 : 500 }
    );
  }
}