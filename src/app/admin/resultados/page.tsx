'use client'

import { useFetch } from "@/hooks/use-fetch"
import type { ResultadoTestVocacional } from '@/entities/ResultadoTestVocacional'
import Link from "next/link"

const Page = () => {
  const { data, loading, error } = useFetch<ResultadoTestVocacional[]>('/api/resultados')

  if (loading) return <p className="text-center mt-4">Cargando resultados...</p>
  if (error) return <p className="text-center mt-4 text-red-500">Error al cargar los resultados.</p>

  return (
    <main className="flex-grow flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-semibold text-indigo-600 mb-6">Resultados de Estudiantes</h1>

      {data && data.length > 0 ? (
        <div className="w-full max-w-4xl space-y-4">
          {data.map((resultado) => (
            <div
              key={resultado.id}
              className="bg-white shadow-md rounded-lg p-4 border flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-lg text-gray-800">{resultado.estudiante?.nombre}</p>
                <p className="text-gray-600 text-sm">Correo: {resultado.estudiante?.correo}</p>
                <p className="text-gray-600 text-sm">Rol: {resultado.estudiante?.rol}</p>
                <p className="text-gray-600 text-sm">
                  Completado el: {new Date(resultado.fechaCompletado).toLocaleString()}
                </p>
              </div>
              <Link
                href={`/admin/resultados/${resultado.id}`}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
                onClick={() => {
                  
                }}
              >
                Ver más
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Aún no hay resultados disponibles.</p>
      )}
    </main>
  )
}

export default Page
