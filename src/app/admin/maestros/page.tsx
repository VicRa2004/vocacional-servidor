'use client'

import { useFetch } from "@/hooks/use-fetch";
import type { Maestro } from "@/types/usuarios";

const PageMaestros = () => {

    const {data: maestros, loading, error} = useFetch<Maestro[]>("/api/usuarios?rol=maestro")

    console.log(maestros)

  return (
    <main className="flex flex-grow justify-center items-center mb-6">
      <h1>Maestros</h1>

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}

      { maestros && <div>
          
          {maestros.map((maestro) => (
            <div key={maestro.id} className="p-4 border-b">
              <h2>{maestro.nombre}</h2>
              <p>{maestro.correo}</p>
              <p>{maestro.departamento}</p>
              <p>{maestro.activo ? "Activo" : "Inactivo"}</p>
            </div>
          ))}

        </div>}
    </main>
  )
}
export default PageMaestros;