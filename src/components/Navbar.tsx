'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGamepad, FaUser, FaSignOutAlt, FaChartBar, FaCog, FaUsers, FaGraduationCap, FaClipboardList } from 'react-icons/fa';

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth-token');
      const userInfo = localStorage.getItem('usuario');
      if (token && userInfo) {
        setIsAuthenticated(true);
        const user = JSON.parse(userInfo);
        setUserRole(user.rol);
      } else {
        setIsAuthenticated(false);
        setUserRole('');
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('usuario');
    setIsAuthenticated(false);
    setUserRole('');
    router.push('/auth/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <FaGamepad className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-indigo-600">CareerCraft</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                {userRole === 'administrador' && (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/admin/"
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <FaChartBar className="mr-2" />
                      Panel de Administración
                    </Link>
                    <Link
                      href="/admin/usuarios"
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <FaUsers className="mr-2" />
                      Gestionar Usuarios
                    </Link>
                    <Link
                      href="/admin/configuracion"
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <FaCog className="mr-2" />
                      Configuración
                    </Link>
                  </div>
                )}
                {userRole === 'maestro' && (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/maestro/"
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <FaChartBar className="mr-2" />
                      Panel de Maestro
                    </Link>
                    <Link
                      href="/maestro/estudiantes"
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <FaGraduationCap className="mr-2" />
                      Mis Estudiantes
                    </Link>
                    <Link
                      href="/maestro/reportes"
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <FaClipboardList className="mr-2" />
                      Reportes
                    </Link>
                  </div>
                )}
                <div className="flex items-center space-x-2 ml-4">
                  <FaUser className="h-5 w-5 text-gray-600" />
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Cerrar Sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}