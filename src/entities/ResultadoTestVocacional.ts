import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity({ name: 'resultados_test_vocacional' })
export class ResultadoTestVocacional {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'estudiante_id' })
  estudianteId!: number;

  @Column({ name: 'fecha_completado', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCompletado!: Date;

  @Column({ name: 'respuestas_cuestionario', type: 'jsonb', nullable: true })
  respuestasCuestionario?: any;

  @Column({ name: 'resultados_juegos', type: 'jsonb', nullable: true })
  resultadosJuegos?: any;

  @Column({ name: 'carreras_sugeridas', type: 'jsonb', nullable: true })
  carrerasSugeridas?: any;

  @Column({ default: false })
  completado!: boolean;

  // Relación
  @ManyToOne(() => Usuario, usuario => usuario.resultadosTests)
  @JoinColumn({ name: 'estudiante_id' })
  estudiante!: Usuario;
}