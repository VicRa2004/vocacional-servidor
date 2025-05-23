import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import type { Usuario } from "./Usuario";
import type {Juego, Pregunta, CarreraElegir} from "@/types/resultado-test"

@Entity({ name: 'resultados_test_vocacional' })
export class ResultadoTestVocacional {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'estudiante_id' })
  estudianteId!: number;

  @Column({ name: 'fecha_completado', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCompletado!: Date;

  @Column({ name: 'respuestas_cuestionario', type: 'jsonb', nullable: false })
  resultadosPreguntas?: Pregunta[];

  @Column({ name: 'resultados_juegos', type: 'jsonb', nullable: false })
  resultadosJuegos?: Juego[];

  @Column({ name: 'carreras_sugeridas', type: 'jsonb', nullable: true })
  carrerasSugeridas?: CarreraElegir[];

  @Column({ default: false })
  completado!: boolean;

  // Relación
  @ManyToOne("Usuario", (usuario: Usuario) => usuario.resultadosTests)
  @JoinColumn({ name: 'estudiante_id' })
  estudiante!: Usuario;
}