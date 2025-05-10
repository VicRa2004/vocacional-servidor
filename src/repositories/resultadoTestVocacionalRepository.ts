import { AppDataSource } from '@/libs/data-source';
import { ResultadoTestVocacional } from '@/entities/ResultadoTestVocacional';

export const resultadoTestVocacionalRepository = AppDataSource.getRepository(ResultadoTestVocacional);