'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function withAuth(WrappedComponent: React.ComponentType, allowedRoles: string[]) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
      if (status === 'loading') return // Do nothing while loading
      if (!session) {
        router.push('/login')
      } else if (!allowedRoles.includes(session.user.role)) {
        router.push('/unauthorized') // Create this page for unauthorized access
      }
    }, [session, status, router])

    if (status === 'loading') {
      return <div>Loading...</div> // Or your custom loading component
    }

    if (!session || !allowedRoles.includes(session.user.role)) {
      return null // Or your custom unauthorized component
    }

    return <WrappedComponent {...props} />
  }
}