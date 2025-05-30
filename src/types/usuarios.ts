import { Usuario } from "@/entities/Usuario"; // Asegúrate de que la ruta sea correcta

export type RolUsuario = 'administrador' | 'maestro' | 'estudiante';

// Tipo base sin relaciones (opcional, para simplificar)
type UsuarioBase = Omit<Usuario, 'escuelaAsignada' | 'estudiantesAsignados' | 'resultadosTests' | 'carrerasInteres'>;

// Tipo para Administrador (solo campos generales)
export type Administrador = Pick<UsuarioBase, 
  'id' | 'nombre' | 'correo' | 'contrasenaHash' | 'rol' | 'fechaRegistro' | 'activo' | 'fechaNacimiento' | 'genero'
>;

// Tipo para Maestro (campos generales + departamento)
export type Maestro = Pick<UsuarioBase, 
  'id' | 'nombre' | 'correo' | 'contrasenaHash' | 'rol' | 'fechaNacimiento' | 
  'genero' | 'departamento' | 'fechaRegistro' | 'activo' 
>  & {
  escuela?: {
    id: number,
  }
};

// Tipo para Estudiante (campos generales + nivelAcademico + carrerasInteres)
export type Estudiante = Pick<UsuarioBase, 
  'id' | 'nombre' | 'correo' | 'contrasenaHash' | 'rol' | 'fechaNacimiento' | 
  'genero' | 'nivelAcademico' | 'fechaRegistro' | 'activo'
>;

export type GetUsuario = Administrador & {
  ro: RolUsuario
}

export type GetEstudiante = Estudiante & {
  fechaRegistro: string,
  fechaNacimiento: string,
}

export type GetMaestro = Pick<UsuarioBase, 
  'id' | 'nombre' | 'correo' | 'contrasenaHash' | 'rol' | 'fechaNacimiento' | 
  'genero' | 'departamento' | 'fechaRegistro' | 'activo' | 'escuela'
> & {
  fechaRegistro: string,
  fechaNacimiento: string,
}

export type GetAdministrador = Administrador & {
  fechaRegistro: string,
  fechaNacimiento: string,
}

// Tipo para crear
export type CrearAdministrador = Omit<Administrador, 'id'>;

export type CrearMaestro = Omit<Maestro, 'id'>;

export type CrearEstudiante = Omit<Estudiante, 'id'>;