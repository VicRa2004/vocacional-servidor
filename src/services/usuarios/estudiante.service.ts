import { usuarioRepository } from "@/repositories/usuarioRepository";
import { Usuario } from "@/entities/Usuario";

type CrearEstudiante = Omit<Usuario, "id" | "rol">;

export class EstudianteService {
  static async obtenerTodos() {
    const estudiantes = await usuarioRepository.find({
      where: { rol: "estudiante" },
    });

    return estudiantes.map(({ contrasenaHash: _, ...rest }) => rest);
  }

  static async obtenerPorId(id: number) {
    const estudiante = await usuarioRepository.findOne({
      where: { id, rol: "estudiante" },
      relations: ["resultadosTest"],
    });

    if (!estudiante) throw new Error("Estudiante no encontrado");

    const { contrasenaHash: _, ...rest } = estudiante;
    return rest;
  }

  static async crear(datos: CrearEstudiante) {
    try {
      const nuevoEstudiante = usuarioRepository.create({
        ...datos,
        rol: "estudiante",
      });
      return await usuarioRepository.save(nuevoEstudiante);
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear el estudiante");
    }
  }

  static async actualizar(id: number, datos: Partial<Usuario>) {
    const estudianteExistente = await usuarioRepository.findOneBy({
      id,
      rol: "estudiante",
    });
    if (!estudianteExistente) throw new Error("Estudiante no encontrado");

    await usuarioRepository.update(id, datos);
    return this.obtenerPorId(id);
  }

  static async eliminar(id: number) {
    const estudianteExistente = await usuarioRepository.findOneBy({
      id,
      rol: "estudiante",
    });
    if (!estudianteExistente) throw new Error("Estudiante no encontrado");
    return usuarioRepository.delete(id);
  }
}
