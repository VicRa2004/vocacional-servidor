import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import type { Usuario } from "./Usuario";
import type { Carrera } from "./Carrera";

@Entity({ name: 'estudiante_carrera_interes' })
export class EstudianteCarreraInteres {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'estudiante_id' })
  estudianteId!: number;

  @Column({ name: 'carrera_id' })
  carreraId!: number;

  @Column({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro!: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  interes?: number;

  @Column({ length: 50, nullable: true })
  origen?: string;

  // Relaciones
  @ManyToOne("Usuario", (usuario: Usuario) => usuario.carrerasInteres)
  @JoinColumn({ name: 'estudiante_id' })
  estudiante!: Usuario;

  @ManyToOne("Carrera", (carrera: Carrera) => carrera.estudiantesInteresados)
  @JoinColumn({ name: 'carrera_id' })
  carrera!: Carrera;
}