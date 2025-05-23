"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useFetch } from "@/hooks/use-fetch";
import { useMutation } from "@/hooks/use-mutation";
import type { ResultadoTestVocacional } from "@/entities/ResultadoTestVocacional";

const AnalisisPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, loading } = useFetch<ResultadoTestVocacional>(`/api/resultados/${id}`);
  const { mutate, loading: isLoadingMutating } = useMutation("/api/chat");

  const [respuestaAnalisis, setRespuestaAnalisis] = useState<string>("");

  const enviarData = async () => {
    if (!data) return;

    const prompt = `
Realiza un análisis de este estudiante basado en sus resultados de la carrera que va a elegir:

Aclaro, son tres recomendaciones de carreras de un mismo estudiante.

${JSON.stringify(data.carrerasSugeridas, null, 2)}

Haz que sea mediano, da puntos de vista.
    `;

    console.log(prompt);

    try {
      await mutate(prompt, "POST", (res) => {
        console.log("Respuesta del servidor:", res);

      // ✅ Ahora usamos directamente la respuesta
      setRespuestaAnalisis(res?.message?.content || "No se recibió respuesta del servidor.");
      });
    } catch (error) {
      console.error("Error al generar el análisis:", error);
      setRespuestaAnalisis("Error al procesar la solicitud. Por favor intenta nuevamente.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Análisis del Estudiante</h1>

      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500 italic">Cargando resultados del estudiante...</p>
        ) : (
          <button
            onClick={enviarData}
            disabled={isLoadingMutating || !data}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${
              (isLoadingMutating || !data) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoadingMutating ? "Generando análisis..." : "Generar análisis"}
          </button>
        )}

        {respuestaAnalisis && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Resultado del Análisis</h2>
            <MarkdownRenderer content={respuestaAnalisis} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalisisPage;
