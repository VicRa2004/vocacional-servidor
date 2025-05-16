'use client';

import { useFetch } from "@/hooks/use-fetch";
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { FaEdit, FaTrash, FaSchool } from "react-icons/fa";

interface Escuela {
  id: number;
  nombre: string;
  direccion?: string;
  ciudad?: string;
  estado?: string;
  codigoPostal?: string;
  telefono?: string;
  fechaCreacion?: Date;
  activa: boolean;
}

const EscuelasPage = () => {
  const { data: escuelas, loading, error, refetch } = useFetch<Escuela[]>("/api/escuelas");
  
  // Estado para el modal de eliminación
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    escuelaId: null as number | null,
    escuelaNombre: ''
  });

  const handleDelete = async () => {
    if (!deleteModal.escuelaId) return;
    
    try {
      await fetch(`/api/escuelas/${deleteModal.escuelaId}`, {
        method: 'DELETE'
      });
      
      // Recargar la lista de escuelas
      refetch();
      setDeleteModal({ isOpen: false, escuelaId: null, escuelaNombre: '' });
    } catch (err) {
      console.error('Error al eliminar escuela:', err);
    }
  };

  return (
    <main className="min-h-screen p-8">
      {/* Modal de confirmación de eliminación */}
      <Dialog 
        open={deleteModal.isOpen} 
        onClose={() => setDeleteModal({ isOpen: false, escuelaId: null, escuelaNombre: '' })}
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
              ¿Estás seguro que deseas eliminar la escuela {deleteModal.escuelaNombre}?
            </Description>
            
            <p className="mt-2 text-sm text-gray-500">
              Esta acción no se puede deshacer. Todos los datos asociados a esta escuela se perderán permanentemente.
            </p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, escuelaId: null, escuelaNombre: '' })}
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
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Escuelas</h1>
          <Link 
            href="/admin/escuelas/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <FaSchool />
            <span>Nueva Escuela</span>
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

        {/* Tabla de escuelas */}
        {escuelas && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {escuelas.map((escuela) => (
                  <tr key={escuela.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{escuela.nombre}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{escuela.direccion || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{escuela.ciudad || '-'}, {escuela.estado || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{escuela.telefono || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${escuela.activa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {escuela.activa ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-4">
                        <Link
                          href={`/admin/escuelas/${escuela.id}`}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center"
                        >
                          <FaEdit className="mr-1" />
                          Editar
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ 
                            isOpen: true, 
                            escuelaId: escuela.id, 
                            escuelaNombre: escuela.nombre 
                          })}
                          className="text-red-600 hover:text-red-900 flex items-center"
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

export default EscuelasPage;