'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSchool } from 'react-icons/fa';
import CrearEscuelaModal from './components/CrearEscuelaModal';
import EditarEscuelaModal from './components/EditarEscuelaModal';
import ConfirmarEliminarModal from './components/ConfirmarEliminarModal';

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

export default function EscuelasPage() {
  const [escuelas, setEscuelas] = useState<Escuela[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEscuela, setSelectedEscuela] = useState<Escuela | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [escuelaToDelete, setEscuelaToDelete] = useState<Escuela | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (escuela: Escuela) => {
    setEscuelaToDelete(escuela);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!escuelaToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/escuelas/${escuelaToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar escuela');
      }

      await cargarEscuelas();
      setIsDeleteModalOpen(false);
      setEscuelaToDelete(null);
    } catch (error) {
      setError('Error al eliminar la escuela');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    cargarEscuelas();
  }, []);

  const cargarEscuelas = async () => {
    try {
      const response = await fetch('/api/escuelas');
      if (!response.ok) {
        throw new Error('Error al cargar escuelas');
      }
      const data = await response.json();
      setEscuelas(data);
    } catch (error) {
      setError('Error al cargar las escuelas');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Escuelas</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <FaSchool />
          Nueva Escuela
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {escuelas.map((escuela) => (
              <tr key={escuela.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{escuela.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{escuela.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{escuela.direccion || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{escuela.ciudad || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{escuela.estado || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{escuela.telefono || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    escuela.activa 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {escuela.activa ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setSelectedEscuela(escuela);
                        setIsEditModalOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(escuela)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CrearEscuelaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEscuelaCreada={cargarEscuelas}
      />

      {selectedEscuela && (
        <EditarEscuelaModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEscuela(null);
          }}
          onEscuelaActualizada={cargarEscuelas}
          escuela={selectedEscuela}
        />
      )}

      {escuelaToDelete && (
        <ConfirmarEliminarModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setEscuelaToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          nombreEscuela={escuelaToDelete.nombre}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}