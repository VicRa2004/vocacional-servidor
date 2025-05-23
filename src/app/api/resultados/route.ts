import { parseSchema } from "@/libs/validate-schema";
import { UserTestResultadoSchema } from "@/schemas/resultados";
import { ResultadoTestVocacionalService } from "@/services/resultadoTestVocacional.service";
import { NextResponse } from "next/server";
import {initDB} from '@/libs/db'

export async function GET() {

  await initDB();

  const resultado = await ResultadoTestVocacionalService.obtenerTodos();

  return NextResponse.json(resultado);
}

export async function POST(request: Request) {
  try {

    const body = await request.json();

    console.log(JSON.stringify(body));

    await initDB();

    const { id, juegos, preguntas } = parseSchema(
      UserTestResultadoSchema,
      body
    );

    const resultadoCreado = await ResultadoTestVocacionalService.crear({
        completado: true,
        estudianteId: id,
        resultadosJuegos: juegos,
        resultadosPreguntas: preguntas,
    });

    return NextResponse.json(resultadoCreado);
    //return NextResponse.json('se creo con exito, "la verdad no"');
  } catch (error) {
     console.error('Error al guardar el resultado:', error);
    return NextResponse.json(
      { error: 'Error al guardar el resultado' },
      { status: 500 }
    );
  }
}
