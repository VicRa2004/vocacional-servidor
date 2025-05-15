import { Usuario } from "@/entities/Usuario"; // Asegúrate de que la ruta sea correcta

export type RolUsuario = 'administrador' | 'maestro' | 'estudiante';

// Tipo base sin relaciones (opcional, para simplificar)
type UsuarioBase = Omit<Usuario, 'escuelaAsignada' | 'estudiantesAsignados' | 'resultadosTests' | 'carrerasInteres'>;

// Tipo para Administrador (solo campos generales)
export type Administrador = Pick<UsuarioBase, 
  'id' | 'nombre' | 'correo' | 'contrasenaHash' | 'rol' | 'fechaRegistro' | 'activo'
>;

// Tipo para Maestro (campos generales + departamento)
export type Maestro = Pick<UsuarioBase, 
  'id' | 'nombre' | 'correo' | 'contrasenaHash' | 'rol' | 'fechaNacimiento' | 
  'genero' | 'departamento' | 'fechaRegistro' | 'activo'
>;

// Tipo para Estudiante (campos generales + nivelAcademico + carrerasInteres)
export type Estudiante = Pick<UsuarioBase, 
  'id' | 'nombre' | 'correo' | 'contrasenaHash' | 'rol' | 'fechaNacimiento' | 
  'genero' | 'nivelAcademico' | 'fechaRegistro' | 'activo'
>;