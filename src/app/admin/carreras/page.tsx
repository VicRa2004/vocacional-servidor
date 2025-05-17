"use client";

import Link from "next/link";
import type { Carrera } from "@/entities/Carrera";
import { useFetch } from "@/hooks/use-fetch";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { useState } from "react";

const PageCarreras = () => {
  const {
    data: carreras,
    loading,
    error,
    refetch,
  } = useFetch<Carrera[]>("/api/carreras");

   console.log(carreras)

  // Estado para el modal de eliminación
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    carreraId: null as number | null,
    carreraNombre: "",
  });

  const handleDelete = async () => {
    if (!deleteModal.carreraId) return;

    try {
      await fetch(`/api/carreras/${deleteModal.carreraId}`, {
        method: "DELETE",
      });

      // Recargar la lista de carreras
      refetch();
      setDeleteModal({ isOpen: false, carreraId: null, carreraNombre: "" });
    } catch (err) {
      console.error("Error al eliminar carrera:", err);
    }
  };

  return (
    <main className="flex-grow p-8">
      {/* Modal de confirmación de eliminación */}
      <Dialog
        open={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, carreraId: null, carreraNombre: "" })
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
              ¿Estás seguro que deseas eliminar la carrera{" "}
              {deleteModal.carreraNombre}?
            </Description>

            <p className="mt-2 text-sm text-gray-500">
              Esta acción no se puede deshacer. Todos los datos asociados a esta
              carrera se perderán permanentemente.
            </p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() =>
                  setDeleteModal({
                    isOpen: false,
                    carreraId: null,
                    carreraNombre: "",
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
            Gestión de Carreras
          </h1>
          <Link
            href="/admin/carreras/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>+</span>
            <span>Nueva carrera</span>
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

        {/* Tabla de carreras */}
        {carreras && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Área de Conocimiento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duración
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Demanda Laboral
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {carreras.map((carrera) => (
                    <tr
                      key={carrera.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex flex-col">
                          <span className="font-medium">{carrera.nombre}</span>
                          <span className="text-sm text-gray-500 mt-1">
                            {carrera.descripcion || "Sin descripción"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {carrera.areaConocimiento || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {carrera.duracionEstimada || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            carrera.demandaLaboral === "Alta"
                              ? "bg-green-100 text-green-800"
                              : carrera.demandaLaboral === "Media"
                              ? "bg-yellow-100 text-yellow-800"
                              : carrera.demandaLaboral === "Baja"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {carrera.demandaLaboral || "No especificada"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-4">
                          <Link
                            href={`/admin/carreras/${carrera.id}`}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center"
                          >
                            <FaEdit className="mr-1" />
                            Editar
                          </Link>
                          <button
                            onClick={() =>
                              setDeleteModal({
                                isOpen: true,
                                carreraId: carrera.id,
                                carreraNombre: carrera.nombre,
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
          </div>
        )}
      </div>
    </main>
  );
};

export default PageCarreras;
