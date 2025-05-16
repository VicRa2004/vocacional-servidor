"use client";

import { use } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { CreateForm } from "@/components/admin/estudiantes/CreateForm";
import { GetEstudiante } from "@/types/usuarios";

export default function Page({ params }: { params: { id: string } }) {
  // Desestructuración después de usar use()
  const { id } = use<{ id: string }>(params);

  const {
    data: estudiante,
    error,
    loading,
  } = useFetch<GetEstudiante>(`/api/usuarios/${id}`);

  console.log(estudiante);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Actualizar Maestro
            </h1>
            <p className="mt-2 text-gray-600">
              Complete el formulario para actualizar un docente
            </p>
          </div>

          {/* Estado de carga y errores */}
          {loading && (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>Error: {error.message}</p>
            </div>
          )}

          {estudiante && (
            <CreateForm
              action="UPDATE"
              estudiante={{
                ...estudiante,
                contrasenaHash: "",
                fechaNacimiento: estudiante.fechaNacimiento,
                fechaRegistro: estudiante.fechaRegistro,
                nivelAcademico: estudiante.nivelAcademico || "",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
