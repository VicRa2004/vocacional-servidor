import { preguntaGeneralRepository } from '@/repositories/preguntaGeneralRepository';
import { PreguntaGeneral } from '@/entities/PreguntaGeneral';
import { IsNull, Not } from 'typeorm';

export class PreguntaGeneralService {
    
  static crear(data: Partial<PreguntaGeneral>) {
    const nuevaPregunta = preguntaGeneralRepository.create(data);
    return preguntaGeneralRepository.save(nuevaPregunta);
  }

  static obtenerTodas() {
    return preguntaGeneralRepository.find({
      order: { ordenVisual: 'ASC' } // Ordenar por orden visual por defecto
    });
  }

  static obtenerPorId(id: number) {
    return preguntaGeneralRepository.findOneBy({ id });
  }

  static async actualizar(id: number, data: Partial<PreguntaGeneral>) {
    await preguntaGeneralRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  static eliminar(id: number) {
    return preguntaGeneralRepository.delete(id);
  }

  static obtenerPorTipo(tipo: string) {
    return preguntaGeneralRepository.find({ 
      where: { tipo },
      order: { ordenVisual: 'ASC' }
    });
  }

  static obtenerPorCategoria(categoria: string) {
    return preguntaGeneralRepository.find({
      where: { categoria },
      order: { ordenVisual: 'ASC' }
    });
  }

  static async actualizarOrdenVisual(id: number, nuevoOrden: number) {
    await preguntaGeneralRepository.update(id, { ordenVisual: nuevoOrden });
    return this.obtenerPorId(id);
  }

  static obtenerPreguntasConOpciones() {
    return preguntaGeneralRepository.find({
      where: { opcionesRespuesta: Not(IsNull()) },
      order: { ordenVisual: 'ASC' }
    });
  }
}