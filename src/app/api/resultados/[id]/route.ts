import { initDB } from "@/libs/db";
import { ResultadoTestVocacionalService } from "@/services/resultadoTestVocacional.service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const numericId = Number(id);

  if (!id || isNaN(numericId)) {
    return NextResponse.json({ error: "ID inválido o no proporcionado" }, { status: 400 });
  }

  await initDB();

  const resultado = await ResultadoTestVocacionalService.obtenerPorId(numericId);

  return NextResponse.json(resultado || []);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const numericId = Number(id);

  if (!id || isNaN(numericId)) {
    return NextResponse.json({ error: "ID inválido o no proporcionado" }, { status: 400 });
  }

  const data = await request.json();
  console.log("Carreras sugeridas:", data);

  await initDB();

  const resultado = await ResultadoTestVocacionalService.guardarCarrerasSugeridas(
    numericId,
    data
  );

  return NextResponse.json(resultado || []);
}
