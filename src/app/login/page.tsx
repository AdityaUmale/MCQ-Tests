import React from 'react'
import LoginForm from '../components/LoginForm'
import Link from 'next/link'

function page() {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <br /><br /><br /><br />
      <LoginForm />
      <p className="my-3">
        Dont you have an account?
        <Link href="register" className="mx-2 underline">Register</Link>
      </p>
    </div>
  )
}

export default page