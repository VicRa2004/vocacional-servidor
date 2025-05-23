"use client";

import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/use-fetch";
import type { ResultadoTestVocacional } from "@/entities/ResultadoTestVocacional";
import { useMutation } from "@/hooks/use-mutation";
import { CarreraElegir, verificarCarrera } from "@/libs/calcular-carrera";
import Link from "next/link";

const ResultadoDetallePage = () => {
  const params = useParams();
  const id = params?.id;
  const { mutate } = useMutation<CarreraElegir[], unknown>(`/api/resultados/${id}`);
  const { data, loading, error } = useFetch<ResultadoTestVocacional>(`/api/resultados/${id}`);

  const handleCarreras = async () => {
    if (data) {
      const carreras = verificarCarrera({
        preguntas: data.resultadosPreguntas || [],
        juegos: data.resultadosJuegos || [],
      });
      const res = await mutate(carreras, "PUT");
      console.log(res);
    }
  };

  if (loading) return <p className="text-center mt-4">Cargando resultado...</p>;
  if (error || !data)
    return <p className="text-center mt-4 text-red-500">No se pudo cargar el resultado.</p>;

  const { estudiante, fechaCompletado, resultadosPreguntas, resultadosJuegos, carrerasSugeridas } = data;

  return (
    <main className="flex flex-col items-center px-6 py-10 max-w-5xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-indigo-600 mb-2 text-center">
        Resultado del Test Vocacional
      </h1>

      {/* Tarjeta del Estudiante */}
      <section className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎓 Estudiante</h2>
        <div className="grid md:grid-cols-2 gap-y-2 gap-x-6 text-gray-700">
          <p><strong>Nombre:</strong> {estudiante?.nombre}</p>
          <p><strong>Correo:</strong> {estudiante?.correo}</p>
          <p><strong>Género:</strong> {estudiante?.genero}</p>
          <p><strong>Rol:</strong> {estudiante?.rol}</p>
          <p><strong>Nivel Académico:</strong> {estudiante?.nivelAcademico}</p>
          <p>
            <strong>Fecha de nacimiento:</strong>{" "}
            {new Date(estudiante?.fechaNacimiento).toLocaleDateString()}
          </p>
          <p>
            <strong>Fecha de finalización del test:</strong>{" "}
            {new Date(fechaCompletado).toLocaleString()}
          </p>
        </div>
      </section>

      {/* Cuestionario */}
      <section className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📝 Cuestionario</h2>
        {resultadosPreguntas?.length === 0 ? (
          <p className="text-gray-500">Sin respuestas registradas.</p>
        ) : (
          <div className="space-y-4">
            {resultadosPreguntas?.map((pregunta, index) => (
              <div key={index}>
                <p className="font-medium text-gray-800">{pregunta.nombre}</p>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded"
                      style={{ width: `${(pregunta.resultado / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{pregunta.resultado}/5</span>
                </div>
                <p className="text-sm text-gray-500 italic">
                  1: No me interesa &nbsp;&nbsp;|&nbsp;&nbsp; 5: Me interesa muchísimo
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Juegos */}
      <section className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎮 Juegos</h2>
        {resultadosJuegos?.length === 0 ? (
          <p className="text-gray-500">Sin resultados de juegos.</p>
        ) : (
          <ul className="space-y-3">
            {resultadosJuegos?.map((juego, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{juego.nombre}</span>
                <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
                  Puntaje: {juego.puntaje}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Carreras Sugeridas */}
      {carrerasSugeridas && carrerasSugeridas.length > 0 ? (
        <section className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">💼 Carreras Sugeridas</h2>
          <ul className="space-y-3">
            {carrerasSugeridas.map((carrera) => (
              <li
                key={carrera.id}
                className="flex justify-between items-center border p-4 rounded-md hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-700">{carrera.nombre}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Puntaje: {carrera.puntaje}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <button
          className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md transition"
          onClick={() => handleCarreras()}
        >
          Sugerir carreras
        </button>
      )}

      <Link
          href={`/admin/resultados/${id}/analisis`}
          className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md transition"
          onClick={() => console.log('navegando')}
        >
          Ejecutar analisis
        </Link>
    </main> 
  );
};

export default ResultadoDetallePage;
