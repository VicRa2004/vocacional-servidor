import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaSchool, FaMapMarkerAlt, FaPhone, FaBuilding, FaMapPin } from 'react-icons/fa';

interface CrearEscuelaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEscuelaCreada: () => void;
}

export default function CrearEscuelaModal({ isOpen, onClose, onEscuelaCreada }: CrearEscuelaModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    telefono: '',
    fechaCreacion: new Date().toISOString().split('T')[0],
    activa: true
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/escuelas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      onEscuelaCreada();
      onClose();
      setFormData({
        nombre: '',
        ciudad: '',
        direccion: '',
        telefono: '',
        correo: '',
        director: '',
        nivel: 'primaria',
        tipo: 'publica',
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al crear escuela');
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
            Crear Nueva Escuela
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

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando...
                  </div>
                ) : 'Crear Escuela'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}