import type { Carrera } from "@/entities/Carrera";

export type CreateCarrera = Omit<Carrera, "id">;
