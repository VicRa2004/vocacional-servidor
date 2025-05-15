import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { FaSchool, FaMapMarkerAlt, FaPhone, FaBuilding, FaMapPin } from 'react-icons/fa';

interface EditarEscuelaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEscuelaActualizada: () => void;
  escuela: {
    id: number;
    nombre: string;
    direccion?: string;
    ciudad?: string;
    estado?: string;
    codigoPostal?: string;
    telefono?: string;
    fechaCreacion?: Date;
    activa: boolean;
  };
}

export default function EditarEscuelaModal({ isOpen, onClose, onEscuelaActualizada, escuela }: EditarEscuelaModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    telefono: '',
    fechaCreacion: '',
    activa: true
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({
      nombre: escuela.nombre || '',
      direccion: escuela.direccion || '',
      ciudad: escuela.ciudad || '',
      estado: escuela.estado || '',
      codigoPostal: escuela.codigoPostal || '',
      telefono: escuela.telefono || '',
      fechaCreacion: escuela.fechaCreacion ? new Date(escuela.fechaCreacion).toISOString().split('T')[0] : '',
      activa: escuela.activa
    });
  }, [escuela]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/escuelas/${escuela.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      onEscuelaActualizada();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al actualizar escuela');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl rounded-xl bg-white p-8 w-full shadow-2xl">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Editar Escuela
          </Dialog.Title>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSchool className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="pl-10 w-full rounded-lg border-2 border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Nombre de la escuela"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                  className="pl-10 w-full rounded-lg border-2 border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Dirección"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.ciudad}
                  onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                  className="pl-10 w-full rounded-lg border-2 border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Ciudad"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.value})}
                  className="pl-10 w-full rounded-lg border-2 border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Estado"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.codigoPostal}
                  onChange={(e) => setFormData({...formData, codigoPostal: e.target.value})}
                  className="pl-10 w-full rounded-lg border-2 border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Código Postal"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  className="pl-10 w-full rounded-lg border-2 border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Teléfono"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Creación</label>
                <input
                  type="date"
                  value={formData.fechaCreacion}
                  onChange={(e) => setFormData({...formData, fechaCreacion: e.target.value})}
                  className="w-full rounded-lg border-2 border-gray-300 py-3 px-4 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={formData.activa}
                onChange={(e) => setFormData({...formData, activa: e.target.checked})}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Escuela activa
              </label>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}