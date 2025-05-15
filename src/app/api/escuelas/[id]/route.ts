import { initDB } from '@/libs/db';
import { NextResponse } from 'next/server';
import { EscuelaService } from '@/services/escuela.service';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDB();
    const escuela = await EscuelaService.obtenerPorId(Number(params.id));
    if (!escuela) {
      return NextResponse.json(
        { error: 'Escuela no encontrada' },
        { status: 404 }
      );
    }
    return NextResponse.json(escuela);
  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: 'Error al obtener la escuela' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDB();
    const data = await request.json();
    const escuelaActualizada = await EscuelaService.actualizar(Number(params.id), data);
    if (!escuelaActualizada) {
      return NextResponse.json(
        { error: 'Escuela no encontrada' },
        { status: 404 }
      );
    }
    return NextResponse.json(escuelaActualizada);
  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: 'Error al actualizar la escuela' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDB();
    await EscuelaService.eliminar(Number(params.id));
    return new NextResponse(null, { status: 204 });
  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: 'Error al eliminar la escuela' },
      { status: 500 }
    );
  }
}