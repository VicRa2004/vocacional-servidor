import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EstudianteCarreraInteres } from "./EstudianteCarreraInteres";

@Entity({ name: 'carreras' })
export class Carrera {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ name: 'area_conocimiento', length: 50, nullable: true })
  areaConocimiento?: string;

  @Column({ name: 'duracion_estimada', length: 20, nullable: true })
  duracionEstimada?: string;

  @Column({ name: 'demanda_laboral', length: 20, nullable: true })
  demandaLaboral?: string;

  @Column({ name: 'salario_promedio', length: 50, nullable: true })
  salarioPromedio?: string;

  @Column({ name: 'competencias_clave', type: 'text', nullable: true })
  competenciasClave?: string;

  @OneToMany(() => EstudianteCarreraInteres, interes => interes.carrera)
  estudiantesInteresados?: EstudianteCarreraInteres[];
}
