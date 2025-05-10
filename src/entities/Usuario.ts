import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { MaestroEscuela } from "./MaestroEscuela";
import { EstudianteMaestro } from "./EstudianteMaestro";
import { ResultadoTestVocacional } from "./ResultadoTestVocacional";
import { EstudianteCarreraInteres } from "./EstudianteCarreraInteres";

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

  @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
  fechaNacimiento?: Date;

  @Column({ length: 10, nullable: true })
  genero?: string;

  @Column({ name: 'nivel_academico', length: 50, nullable: true })
  nivelAcademico?: string;

  @Column({ length: 50, nullable: true })
  departamento?: string;

  @Column({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro!: Date;

  @Column({ default: true })
  activo!: boolean;

  // Relaciones
  @OneToOne(() => MaestroEscuela, maestroEscuela => maestroEscuela.maestro)
  escuelaAsignada?: MaestroEscuela;

  @OneToMany(() => EstudianteMaestro, estudianteMaestro => estudianteMaestro.maestro)
  estudiantesAsignados?: EstudianteMaestro[];

  @OneToMany(() => ResultadoTestVocacional, resultado => resultado.estudiante)
  resultadosTests?: ResultadoTestVocacional[];

  @OneToMany(() => EstudianteCarreraInteres, interes => interes.estudiante)
  carrerasInteres?: EstudianteCarreraInteres[];
}