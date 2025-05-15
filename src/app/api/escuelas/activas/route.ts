import { initDB } from '@/libs/db';
import { NextResponse } from 'next/server';
import { EscuelaService } from '@/services/escuela.service';

export async function GET() {
  try {
    await initDB();
    const escuelasActivas = await EscuelaService.obtenerEscuelasActivas();
    return NextResponse.json(escuelasActivas);
  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: 'Error al obtener las escuelas activas' },
      { status: 500 }
    );
  }
}