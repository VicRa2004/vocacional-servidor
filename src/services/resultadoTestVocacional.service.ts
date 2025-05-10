import { resultadoTestVocacionalRepository } from '@/repositories/resultadoTestVocacionalRepository';
import { ResultadoTestVocacional } from '@/entities/ResultadoTestVocacional';

export class ResultadoTestVocacionalService {
    
  static crear(data: Partial<ResultadoTestVocacional>) {
    const nuevoResultado = resultadoTestVocacionalRepository.create(data);
    return resultadoTestVocacionalRepository.save(nuevoResultado);
  }

  static obtenerTodos() {
    return resultadoTestVocacionalRepository.find({
      relations: ['estudiante'],
      order: { fechaCompletado: 'DESC' }
    });
  }

  static obtenerPorId(id: number) {
    return resultadoTestVocacionalRepository.findOne({
      where: { id },
      relations: ['estudiante']
    });
  }

  static async actualizar(id: number, data: Partial<ResultadoTestVocacional>) {
    await resultadoTestVocacionalRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  static eliminar(id: number) {
    return resultadoTestVocacionalRepository.delete(id);
  }

  static obtenerPorEstudiante(estudianteId: number) {
    return resultadoTestVocacionalRepository.find({
      where: { estudianteId },
      order: { fechaCompletado: 'DESC' }
    });
  }

  static async marcarComoCompletado(id: number) {
    await resultadoTestVocacionalRepository.update(id, { 
      completado: true,
      fechaCompletado: new Date() 
    });
    return this.obtenerPorId(id);
  }

  static async guardarRespuestas(id: number, respuestas: any) {
    await resultadoTestVocacionalRepository.update(id, { 
      respuestasCuestionario: respuestas 
    });
    return this.obtenerPorId(id);
  }

  static async guardarResultadosJuegos(id: number, resultados: any) {
    await resultadoTestVocacionalRepository.update(id, { 
      resultadosJuegos: resultados 
    });
    return this.obtenerPorId(id);
  }

  static async guardarCarrerasSugeridas(id: number, carreras: any) {
    await resultadoTestVocacionalRepository.update(id, { 
      carrerasSugeridas: carreras,
      completado: true
    });
    return this.obtenerPorId(id);
  }

  static obtenerTestsCompletados() {
    return resultadoTestVocacionalRepository.find({
      where: { completado: true },
      relations: ['estudiante'],
      order: { fechaCompletado: 'DESC' }
    });
  }
}