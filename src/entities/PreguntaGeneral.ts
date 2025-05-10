import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'preguntas_generales' })
export class PreguntaGeneral {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  texto!: string;

  @Column({ length: 20 })
  tipo!: string;

  @Column({ length: 50, nullable: true })
  categoria?: string;

  @Column({ name: 'opciones_respuesta', type: 'jsonb', nullable: true })
  opcionesRespuesta?: any;

  @Column({ name: 'orden_visual', nullable: true })
  ordenVisual?: number;
}