import {MaestroEscuelaService} from "@/services/maestroEscuela.service"
import { NextResponse } from "next/server";

export async function GET() {
    const all = await MaestroEscuelaService.obtenerTodasLasAsignaciones();

    return NextResponse.json(all);
}