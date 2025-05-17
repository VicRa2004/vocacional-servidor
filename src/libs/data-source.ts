import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "@/entities/Usuario";
import { Escuela } from "@/entities/Escuela";
import { EstudianteMaestro } from "@/entities/EstudianteMaestro";
import { Carrera } from "@/entities/Carrera";
import { ResultadoTestVocacional } from "@/entities/ResultadoTestVocacional";
import { EstudianteCarreraInteres } from "@/entities/EstudianteCarreraInteres";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "television07",
  database: "myapp",
  synchronize: true,
  logging: true,
  entities: [
    Usuario,
    Escuela,
    EstudianteMaestro,
    Carrera,
    ResultadoTestVocacional,
    EstudianteCarreraInteres
  ],
});
