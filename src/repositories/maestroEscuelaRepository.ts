import { AppDataSource } from '@/libs/data-source';
import { MaestroEscuela } from '@/entities/MaestroEscuela';

export const maestroEscuelaRepository = AppDataSource.getRepository(MaestroEscuela);