import {MaestroEscuelaService} from "@/services/maestroEscuela.service"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {maestroId, escuelaId} = await request.json();

    if (!maestroId || !escuelaId) {
        return NextResponse.json({error: "Faltan datos para asignar el maestro a la escuela"}, {status: 400});
    }

    const response = await MaestroEscuelaService.asignarMaestroAEscuela({maestroId, escuelaId});
    return NextResponse.json(response);
}