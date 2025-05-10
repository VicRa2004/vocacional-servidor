import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { Escuela } from "./Escuela";

@Entity({ name: 'maestro_escuela' })
export class MaestroEscuela {
  @PrimaryColumn({ name: 'maestro_id' })
  maestroId!: number;

  @Column({ name: 'escuela_id' })
  escuelaId!: number;

  @Column({ name: 'fecha_asignacion', type: 'date', default: () => 'CURRENT_DATE' })
  fechaAsignacion!: Date;

  // Relaciones
  @ManyToOne(() => Usuario, usuario => usuario.escuelaAsignada)
  @JoinColumn({ name: 'maestro_id' })
  maestro!: Usuario;

  @ManyToOne(() => Escuela, escuela => escuela.maestrosAsignados)
  @JoinColumn({ name: 'escuela_id' })
  escuela!: Escuela;
}