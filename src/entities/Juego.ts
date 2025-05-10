import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'juegos' })
export class Juego {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ name: 'tipo_juego', length: 50 })
  tipoJuego!: string;

  @Column({ name: 'nivel_dificultad', length: 20, nullable: true })
  nivelDificultad?: string;

  @Column({ name: 'duracion_estimada', nullable: true })
  duracionEstimada?: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: any;

  @Column({ default: true })
  activo!: boolean;
}