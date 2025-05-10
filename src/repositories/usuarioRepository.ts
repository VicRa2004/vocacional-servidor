import { AppDataSource } from '@/libs/data-source';
import { Usuario } from '@/entities/Usuario';

export const usuarioRepository = AppDataSource.getRepository(Usuario);