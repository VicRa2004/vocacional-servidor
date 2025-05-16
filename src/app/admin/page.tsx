'use client';

import Link from 'next/link';
import { FaUsers, FaSchool, FaUserGraduate, FaGamepad, FaUserFriends, FaClipboardCheck } from 'react-icons/fa';

export default function DashboardPage() {
  const menuItems = [
    {
      title: 'Usuarios',
      description: 'Gestionar usuarios del sistema',
      icon: FaUsers,
      href: '/admin/usuarios',
      color: 'bg-blue-500'
    },
    {
      title: 'Escuelas',
      description: 'Administrar escuelas registradas',
      icon: FaSchool,
      href: '/admin/escuelas',
      color: 'bg-green-500'
    },
    {
      title: 'Maestros',
      description: 'Gestionar maestros y sus escuelas',
      icon: FaUserGraduate,
      href: '/admin/maestros',
      color: 'bg-purple-500'
    },
    {
      title: 'Estudiantes',
      description: 'Administrar estudiantes registrados',
      icon: FaUserFriends,
      href: '/admin/estudiantes',
      color: 'bg-yellow-500'
    },
    {
      title: 'Carreras',
      description: 'Gestionar catálogo de carreras',
      icon: FaGamepad,
      href: '/admin/carreras',
      color: 'bg-red-500'
    },
    {
      title: 'Resultados',
      description: 'Ver resultados y evaluaciones',
      icon: FaClipboardCheck,
      href: '/admin/resultados',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <main className="p-6 max-w-7xl mx-auto flex-grow">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        <div className="text-sm text-gray-500">Bienvenido, Administrador</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            href={item.href}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-100"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${item.color} text-white`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                <p className="mt-1 text-gray-600">{item.description}</p>
              </div>
            </div>
            
          </Link>
        ))}
      </div>
    </main>
  );
}