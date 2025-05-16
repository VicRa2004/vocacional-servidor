'use client'

import { use } from 'react'
import { useFetch } from "@/hooks/use-fetch"
import { CreateForm } from '@/components/admin/maestros/CreateForm'
import {GetMaestro} from '@/types/usuarios'

export default function Page({ params }: { params: { id: string } }) {
  // Desestructuración después de usar use()
  const { id } = use<{id: string}>(params)
  
  const { data: maestro, error, loading } = useFetch<GetMaestro>(`/api/usuarios/${id}`)

  console.log(maestro)

  return <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Registrar Nuevo Maestro</h1>
              <p className="mt-2 text-gray-600">Complete el formulario para agregar un nuevo docente</p>
            </div>
  
            {
                maestro && <CreateForm action="UPDATE" maestro={{
                    ...maestro,
                    contrasenaHash: "",
                    fechaNacimiento: maestro.fechaNacimiento,
                    fechaRegistro: maestro.fechaRegistro,
                    departamento: maestro.departamento || "",
                }} /> 
            }
          
          </div>
        </div>
      </div>
}