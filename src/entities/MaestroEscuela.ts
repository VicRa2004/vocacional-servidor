import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import type { Usuario } from "./Usuario";
import type { Escuela } from "./Escuela";

@Entity({ name: 'maestro_escuela' })
export class MaestroEscuela {
  @PrimaryColumn({ name: 'maestro_id' })
  maestroId!: number;

  @Column({ name: 'escuela_id' })
  escuelaId!: number;

  @Column({ name: 'fecha_asignacion', type: 'date', default: () => 'CURRENT_DATE' })
  fechaAsignacion!: Date;

  // Relaciones
  // Modificar las relaciones para usar type
  @ManyToOne("Usuario", "escuelaAsignada")
  @JoinColumn({ name: 'maestro_id' })
  maestro!: Usuario;

  @ManyToOne("Escuela", "maestrosAsignados")
  @JoinColumn({ name: 'escuela_id' })
  escuela!: Escuela;
}