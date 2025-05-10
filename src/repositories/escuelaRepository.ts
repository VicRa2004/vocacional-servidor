import { AppDataSource } from '@/libs/data-source';
import { Escuela } from '@/entities/Escuela';

export const escuelaRepository = AppDataSource.getRepository(Escuela);