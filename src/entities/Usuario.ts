import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from "typeorm";
import type { EstudianteMaestro } from "./EstudianteMaestro";
import type { ResultadoTestVocacional } from "./ResultadoTestVocacional";
import type { EstudianteCarreraInteres } from "./EstudianteCarreraInteres";
import { Escuela } from "./Escuela";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 100, unique: true })
  correo!: string;

  @Column({ name: 'contrasena_hash', length: 255 })
  contrasenaHash!: string;

  @Column({ length: 20 })
  rol!: 'administrador' | 'maestro' | 'estudiante';

  @Column({ name: 'fecha_nacimiento', type: 'date', nullable: false })
  fechaNacimiento!: Date;

  @Column({ length: 10, nullable: false })
  genero!: string;

  @Column({ name: 'nivel_academico', length: 50, nullable: true })
  nivelAcademico?: string;

  @Column({ length: 50, nullable: true })
  departamento?: string;

  @Column({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro!: Date;

  @Column({ default: true })
  activo!: boolean;

  @ManyToOne(() => Escuela, (escuela) => escuela.usuarios, { nullable: true })
  @JoinColumn({ name: "id_escuela" })
  escuela?: Escuela;

  @OneToMany("EstudianteMaestro", (estudianteMaestro: EstudianteMaestro) => estudianteMaestro.maestro)
  estudiantesAsignados?: EstudianteMaestro[];

  @OneToMany("ResultadoTestVocacional", (resultado: ResultadoTestVocacional) => resultado.estudiante)
  resultadosTests?: ResultadoTestVocacional[];

  @OneToMany("EstudianteCarreraInteres", (interes: EstudianteCarreraInteres) => interes.estudiante)
  carrerasInteres?: EstudianteCarreraInteres[];
}
