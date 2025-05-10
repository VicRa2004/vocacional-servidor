import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity({ name: 'estudiante_maestro' })
export class EstudianteMaestro {
  @PrimaryColumn({ name: 'estudiante_id' })
  estudianteId!: number;

  @Column({ name: 'maestro_id' })
  maestroId!: number;

  @Column({ name: 'fecha_asignacion', type: 'date', default: () => 'CURRENT_DATE' })
  fechaAsignacion!: Date;

  // Relaciones
  @ManyToOne(() => Usuario, usuario => usuario.estudiantesAsignados)
  @JoinColumn({ name: 'maestro_id' })
  maestro!: Usuario;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'estudiante_id' })
  estudiante!: Usuario;
}