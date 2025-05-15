import {initDB} from "@/libs/db";
import { NextResponse } from 'next/server';
import { EscuelaService } from '@/services/escuela.service';
import { parseSchema } from "@/libs/validate-schema";
import { EscuelaCreateSchema } from "@/schemas/escuela";

export async function GET() {
  try {
    await initDB();
    const escuelas = await EscuelaService.obtenerTodas();
    return NextResponse.json(escuelas);
  } catch (error) {

    console.error('Error al obtener las escuelas:', error);

    return NextResponse.json(
      { error: 'Error al obtener las escuelas' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await initDB();
    const body = await request.json();
    console.log(body)
    
    // Validar los datos recibidos
    const data = parseSchema(EscuelaCreateSchema, body);


    const nuevaEscuela = await EscuelaService.crear({
      ...data,
      activa: data.activa || false,
      fechaCreacion: new Date(data.fechaCreacion || Date.now()),
    });

    return NextResponse.json(nuevaEscuela, { status: 201 });
  } catch (error) {
    console.error('Error al crear la escuela:', error);
    return NextResponse.json(
      { error: 'Error al crear la escuela' },
      { status: 500 }
    );
  }
}