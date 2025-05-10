// src/data-source.ts
import { DataSource } from "typeorm";
import { Usuario } from "@/entities/Usuario";
import { Escuela } from "@/entities/Escuela";
import {Carrera} from "@/entities/Carrera"
import { MaestroEscuela } from "@/entities/MaestroEscuela";
import { EstudianteMaestro } from "@/entities/EstudianteMaestro";
import { Juego } from "@/entities/Juego";
import { PreguntaGeneral } from "@/entities/PreguntaGeneral";
import { ResultadoTestVocacional } from "@/entities/ResultadoTestVocacional";
import { EstudianteCarreraInteres } from "@/entities/EstudianteCarreraInteres";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "television07",
  database: "vocacional",
  synchronize: true, // solo en desarrollo
  logging: true,
  entities: [
        Usuario,
        Escuela,
        MaestroEscuela,
        EstudianteMaestro,
        Carrera,
        Juego,
        PreguntaGeneral,
        ResultadoTestVocacional,
        EstudianteCarreraInteres
    ],
});
