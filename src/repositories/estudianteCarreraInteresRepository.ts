import { AppDataSource } from '@/libs/data-source';
import { EstudianteCarreraInteres } from '@/entities/EstudianteCarreraInteres';

export const estudianteCarreraInteresRepository = AppDataSource.getRepository(EstudianteCarreraInteres);