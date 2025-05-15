'use client';

import Link from 'next/link';
import { FaUsers, FaSchool, FaUserGraduate, FaGamepad, FaChartBar } from 'react-icons/fa';

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
      title: 'Carreras',
      description: 'Gestionar catálogo de carreras',
      icon: FaGamepad,
      href: '/admin/carreras',
      color: 'bg-red-500'
    },
    {
      title: 'Estadísticas',
      description: 'Ver estadísticas y reportes',
      icon: FaChartBar,
      href: '/admin/estadisticas',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            href={item.href}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${item.color}`}>
                <item.icon className="h-6 w-6 text-white" />
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