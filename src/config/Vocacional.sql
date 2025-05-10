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

-- Tabla de Juegos (para test vocacional)
CREATE TABLE juegos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo_juego VARCHAR(50) NOT NULL, -- Ej: puzzle, simulación, cuestionario
    nivel_dificultad VARCHAR(20), -- básico, intermedio, avanzado
    duracion_estimada INT, -- en minutos
    metadata JSONB, -- Para almacenar datos específicos del juego
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Preguntas Generales (cuestionario inicial)
CREATE TABLE preguntas_generales (
    id SERIAL PRIMARY KEY,
    texto TEXT NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- opcion_multiple, escala, abierta
    categoria VARCHAR(50), -- personalidad, intereses, habilidades
    opciones_respuesta JSONB, -- Almacena opciones directamente aquí en formato JSON
    orden_visual INT -- Para controlar el orden de presentación
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

-- Estudiantes por escuela (con base en su maestro asignado)
SELECT e.nombre AS escuela, COUNT(em.estudiante_id) AS total_estudiantes
FROM escuelas e
JOIN maestro_escuela me ON me.escuela_id = e.id
JOIN estudiante_maestro em ON em.maestro_id = me.maestro_id
JOIN usuarios u ON u.id = em.estudiante_id
WHERE u.rol = 'estudiante'
GROUP BY e.nombre;

-- 2. Carreras más populares entre estudiantes
SELECT c.nombre AS carrera, COUNT(eci.carrera_id) AS total_estudiantes
FROM carreras c
JOIN estudiante_carrera_interes eci ON eci.carrera_id = c.id
GROUP BY c.nombre
ORDER BY total_estudiantes DESC
LIMIT 10;

-- 3. Distribución de intereses por área de conocimiento
SELECT c.area_conocimiento, COUNT(*) AS total_intereses
FROM estudiante_carrera_interes eci
JOIN carreras c ON c.id = eci.carrera_id
GROUP BY c.area_conocimiento;

-- 4. Resultados de test vocacional por estudiante
SELECT u.nombre, rt.fecha_completado, 
       jsonb_array_length(rt.carreras_sugeridas) AS carreras_sugeridas
FROM resultados_test_vocacional rt
JOIN usuarios u ON u.id = rt.estudiante_id
WHERE u.rol = 'estudiante';

-- 5. Efectividad de juegos (correlación entre juego y carreras sugeridas)
SELECT j.nombre AS juego, 
       AVG((cs->>'porcentaje_ajuste')::numeric) AS promedio_ajuste
FROM resultados_test_vocacional rt,
     jsonb_array_elements(rt.resultados_juegos) AS juegos,
     jsonb_array_elements(rt.carreras_sugeridas) AS cs
JOIN juegos j ON j.id = (juegos->>'juego_id')::int
GROUP BY j.nombre;
