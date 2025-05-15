-- Tabla de Usuarios (unificada con roles)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('administrador', 'maestro', 'estudiante')),
    fecha_nacimiento DATE,
    genero VARCHAR(10),
    nivel_academico VARCHAR(50),
    departamento VARCHAR(50), -- Solo aplica para maestros
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Escuelas
CREATE TABLE escuelas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT,
    ciudad VARCHAR(50),
    estado VARCHAR(50),
    codigo_postal VARCHAR(10),
    telefono VARCHAR(20),
    fecha_creacion DATE,
    activa BOOLEAN DEFAULT TRUE
);

-- Tabla de Relación Maestro-Escuela (uno a uno)
CREATE TABLE maestro_escuela (
    maestro_id INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    escuela_id INT NOT NULL REFERENCES escuelas(id) ON DELETE CASCADE,
    fecha_asignacion DATE DEFAULT CURRENT_DATE,
    UNIQUE(maestro_id, escuela_id)
);

-- Relación Estudiante-Maestro (uno a muchos)
CREATE TABLE estudiante_maestro (
    estudiante_id INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    maestro_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_asignacion DATE DEFAULT CURRENT_DATE
);

-- Tabla de Carreras
CREATE TABLE carreras (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    area_conocimiento VARCHAR(50), -- Ej: Ciencias, Humanidades, Ingeniería
    duracion_estimada VARCHAR(20), -- Ej: 4 años, 2 años
    demanda_laboral VARCHAR(20), -- Ej: Alta, Media, Baja
    salario_promedio VARCHAR(50),
    competencias_clave TEXT
);

-- Tabla de Resultados de Test Vocacional (combinando cuestionario y juegos)
CREATE TABLE resultados_test_vocacional (
    id SERIAL PRIMARY KEY,
    estudiante_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_completado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Respuestas del cuestionario inicial
    respuestas_cuestionario JSONB,
    -- Resultados del/los juego(s) vocacional(es)
    resultados_juegos JSONB,
    -- Carreras sugeridas basadas en el análisis
    carreras_sugeridas JSONB, -- Formato: [{"carrera_id": 1, "porcentaje_ajuste": 85}, ...]
    completado BOOLEAN DEFAULT FALSE
);

-- Tabla de Relación Estudiante-Carrera (para seguimiento)
CREATE TABLE estudiante_carrera_interes (
    id SERIAL PRIMARY KEY,
    estudiante_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    carrera_id INT NOT NULL REFERENCES carreras(id) ON DELETE CASCADE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    interes DECIMAL(5,2), -- Porcentaje de interés (0-100)
    origen VARCHAR(50) -- 'test', 'manual', etc.
);