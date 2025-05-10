import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MaestroEscuela } from "./MaestroEscuela";

@Entity()
export class Escuela {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ type: 'text', nullable: true })
  direccion?: string;

  @Column({ length: 50, nullable: true })
  ciudad?: string;

  @Column({ length: 50, nullable: true })
  estado?: string;

  @Column({ name: 'codigo_postal', length: 10, nullable: true })
  codigoPostal?: string;

  @Column({ length: 20, nullable: true })
  telefono?: string;

  @Column({ name: 'fecha_creacion', type: 'date', nullable: true })
  fechaCreacion?: Date;

  @Column({ default: true })
  activa!: boolean;

  @OneToMany(() => MaestroEscuela, maestroEscuela => maestroEscuela.escuela)
  maestrosAsignados?: MaestroEscuela[];
}