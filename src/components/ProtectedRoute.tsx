// components/ProtectedRoute.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
  //rol: '' | 'admin' | 'user'
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si estamos en el cliente antes de acceder a localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      
      if (!token) {
        router.push('/auth/login')
      } else {
        setIsAuthenticated(true)
      }
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return <div>Cargando...</div> // O un spinner de carga
  }

  return isAuthenticated ? <>{children}</> : null
}