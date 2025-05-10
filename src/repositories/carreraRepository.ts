import { AppDataSource } from '@/libs/data-source';
import { Carrera } from '@/entities/Carrera';

export const carreraRepository = AppDataSource.getRepository(Carrera);