import { AppDataSource } from '@/libs/data-source';
import { EstudianteMaestro } from '@/entities/EstudianteMaestro';

export const estudianteMaestroRepository = AppDataSource.getRepository(EstudianteMaestro);