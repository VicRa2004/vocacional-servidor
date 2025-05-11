import { Dialog } from '@headlessui/react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ConfirmarEliminarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  nombreUsuario: string;
  isLoading: boolean;
}

export default function ConfirmarEliminarModal({
  isOpen,
  onClose,
  onConfirm,
  nombreUsuario,
  isLoading
}: ConfirmarEliminarModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-white p-8 w-full shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-100 rounded-full p-3">
              <FaExclamationTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>

          <Dialog.Title className="text-xl font-bold text-gray-900 text-center mb-4">
            Confirmar Eliminación
          </Dialog.Title>

          <p className="text-center text-gray-600 mb-6">
            ¿Estás seguro que deseas eliminar al usuario <span className="font-semibold">{nombreUsuario}</span>? Esta acción no se puede deshacer.
          </p>

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition-all duration-200"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Eliminando...
                </div>
              ) : 'Eliminar Usuario'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}