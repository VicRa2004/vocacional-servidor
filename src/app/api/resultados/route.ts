import {ResultadoTestVocacionalService} from "@/services/resultadoTestVocacional.service"

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
    }

    const resultado = await ResultadoTestVocacionalService.obtenerPorId(parseInt(id));
    
    return NextResponse.json(resultado);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { id, resultado } = body;

    if (!id || !resultado) {
        return NextResponse.json({ error: "ID o resultado no proporcionado" }, { status: 400 });
    }

    const resultadoCreado = await ResultadoTestVocacionalService.crear({
        
    });
    
    return NextResponse.json(resultadoCreado);
}