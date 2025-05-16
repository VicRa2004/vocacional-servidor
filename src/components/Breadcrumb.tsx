'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';

type BreadcrumbSegment = {
  name: string;
  path: string;
  isLast: boolean;
};

export const Breadcrumb = () => {
  const pathname = usePathname();
  
  const generateSegments = (): BreadcrumbSegment[] => {
    const segments = pathname.split('/').filter(Boolean);
    
    return segments.map((segment, index) => ({
      name: formatSegment(segment),
      path: `/${segments.slice(0, index + 1).join('/')}`,
      isLast: index === segments.length - 1
    }));
  };

  const formatSegment = (segment: string): string => {
    const customNames: Record<string, string> = {
      'admin': 'Panel de Administración',
      'create': 'Crear',
      'profile': 'Perfil',
    };

    return customNames[segment] || 
      segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
  };

  const segments = generateSegments();

  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex justify-center h-full mt-4">
      <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-full px-6 py-2 shadow-sm">
        <ol className="flex items-center gap-1 text-base">
          <li className="flex items-center">
            <Link 
              href="/" 
              className="text-purple-600 hover:text-purple-800 transition-colors duration-200 font-medium px-3 py-1 rounded-full hover:bg-purple-50"
            >
              Inicio
            </Link>
          </li>
          
          {segments.map((segment, index) => (
            <li key={index} className="flex items-center">
              <FaChevronRight className="h-3 w-3 text-purple-300 mx-1" />
              {segment.isLast ? (
                <span className="text-purple-900 font-semibold px-3 py-1 rounded-full bg-purple-50">
                  {segment.name}
                </span>
              ) : (
                <Link 
                  href={segment.path} 
                  className="text-purple-600 hover:text-purple-800 transition-colors duration-200 font-medium px-3 py-1 rounded-full hover:bg-purple-50"
                >
                  {segment.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};