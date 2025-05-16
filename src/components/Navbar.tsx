'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FaGamepad, 
  FaUser, 
  FaSignOutAlt, 
  FaChartBar, 
  FaCog, 
  FaUsers, 
  FaGraduationCap, 
  FaClipboardList,
  FaBars,
  FaTimes
} from 'react-icons/fa';

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const AdminLinks = () => (
    <>
      <NavItem href="/admin/" icon={<FaChartBar />} text="Dashboard" />
      <NavItem href="/admin/usuarios" icon={<FaUsers />} text="Usuarios" />
      <NavItem href="/admin/configuracion" icon={<FaCog />} text="Configuración" />
    </>
  );

  const TeacherLinks = () => (
    <>
      <NavItem href="/maestro/" icon={<FaChartBar />} text="Dashboard" />
      <NavItem href="/maestro/estudiantes" icon={<FaGraduationCap />} text="Estudiantes" />
      <NavItem href="/maestro/reportes" icon={<FaClipboardList />} text="Reportes" />
    </>
  );

  const NavItem = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => (
    <Link href={href} className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors">
      <span className="mr-2">{icon}</span>
      {text}
    </Link>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo y menú móvil */}
          <div className="flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-500 hover:text-indigo-600 mr-2"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <Link href="/" className="flex items-center">
              <FaGamepad className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-indigo-600">CareerCraft</span>
            </Link>
          </div>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-2">
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
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                <div className="flex space-x-1">
                  {userRole === 'administrador' && <AdminLinks />}
                  {userRole === 'maestro' && <TeacherLinks />}
                </div>

                {/* Perfil y logout */}
                <div className="relative ml-4">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center text-gray-700 hover:text-indigo-600 focus:outline-none"
                  >
                    <FaUser className="h-5 w-5 mr-1" />
                    <span className="hidden md:inline">Perfil</span>
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        href={userRole === 'administrador' ? '/admin/perfil' : '/maestro/perfil'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        Mi Perfil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-red-600"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  onClick={toggleMobileMenu}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={toggleMobileMenu}
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                {userRole === 'administrador' && <AdminLinks />}
                {userRole === 'maestro' && <TeacherLinks />}

                <div className="border-t border-gray-200 pt-2">
                  <Link
                    href={userRole === 'administrador' ? '/admin/perfil' : '/maestro/perfil'}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md"
                    onClick={toggleMobileMenu}
                  >
                    <FaUser className="mr-2" />
                    Mi Perfil
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-red-600 rounded-md text-left"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Cerrar Sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};