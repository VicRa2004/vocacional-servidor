import { AppDataSource } from '@/libs/data-source';
import { PreguntaGeneral } from '@/entities/PreguntaGeneral';

export const preguntaGeneralRepository = AppDataSource.getRepository(PreguntaGeneral);