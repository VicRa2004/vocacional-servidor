import { NextResponse } from 'next/server';
import { initDB } from "@/libs/db";
import { CarreraService } from '@/services/carrera.service';
import { parseSchema } from '@/libs/validate-schema';
import { CarreraCreateSchema } from '@/schemas/carrera';

// GET - Obtener todos los usuarios
export async function GET() {
  try {
    await initDB();

    const carreras = await CarreraService.obtenerTodas();
    
    return NextResponse.json(carreras);
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
    
    // Validar los datos recibidos
    const data = parseSchema(CarreraCreateSchema, body);

    const nuevaCarrera = await CarreraService.crear({
      ...data,
    });

    return NextResponse.json(nuevaCarrera, { status: 201 });
  } catch (error) {
    console.error('Error al crear la carrera:', error);
    return NextResponse.json(
      { error: 'Error al crear la carrera' },
      { status: 500 }
    );
  }
}