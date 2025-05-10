import { AppDataSource } from '@/libs/data-source';
import { Juego } from '@/entities/Juego';

export const juegoRepository = AppDataSource.getRepository(Juego);