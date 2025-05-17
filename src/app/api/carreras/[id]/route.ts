import { NextResponse } from 'next/server';
import { initDB } from "@/libs/db";
import { CarreraService } from '@/services/carrera.service';
import { CarreraCreateSchema} from "@/schemas/carrera"
import {parseSchema} from '@/libs/validate-schema'

const verificarId = (id: string | null) => {
    if (!id) {
        throw new Error("Id es null");
    }

    return parseInt(id);
}

// GET - Obtener todos los usuarios
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await initDB();

    const carreraId = verificarId(params.id);

    const carrera = await CarreraService.obtenerPorId(carreraId);
    
    if (!carrera) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(carrera);
  } catch (error) {
    console.error('Error al obtener carreras:', error);
    return NextResponse.json(
      { error: 'Error al obtener carreras' },
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

    const carreraId = verificarId(params.id);

    // Verificar si el usuario existe
    const carreraExistente = await CarreraService.obtenerPorId(carreraId);
    
    if (!carreraExistente) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    const newData = parseSchema(CarreraCreateSchema, body);

    const carreraActualizado = await CarreraService.actualizar(carreraId, newData);
    
    if (!carreraActualizado) {
      return NextResponse.json(
        { error: 'Error al actualizar usuario' },
        { status: 500 }
      );
    }

    return NextResponse.json(carreraActualizado);
  } catch (error) {
    console.error('Error al actualizar la carrera:', error);
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

    const carreraId = verificarId(params.id);
    
    // Verificar si el usuario existe
    const carreraExistente = await CarreraService.obtenerPorId(carreraId);
    
    if (!carreraExistente) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    await CarreraService.eliminar(carreraId);
    
    return NextResponse.json({ mensaje: 'Carrera eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar carrera:', error);
    return NextResponse.json(
      { error: 'Error al eliminar carrera' },
      { status: 500 }
    );
  }
}