// components/ProtectedRoute.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface Props {
  children: React.ReactNode
  allowedRoles?: string[] // Roles permitidos (opcional)
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const router = useRouter()

  const {
    token,
    user,
    isAuthenticated,
    hasHydrated,
  } = useAuthStore()

  useEffect(() => {
    if (!hasHydrated) return

    // Si no hay token o no está autenticado, redirige
    if (!token || !isAuthenticated) {
      router.push('/auth/login')
      return
    }

    // Si hay restricción de roles y el rol no está permitido
    if (allowedRoles && (!user || !allowedRoles.includes(user.rol))) {
      router.push('/unauthorized') // o una ruta de acceso denegado
      return
    }

  }, [token, isAuthenticated, allowedRoles, user, hasHydrated, router])

  // Mostrar spinner mientras se hidrata Zustand o se valida el rol
  if (!hasHydrated || !isAuthenticated || (allowedRoles && (!user || !allowedRoles.includes(user.rol)))) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-2">
        <LoadingSpinner />
        <p className="text-gray-600">Verificando autenticación...</p>
      </div>
    )
  }

  return <>{children}</>
}
