"use client";

import { useFetch } from "@/hooks/use-fetch";
import type { GetEstudiante } from "@/types/usuarios";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const PageMaestros = () => {
  const {
    data: estudiantes,
    loading,
    error,
    refetch,
  } = useFetch<GetEstudiante[]>("/api/usuarios?rol=estudiante");

  // Estado para el modal de eliminación
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    estudianteId: null as number | null,
    estudianteNombre: "",
  });

  const handleDelete = async () => {
    if (!deleteModal.estudianteId) return;

    try {
      await fetch(`/api/usuarios/${deleteModal.estudianteId}`, {
        method: "DELETE",
      });

      // Recargar la lista de maestros
      refetch();
      setDeleteModal({
        isOpen: false,
        estudianteId: null,
        estudianteNombre: "",
      });
    } catch (err) {
      console.error("Error al eliminar estudiante:", err);
    }
  };

  return (
    <main className="min-h-screen p-8">
      {/* Modal de confirmación de eliminación */}
      <Dialog
        open={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({
            isOpen: false,
            estudianteId: null,
            estudianteNombre: "",
          })
        }
        className="relative z-50"
      >
        {/* Fondo oscuro */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Contenedor del modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-bold text-gray-900">
              Confirmar eliminación
            </DialogTitle>

            <Description className="mt-2">
              ¿Estás seguro que deseas eliminar al maestro{" "}
              {deleteModal.estudianteNombre}?
            </Description>

            <p className="mt-2 text-sm text-gray-500">
              Esta acción no se puede deshacer. Todos los datos asociados a este
              maestro se perderán permanentemente.
            </p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() =>
                  setDeleteModal({
                    isOpen: false,
                    estudianteId: null,
                    estudianteNombre: "",
                  })
                }
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Estudiante
          </h1>
          <Link
            href="/admin/estudiantes/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>+</span>
            <span>Nuevo Estudiante</span>
          </Link>
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

        {/* Tabla de estudiantes */}
        {estudiantes && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Niivel Academico
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {estudiantes.map((estudiante) => (
                  <tr
                    key={estudiante.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {estudiante.nombre}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(
                          estudiante.fechaNacimiento
                        ).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {estudiante.correo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {estudiante.nivelAcademico}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          estudiante.activo
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {estudiante.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-4">
                        <Link
                          href={`/admin/estudiantes/${estudiante.id}`}
                          className="flex items-center text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <FaEdit className="mr-1" />
                          Editar
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteModal({
                              isOpen: true,
                              estudianteId: estudiante.id,
                              estudianteNombre: estudiante.nombre,
                            })
                          }
                          className="flex items-center text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="mr-1" />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default PageMaestros;
