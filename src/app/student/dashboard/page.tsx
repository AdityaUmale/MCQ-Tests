'use client'

import { useSession } from 'next-auth/react'
import { withAuth } from '../../components/withAuth'

function StudentDashboard() {
    const session = useSession()
  return <div>Student Dashboard
    <h1>welcome {session.data?.user.name}</h1>
    <h2>role: {session.data?.user.role}</h2>
  </div>
}

export default withAuth(StudentDashboard, ['Student'])