import Link from 'next/link';
import { FaGamepad } from 'react-icons/fa';


export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">

        <Link href="/" className="flex items-center">
          <FaGamepad className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-indigo-600">CareerCraft</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
            Acerca de
          </Link>
          <Link href="/auth/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
            Iniciar Sesión
          </Link>
          <Link
            href="/auth/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  </nav>
  )
} 